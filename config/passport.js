var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var db = require('../models');
var configAuth = require('./auth');

module.exports = function(passport){
		passport.serializeUser(function(user, done){
			done(null, user.id);
		});

		passport.deserializeUser(function(user, done){
			db.User.find({where: {id: user.id}}).then(function(user){
				done(null, user);
			}).error(function(err){
				done(err, null)
			});
		});

// For Authentication Purposes
passport.use("local-signup", new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done){
		process.nextTick(function(){
		db.User.findOne({
			where: {username: req.body.username}
			}).then(function(err, user){
				console.log(req.body)
			if(err) { res.render("/signup", {errors: errors})}
			if(user){
				  return done(null, false, req.flash('signupMessage', 'That email already taken'));
				  res.redirect("/login");
			} else {
			  User.create({
					username: req.body.username,
					password: bcrypt.hashSync(req.body.password),
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					birthdate: req.body
					});
				}
			})
		});	
	}
));

passport.use('local-login', new localStrategy(
		function(req, email, password, done){
			process.nextTick(function(){
				db.User.findOne({
				 where: {username: username}
				}), then(function(err, user){
					if(err)
						return done(err);
					if(!user)
						return done(null, false, req.flash('loginMessage', 'No User found'));
					
					if(!user.validPassword(password)){
						return done(null, false, req.flash('loginMessage', 'invalid password'));
					}

					return done(null, user);

				});
			});
		}
	));


	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		db.User.findOne({'facebook.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    		});
	    	});
	    }

	));
};