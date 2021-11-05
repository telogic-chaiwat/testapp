//'use strict';
const express = require('express');
const fs = require('fs');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URL||'mongodb://127.0.0.1:27017/';
var db=null;

// App
const app = express();
app.get('/', (req, res) => {
  let version="";
  if(db!=null) {
	db.command({ buildInfo : 1 }, function(err, buildinfo) {
		version='V'+buildinfo.version;
  		fs.appendFileSync('./log/test-log.txt', 'Hey there!'+version);
  		res.send('Hello World '+version);
	});
  } else { 
	version="fail to connect to"+url;
  	fs.appendFileSync('./log/test-log.txt', 'Hey there!'+version);
  	res.send('Hello World '+version);
  }
});

MongoClient.connect(url, function(err, client) {
	if(err!=null) console.log(err);
	else {
		db = client.db();
		db.command({ buildInfo : 1 }, function(err, buildinfo) {
			  console.log('V', buildinfo.version);
		});
	}
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
