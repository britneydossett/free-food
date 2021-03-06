var express = require('express');
var passport = require('passport');
var router = express.Router();
var Food = require('../models/food');

/* GET home page. */
router.get('/', function(req, res, next) {
  var foods = Food.find({});
  res.render('index', { title: 'Free Food', foods: foods });
});

// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup.ejs', { message: req.flash()});
});

// POST /signup
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/foods',
    failureRedirect : 'signup',
    failureFlash : true
  });
  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash()
  });
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/foods',
    failureRedirect : '/login',
    failureFlash : true
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
