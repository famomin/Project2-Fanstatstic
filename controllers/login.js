var db= require('../models');
var path = require ("path");

//create method to authenticate the datapage
function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

module.exports = function(app, passport){
	app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  	});

	//
  	app.get("/datapage", function(req, res) {
    res.render("datapage");
  	});

	app.get("/login", function(req, res) {
    res.render("login");
  	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/datapage',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get("/signup", function(req, res) {
    res.render("signup");
  	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/datapage', isAuthenticated, function(req, res){
		res.render('datapage', { user: req.user });
	});

	//facebook authenticate request
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/datapage',
	                                      failureRedirect: '/login' }));

	//logout 
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	})
};
