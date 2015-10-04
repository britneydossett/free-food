var passport = require('passport');
var localSignupStrategy = require('./local-signup-strategy');
var localLoginStrategy = require('./local-login-strategy');
var User = require('../../models/user');

var passportConfig = function(passport) {

  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);

  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    user.findById(id, function(err, user) {
      callback(err, user);
    });
  });
};

module.exports = passportConfig;
