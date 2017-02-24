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
			db.User.find({where: {id: user.id}}).success(function(user){
				done(null, user);
			}).error(function(err){
				done(err, null)
			});
		});
}

// For Authentication Purposes
passport.use("local-signup", new localStrategy(
	function(username, password, firstname, lastname, birthdate done){
		db.User.findOne({
			where: {username: req.body.username}
			}).success(function(user){
			if(errors) { res.render("/signup", {errors: errors})}
			if(user){
				  return done(null, false, req.flash('signupMessage', 'That email already taken'));
			} else {
			  db.User.create({
					username: req.body.username;
					password: bcrypt.hashSync(req.body.password);
					firstname: req.body.firstname;
					lastname: req.body.lastname;
					birthdate: req.body.
					}).then(function())
				}
		})
	}
));

passport.use('local-login', new localStrategy(
		function(req, email, password, done){
			process.nextTick(function(){
				db.User.findOne({
				 where: {username: username}
				}), success(function(err, user){
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
	    			else {
	    				var newUser = new User();
	    				newUser.facebook.id = profile.id;
	    				newUser.facebook.token = accessToken;
	    				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
	    				newUser.facebook.email = profile.emails[0].value;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    				console.log(profile);
	    			}
	    		});
	    	});
	    }

	));
