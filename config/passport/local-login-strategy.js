var localStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

var Strategy = new localStrategy(
{
  usernameField: 'email',
  passwordField: 'password',
  pasReqToCallback: true
},
function(req, email, password, callback) {
  user.findOne({'local.email' : email}, function(err, user) {
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

module.export = Strategy;
