var localStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

var strategy = new localStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, callback) {
    User.findOne({'local.username' : username.toLowerCase()}, function(err, user) {
      console.log('this is user:' + user);
      if(err) return callback(err);
      if(user) {
        return callback(null, false, req.flash('error', 'This username is already taken.'));
      }
      if (password.length < 8) {
        return callback(null, false, req.flash('error', 'The password must be at least 8 characters long.'));
      }
      //Only one unique email can exist in the database
      User.findOne({'email' : req.body.email.toLowerCase()}, function(err, user) {
        if(err) return callback(err);
        if(user) {
          return callback(null, false, req.flash('error', 'This email is already registered.'));
        }
        if (password !== req.body.confirmPassword) {
          return callback(null, false, req.flash('error', 'Password does not match.'));
        }
        if (!req.body.optionsRadios) {
          return callback(null, false, req.flash('error', 'Please select an account type.'));
        }
        else {
          var newUser = new User();
          // Save all user name in downcase
          newUser.local.username = username.toLowerCase();
          newUser.local.password = newUser.encrypt(password);
          //Save all email lowercase
          newUser.email = req.body.email.toLowerCase();
          newUser.account = req.body.optionsRadios;

          newUser.save(function(err){
            return callback(err, newUser);
          });
        }
      });
    });
  }
);

module.exports = strategy;
