var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var users = {
  0: {
    name: 'Remco Vorthoren',
    age: 20,
    male: true
  },
  1: {
    name: 'Mevrouw Vorthoren',
    age: 20,
    male: false
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

app.post('/newuser', function(req, res) {
  var info = req.body;

  var response = {'code':201};

  if (!info || !info.name) response.code = 400;
  else {
    users[Object.keys(users).length] = info;
  }
  res.json(response);
});

app.put('/users/:id', function (req, res) {
  var userId = req.params.id;
  var info = req.body;
  var user = users[userId];
  Object.assign(user,info);
  /*Because of the reference of the user object, the user is also updated in the users object*/

  res.json({'code': 201});
});

var port = process.env.PORT || 3000;
var server = app.listen( port , function() {
  console.log('Listening server on port ' + server.address().port );
});