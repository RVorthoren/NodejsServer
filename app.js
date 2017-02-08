var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users');

var app = express();



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
  const response = users.getUsers();

  res.status(response.status);
  res.json(response.payload);
});

app.get('/users/:id', function(req, res) {
  var userId = req.params.id;
  var response = users.getUser(userId);

  res.status(response.status);
  res.json(response.payload);
});

app.post('/newuser', function(req, res) {
  var data = req.body;
  const response = users.makeUser(data.name, data.age, data.isMale);

  res.status(response.status);
  res.json(response.payload);

});

app.put('/users/:id', function (req, res) {
  var userId = req.params.id;
  var data = req.body;
  const response = users.updateUser(userId, data);

  res.status(response.status);
  res.json(response.payload);
});

var port = process.env.PORT || 3000;
var server = app.listen( port , function() {
  console.log('Listening server on port ' + server.address().port );
});