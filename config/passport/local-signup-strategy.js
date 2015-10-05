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
      if(user) {
        return callback(null, false, req.flash('error', 'This email is already taken.'));
      }
      else {
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.encrypt(password);

        newUser.save(function(err){
          return callback(err, newUser);
        });
      }
    });
  }
);

module.exports = strategy;
