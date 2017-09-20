var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//mail stuff
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "transport.sfichi@gmail.com",
        pass: "sfichi19"
    }
});



app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('port', (process.env.PORT || 5000));

app.get('/',function(req, res){
  res.sendFile(__dirname + '\\src\\' + 'index.html');
});

// POST
app.post('/', function(req, res) {
	console.log(req.body.email);
	var mail = {
			from: req.body.email,
			to: "transport.sfichi@gmail.com",
			subject: "Mesaj de la " + req.body.name + " " + req.body.surname,
			text: "telefon: " + req.body.phone + "\n" + 
	  		"email: " + req.body.email + "\n" +
	  		"mesaj: " + req.body.message + "\n"
	}
	
	smtpTransport.sendMail(mail, function(error, response){
		if(error)
		{
			console.log(error);
			res.status(500);
			res.send('{message: not sent}');
		}
		else
		{
			console.log("Message sent: " + req.body.message);
			res.send('{message: success}');
		}
		smtpTransport.close();
	});
	
});

app.use('/styles', express.static(__dirname + '/src/css'));
app.use('/scripts', express.static(__dirname + '/src/js'));

app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
 
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});