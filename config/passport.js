'use strict'
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs')
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
		console.log(req.body)
		process.nextTick(function(){
		db.User.findOne({
			where: {username: req.body.username}
			}).then(function(err, user){

			if(err) return done(err);
			if(user){
				  return done(null, false, req.flash('signupMessage', 'That email already taken'));
			} else {
			  db.User.create({
					username: req.body.username,
					password: bcrypt.hashSync(req.body.password),
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					birthdate: req.body.birthdate
					}).then(function(err, user){
						if(err){
							done(err);
						}
						if(user){
							done(null, user);
						}
					});
				}
			})
		});	
	}
));

passport.use('local-login', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
		function(req, email, password, done){
			process.nextTick(function(){
				console.log(req.body);
				db.User.findOne({
				 where: {username: req.body.username}
				}).then(function(err, user){
					console.log(user)
					if(err){
						return done(err);
					}
					if(!user){
						return done(null, false, req.flash('loginMessage', 'No User found'));
					}
					
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
	    		db.User.findOne({
	    			where: {'User.id': profile.id}
	    		}, function(err, user){
	    			if(err) {
	    				return done(err);
	    			}
	    			if(user){
	    				return done(null, user);
	    			}
	    		});
	    	});
	    }

	));
};