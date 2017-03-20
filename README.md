# `NoAWS` — Not Only A WebSite

An Angular App. Used AWS, EMR, HBase, mongodb, redis, cassandra, docker to developed a website with posting/login/authentication/relationship analysis function.

## Getting Started

Clone the `social-website` repository using git:

```
git clone https://github.com/lys0716/social-website.git
cd social-website
```

### Install Dependencies
Development is based on angular-seed. It has preconfigured npm to automatically run bower so we can simply do:
```
npm install
```
Please choose the angular version match angular-sanitize

We also use virtualenv to manage the python dependencies
```
cd util
virtualenv env
source 
pip install --upgrade -r requirement.txt
source env/bin/activate
```

### Sample Data Ingestion
# - mongodb
1. Go to AWS -> EC2 -> Launch instance -> Amazon Linux Image -> start a t2.micro instance
-> keep default for instance and storage detail -> Add a meaningful tag -> Create a new security group/Use the old one (you must select Type:All traffic/Protocol: All/Port Range:0-65535/Source:Anywhere) -> launch -> select existing key(you must download it first)

2. ssh -i [key.pem] ec2-user@[DNS/IP]

3. Install:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/

sudo vim /etc/yum.repos.d/mongodb-org-3.4.repo -> open an editor

copy the following into the editor:
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

PRESS esc -> INPUT :wq -> ENTER(quit the editor)

sudo yum install -y mongodb-org

vim /etc/mongod.conf

comment the bind ip configuration

sudo service mongod start

4. create database and table:
use gallery
db.products.insertMany([
    {
        name: 'Introduction to Computer Science',
        price: 19,
        pubdate: new Date("2016-05-18"),
        cover: 'http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg',
        likes: 0,
        dislikes: 0
    },
    {
        name: 'Introduction to Data Science',
        price: 8,
        pubdate: new Date("2013-08-01"),
        cover: 'http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg',
        likes: 0,
        dislikes: 0
    },
    {
        name: 'Introduction to Big Data',
        price: 20,
        pubdate: new Date("2016-10-16"),
        cover: 'http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg',
        likes: 0,
        dislikes: 0
    },
    {
        name: 'Introduction to Bit',
        price: 4,
        pubdate: new Date("2015-01-01"),
        cover: 'http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg',
        likes: 0,
        dislikes: 0
    }
])

# - cassandra:
# - create cassandra container
docker run -d -p 7199:7199 -p 9042:9042 -p 9160:9160 -p 7001:7001 --name cassandra cassandra:3.9

//cassandra create table
CREATE KEYSPACE timeline WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}  AND durable_writes = true;

CREATE TABLE timeline.timeline_data1 (
    article_title text,
    post_time timestamp,
    content text,
    embed_image_link text,
    external_link text,
    PRIMARY KEY (article_title, post_time)
) WITH CLUSTERING ORDER BY (post_time DESC)

insert into timeline_data1 (article_title, post_time, content, embed_image_link, external_link) values ('Third heading', '2015-05-03 14:30:54.234', 'Hello World!', 'http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg', 'www.google.com')

insert into timeline_data1 (article_title, post_time, content, embed_image_link, external_link) values ('Second heading', '2015-05-02 13:30:54.234', 'Hello Bit!', 'http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg', 'www.google.com')

insert into timeline_data1 (article_title, post_time, content, embed_image_link, external_link) values ('Second heading', '2015-05-02 12:30:54.234', 'Hello Eason!', 'http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg', 'www.google.com')

# - redis:
docker run --name redis -p 6379:6379 -d redis

# - hbase:
create EMR
ssh -i [key.pem] ec2-user@[MASTER IP/DNS]

sudo su - hdfs

hbase shell

create 'relationship','n', 'l'

scan 'relationship' --> see nothing

update [MASTER IP/DNS] in 'happyload.py'

run python happyload.py to load in data

scan 'relationship' --> see data

### Update Config For Backend
Go to backend folder of the project, and export config directory

```
cd backend
export ENV_CONFIG_FILE=`pwd`/config/dev.cfg
```

### Ready - Go!
Go to backend folder of the project

```
cd backend
python app.py
```

Open another terminal and start frontend

```
cd social-website
node node-server.js
```
