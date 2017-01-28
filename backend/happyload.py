import happybase
import simplejson as json
data = json.loads(open('/Users/yishuanglu/development/python-work-space/helloworld/miserables.json').read())
hbase_host = '54.208.186.70'
hbase_table = 'relationship'
connection = happybase.Connection(hbase_host)
table = connection.table(hbase_table)
index = 0
for node in data['nodes']:
    id = str(index)
    table.put(id, {b'n:id': str(node['id']),
                   b'n:group': str(node['group'])})
    index = index + 1
index = 0
for link in data['links']:
    id = str(index)
    table.put(id, {b'l:source': str(link['source']),
                   b'l:target': str(link['target']),
                   b'l:value': str(link['value'])})
    index = index + 1