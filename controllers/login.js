var db= require('../models');
var path = require ("path");

//create method to authenticate the datapage
function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/')
}

module.exports = function(app, passport){
	app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  	});

	app.get("/login", function(req, res) {
			console.log("GET LOGIN");
			console.log(req.flash());
    	res.render("login");
  	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/datapage',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get("/signup", function(req, res) {
			console.log("GET SIGNUP");
			console.log(req.flash());
    	res.render("signup");
  	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/datapage', isAuthenticated, function(req, res){
		console.log("GET DATAPAGE");
		res.render('datapage', { user: req.user });
	});

	
	//facebook authenticate request
	app.get('/login/facebook', passport.authenticate('facebook'));

	app.get('/login/facebook/return', 
	  		passport.authenticate('facebook', 
	  		  { failureRedirect: '/login' }), function(req, res){
	  			res.redirect("/datapage");
	  		});
	
	//google authenticate request
	app.get('/auth/google', passport.authenticate('google',  {scope: 'https://www.googleapis.com/auth/plus.login'}
		));

	app.get('/auth/google/callback', 
	  		passport.authenticate('google', 
	  		  { failureRedirect: '/login' }), function(req, res){
	  			res.redirect("/datapage");
	  		});

	//logout 
	app.get('/logout', function(req, res){
		req.logout();
		req.session.destroy();
		res.redirect('/login');
	})
};
