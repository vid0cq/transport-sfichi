var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/',function(req, res){
  res.sendFile(__dirname + '\\src\\' + 'index.html');
});

// POST http://localhost:8080/api/users
app.post('/', function(req, res) {
    console.log(req.body);
		res.send('{message: success}');
});

app.use('/styles', express.static(__dirname + '/src/css'));
app.use('/scripts', express.static(__dirname + '/src/js'));

app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
  
app.listen(3000, function(){
  console.log("Server running at Port 3000");
});