var express = require('express'),
	User    = require('../models/user');

module.exports = (function ()
{	
	var router = express.Router();

	router.get('/', function (req, res)
	{	
		User.find(function (err, users)
		{
			if (err)
			{
				res.render('index', { errorMessage : 'Database problem finding users'});
			}

			res.render('index', 
			{
				successMessage : req.flash('successMessage'),
				users          : users
			});
		});
	});

	return router;

}());