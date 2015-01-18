function errorHandler (req, res, errors, newUser)
{
	req.flash('errors', errors);
	req.flash('newUser', newUser);
	res.redirect('/newuser');
}

var express = require('express'),
	User    = require('../models/user');

module.exports = (function ()
{
	var router = express.Router();

	router.get('/', function (req, res)
	{
		res.render('newuser.ejs', 
		{
			errors : req.flash('errors'),
			user : req.flash('newUser')[0]
		});
	})

	router.post('/', function (req, res)
	{
		var errors    = [],
			newUser   =
			{
				name     : req.body.name,
				username : req.body.username,
				email    : req.body.email
			}

		for (var prop in newUser)
		{
			if (newUser[prop] === '')
			{
				errors.push('Please complete the ' + prop + ' field');
			}
		}

		if (errors.length)
		{	
			return errorHandler(req, res, errors, newUser);
		}

		newUser = new User(newUser);

		newUser.save(function (err)
		{
			if (err)
			{
				errors.push(err);
				return errorHandler(req, res, errors, newUser);						
			}
			
			req.flash('successMessage', 'User \'<strong>' + newUser.username  + '</strong>\' Successfuly Created');
			return res.redirect('/');
		});
	});	

	return router;

}());