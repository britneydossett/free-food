var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Free Food'});
});

// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup.ejs');
});

// POST /signup
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/foods',
    failureRedirect : 'signup',
  });
  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.ejs');
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/foods',
    failureRedirect : '/login',
  });
  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout()
  res.redirect('/');
});

// Restricted page


module.exports = router;
