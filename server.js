var express = require('express');
var app = express();
var db = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var userController = require('./server/controllers/userController.js');

//mongoose connection string
db.connect('mongodb://localhost:27017/userdb');

//init middleware
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({ secret: 'secret' }));

app.use(passport.initialize());
app.use(passport.session());

//set static js directory
app.use('/js', express.static(__dirname + '/client/js'));

//routes
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/views/index.html');
});
app.post('/', function (req, res) {

});

app.get('/register.html', function (req, res) {
	res.sendFile(__dirname + '/client/views/register.html');
});

app.get('/admin.html', function (req, res) {
	res.sendFile(__dirname + '/client/views/admin.html');
});

app.get('/api/users', userController.list);
app.post('/api/users', userController.create);

app.listen(3000, function() {
	console.log('Listening...');
});