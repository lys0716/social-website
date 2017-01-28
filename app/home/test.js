var redis_host = 'localhost';
var redis_port = '6379';
var redis = require('redis');
console.log('Creating a redis client');
var redisclient = redis.createClient(redis_port, redis_host);
redisclient.get("countVisitor", function (err, reply) {
    console.log(reply);
    if (reply == null) {
    	redisclient.set("countVisitor",1)
    } else {
        redisclient.set("countVisitor",parseInt(reply)+1);
    }
});

var redis_host = 'localhost';
var redis_port = '6379';
var redis = require('redis');
console.log('Creating a redis client');
var redisclient = redis.createClient(redis_port, redis_host);
redisclient.get("countAll", function (err, reply) {
    console.log(reply);
    if (reply == null) {
        redisclient.set("countAll",1)
    } else {
        redisclient.set("countAll",parseInt(reply)+1);
    }
  });
