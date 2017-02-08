var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.all('*', function(req,res,next){
  console.log(req.method+" "+req.url);
  next();
});

app.get('/', function(req, res) {
  res.send('Hello World');
});

var port = process.env.PORT || 3000;
var server = app.listen( port , function() {
  console.log('Listening server on port ' + server.address().port );
});