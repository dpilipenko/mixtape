var express = require('express');
var app = express();

// Routes
app.get('/', function (req, res) {
  res.send('Hello World!');
});



// Start Server
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:%s', port);
});
