var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var users = {
  1: {
    id: '1'
  },
  2: {
    id: '2'
  }
};

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.all('*', function(req,res,next){
  console.log(req.method+" "+req.url);
  next();
});

app.get('/', function (req, res) {
  res.status(200);
  res.send('Welcome to the express server with a sql database');
});

app.get('/users', function (req, res) {
  res.json(users);
});

app.get('/users/:id', function(req, res) {
  var user = users[req.params.id];
  res.status(200);
  res.json(user);
});

var port = process.env.PORT || 3000;
var server = app.listen( port , function() {
  console.log('Listening server on port ' + server.address().port );
});