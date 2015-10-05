var localStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

var strategy = new localStrategy(
{
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function(req, email, password, callback) {
  User.findOne({'local.email' : email}, function(err, user) {
    if(err) return callback(err);
    if(!user) {
      return callback(null, false, req.flash('error', 'Either your username or password is incorrect'));
    }
    if(!user.validPassword(password)) {
      return callback(null, false, req.flash('error', 'Either your username or password is incorrect'));
    }
    return callback(null, user);
  });
});

module.exports = strategy;
