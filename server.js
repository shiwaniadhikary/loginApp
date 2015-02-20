var express = require('express');
var app = express();
var db = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./server/models/user');
var userController = require('./server/controllers/userController.js');

//mongoose connection string
db.connect('mongodb://localhost:27017/userdb');

//init middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
	secret: 'secret',
	resave: false,
	saveUninitialized: false	
}));

app.use(passport.initialize());
app.use(passport.session());

//passport config
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//set static js directory
app.use('/js', express.static(__dirname + '/client/js'));

//routes
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/views/index.html');
});
app.post('/', passport.authenticate('local'), function (req, res) {
	res.redirect('/admin.html');
})

app.get('/register.html', function (req, res) {
	res.sendFile(__dirname + '/client/views/register.html');
});
app.post('/register', function (req, res) {
	Account.register(new Account({ username : req.body.username}), req.body.password, function (err, account) {
		if (err) {
			return res.sender('register', {account : account});
		}

		passport.authenticate('local')(req, res, function () {
			res.redirect('/admin.html');
		});
	});
});

app.get('/admin.html', function (req, res) {
	res.sendFile(__dirname + '/client/views/admin.html');
});

app.get('/api/users', userController.list);

app.listen(3000, function() {
	console.log('Listening...');
});