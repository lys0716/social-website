from flask import (
    Flask,
    jsonify,
    request
)
import mysql.connector
from pymongo import MongoClient
import redis
from cassandra.cluster import Cluster
import happybase
import simplejson as json
import os
from flask_cors import CORS, cross_origin
from datetime import datetime


app = Flask(__name__)
CORS(app)
app.config.from_envvar('ENV_CONFIG_FILE')
debug = True

# - mongodb parameter
mongodb_endpoint = app.config['CONFIG_MONGODB_ENDPOINT']
client = MongoClient('mongodb://%s' % (mongodb_endpoint))
db = client.gallery

# - cassandra parameter
# - keyspace
#   - 'timeline'
# - table
#   - 'timeline_data1'
# - Schema:
# [angular_timeline_component]([table_column])
# badgeClass(default)
# badgeIconClass(default)
# title(default)
# when(post_time)
# contentHtml(cotent)
# titleContentHtml(embed_image_link)
# footerContentHtml(external_link)
contact_points = app.config['CONFIG_CASSANDRA_ENDPOINT']
key_space = 'timeline'
cassandra_cluster = Cluster(
    contact_points=contact_points.split(',')
)
session = cassandra_cluster.connect()
session.set_keyspace(key_space)

# - HBase parameter
# - create 'relationshipdb', 'n:id, n:group', 'l:source, l:target, l:value'
hbase_host = app.config['CONFIG_HBASE_ENDPOINT']
hbase_table = 'relationship'

# - redis parameter
redis_port = 6379
redis_host = app.config['CONFIG_REDIS_ENDPOINT']
redis_key = 'visitorNumber'
r = redis.StrictRedis(host=redis_host, port=redis_port, db=0)

# - mysql parameter
# - database
#   - 'test'
rds_host = app.config['CONFIG_RDS_ENDPOINT']
rds_user = app.config['CONFIG_RDS_USER']
rds_pwd = app.config['CONFIG_RDS_PASSWORD']
cnx = mysql.connector.connect(user=rds_user, password=rds_pwd,
                              host=rds_host,
                              database='test')
cursor = cnx.cursor()
query = ("SELECT * FROM user WHERE username = %s AND password = %s")

sessionDict = {}

@app.route('/totalvisitor', methods=['POST'])
def add_visitor():
    count = r.get(redis_key)
    if count == None:
        r.set(redis_key, 1)
    else:
        r.set(redis_key, int(count) + 1)
    count = r.get(redis_key)
    print count
    return jsonify(count)


@app.route('/authentication', methods=['POST'])
def authenticate():
    content = request.json
    cursor.execute(query, (content['username'], content['password']))
    row = cursor.fetchone()
    if row:
        print "find user"
        sessionDict['admin'] = content['username']
        return jsonify(status=200, message={'username': row[1], 'hobby': row[3], 'gender':row[4]})
    else:
        print "didn't find user"
        return jsonify(status=401, message='ERROR')


@app.route('/timelinedata')
def get_timelinedata():
    post_array = []
    if len(sessionDict) > 0:
        result = session.execute("select * from timeline_data1")
        for x in result:
            post_array.append(
                {'badgeClass': 'info',
                 'badgeIconClass': 'glyphicon-globe',
                 'title': x.article_title,
                 'titleContentHtml': '<img class="img-responsive" src="' + x.embed_image_link + '">',
                 'contentHtml': x.content,
                 'when': x.post_time
                 })
        return jsonify(post_array)
    else:
        return jsonify(status=401, message='ERROR')

@app.route('/timelinedata', methods=['POST'])
def update_timelinedata():
    img_link_str = 'http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg'
    ext_link_str = 'www.bittiger.io'
    content = request.json
    date_input = datetime.fromtimestamp(content['time'] / 1000.0)
    session.execute(
        """
        INSERT INTO timeline_data1 (post_time, article_title, content, embed_image_link, external_link)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (date_input, 'New Heading', content['text'], img_link_str, ext_link_str)
    )
    return jsonify(status=200, message={})

@app.route('/relationshipgrap')
def get_relationshipgraph():
    if len(sessionDict) > 0:
        connection = happybase.Connection(hbase_host)
        table = connection.table(hbase_table)
        d = {"nodes": [], "links": []}
        for key, data in table.scan(row_start=b'0'):
            if 'n:id' in data.keys():
                d["nodes"].append({'id': data['n:id'], "group": data['n:group']})
            if 'l:source' in data.keys():
                d["links"].append({'source': data['l:source'], "target": data['l:target'], 'value': data['l:value']})
        return jsonify(d)
    else:
        return jsonify(status=401, message='ERROR')

@app.route('/gallery')
def get_gallery():
    if len(sessionDict) > 0:
        mongo_data = []
        for product in db.products.find({}, {"_id": 0}):
            mongo_data.append(product)
        return jsonify(mongo_data)
    else:
        return jsonify(status=401, message='ERROR')

if __name__ == "__main__":
    app.run(debug=True)
