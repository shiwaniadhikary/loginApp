var User = require('../models/user');

module.exports.list = function (req, res) {
	User.find({}, function (err, results) {
		res.json(results);
	});
}

module.exports.create = function (req, res) {
	var user = new User(req.body);
	
	user.save(function (err, results) {
		res.json(results);
		console.log(results);
	});
}

