var express = require('express'),
	User    = require('../models/user');

module.exports = (function ()
{
	var router = express.Router();

	router.get('/:id', function (req, res)
	{
		User.findById(req.params.id, function (err, user)
		{	
			if (!user)
			{
				return res.redirect('/');
			}

			res.render('user', 
			{ 	
				successMessage : req.flash('successMessage'),
				errorMessage   : req.flash('errorMessage'),
				user           : user
			});
		});
	})

	router.post('/:id', function (req, res)
	{
		var method = req.body.method,
			id     = req.params.id;

		if (method === 'update')
		{
			User.findById(id, function (err, user)
			{
				if (err)
				{	
					req.flash('errorMessage', 'Unable to find user');
					return res.redirect('/user/' + id);
				}

				user.name = req.body.name;
				user.username = req.body.username;
				user.email = req.body.email;

				user.save(function (err)
				{
					if (err)
					{	
						req.flash('errorMessage', 'Unable to update user');
						return res.redirect('/user/' + id);
					}

					req.flash('successMessage', 'Succesfully updated <strong>' + user.username + '</strong>');
					return res.redirect('/user/' + id);
				});
			});
		}
		else if (method === 'delete')
		{
			User.remove({_id : id}, function (err)
			{
				if (err)
				{
					req.flash('errorMessage', 'Unable to delete user');
					return res.redirect('/user/' + id);
				}

				req.flash('successMessage', 'User succesfully deleted');
				return res.redirect('/');
			})
		}

	});

	return router;

}());