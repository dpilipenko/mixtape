// Keys
var connString = "postgres://mixtape@localhost/mixtape";

var pg = require('pg');
var Promise = require('bluebird');
var express = require('express');
var app = express();


// Helpers
function getVisitCount(callback) {
  pg.connect(connString, function(err, client, done) {
    if (err) {
      console.error('error fetching client from pool', err);
      return callback(-1);
    }
    var query = "SELECT COUNT(*) FROM visits";
    client.query(query, function (err, result) {
      done();
      if (err) {
        console.error('error running query', err);
        return callback(-1);
      }
      var count = result.rows[0].count;
      console.info('fetched count of all visits: ' + count);
      return callback(count);
    });
  });
}

function addVisit(callback) {
  pg.connect(connString, function(err, client, done) {
    if (err) {
      console.error('error fetching client from pool', err);
      callback();
    }
    var id = Math.floor((Math.random() * 100000) + 3);
    var query = "INSERT INTO visits (ID) VALUES ('" + id + "');";
    client.query(query, function (err, result) {
      done();
      if (err) {
       console.error('error running query', err);
       callback();
      }
      console.log('added one visit');
      callback();
    });
  });
}

function createVisitsTable() {
 pg.connect(connString, function(err, client, done) {
   if (err) {
     return console.error('error fetching client from pool', err);
   }
   var query = "CREATE TABLE visits(ID INT PRIMARY KEY NOT NULL);";
   client.query(query, function (err, result) {
     done();
     if (err) {
       return console.error('error running query', err);
     }
     console.log('created table visits');
   });
 });
}

// Routes
// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  addVisit(function (result) {
    getVisitCount(function (result) {
      res.send('Hello World! Visit: ' + result);
    });
  });
});

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});



// Start Server
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:%s', port);
});
