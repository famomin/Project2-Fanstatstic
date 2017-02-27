'use strict'
var bcrypt = require('bcrypt-nodejs')
var localStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var db = require('../models');
var configAuth = require('./auth');

module.exports = function(passport){
		passport.serializeUser(function(user, done){
			console.log("SERIALIZING");
			console.log(user.id);
			done(null, user.id);
		});

		passport.deserializeUser(function(user, done){
			console.log("DESERIALIZE");
			console.log(user);
			db.User.find({where: {id: user}}).then(function(user){
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
		console.log('PASSPORT SIGN UP');

		db.User.findOne({
			where: {username: req.body.username}
			}).then(function(user){


			if(user){
					console.log('PASSPORT: USER ALREADY EXISTS');
				  return done(null, false, req.flash('signupMessage', 'That email already taken'));
			} else {
				console.log('PASSPORT: BEFORE CREATE');

			  db.User.create({
					username: req.body.username,
					password: bcrypt.hashSync(req.body.password),
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					birthdate: req.body.birthdate
					}).then(function(results){

						return done(null, results.get());
					});
				}

			}).catch(function(err){
					return done(err);
			});

	}
));

passport.use('local-login', new localStrategy({
		usernameField: 'username',
		passwordField: 'Password',
		passReqToCallback: true
	},
		function(req, email, password, done){
				console.log("LOGIN PASSPORT");

				db.User.findOne({
				 where: {username: req.body.username}
				}).then(function(user){
					console.log("USER IS NEXT");
					console.log(user)

					if(!user){
						console.log("no user");
						return done(null, false, req.flash('loginMessage', 'No User found'));
					}

					if(!db.User.validPassword(password, user)){
						
						console.log("Checking password");
						return done(null, false, req.flash('loginMessage', 'invalid password'));
					}
					else {
					console.log('everything checked out');
					return done(null, user);
					 }

				}).catch(function(err){
						return done(err);
				});

		}
	));


	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	  	console.log(profile, done);
	  		
	  		db.fblogin.findOne({
			where: {id: profile.id}
			}).then(function(user){


			if(user){
					console.log('PASSPORT fb: USER ALREADY EXISTS');
				  return done(null, user);
			} else {
				console.log('PASSPORT fb : BEFORE CREATE');

			  db.User.create({
					//id: profile.id,
					displayName: profile.displayName,
					gender: profile.gender
					}).then(function(results){

						return done(null, results.get());
					});
				}

			}).catch(function(err){
					return done(err);
			});
	    	}

	));

	passport.use(new GoogleStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL
  	},
  	function(token, tokenSecret, profile, done) {
      console.log(token, tokenSecret, profile, done);
      db.googlogin.findOne({
			where: {id: profile.id}
			}).then(function(user){


			if(user){
					console.log('PASSPORT fb: USER ALREADY EXISTS');
				  return done(null, user);
			} else {
				console.log('PASSPORT fb : BEFORE CREATE');

			  db.User.create({
					//id: profile.id,
					displayName: profile.displayName,
					gender: profile.gender
					}).then(function(results){

						return done(null, results.get());
					});
				}

			}).catch(function(err){
					return done(err);
			});
	    	}
	));
};