var express = require('express');
var router = express.Router();
var Food = require('../models/food');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

//INDEX
router.get('/', authenticate, function(req, res, next) {
  console.log('Food Index');
  var foods = global.currentUser.foods;
  // res.render('foods/index', { foods: foods }); //might need flash message
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var food = {
    name: '',
    address: '',
    user: []
  };
  res.render('foods/new', { foods: foods });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var food = currentUser.foods.id(req.params.id);
  if (!food) return next(makeError(res, 'Document not found', 404));
  res.render('foods/show', { foods: foods } );
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var food = currentUser.foods.id(req.params.id);
  if (!food) return next(makeError(res, 'Document not found', 404));
  res.render('foods/edit', { foods: foods } );
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var food = {
    name: req.body.name,
    address: req.body.address,
    user: req.body.user
  };
  // Food.create(food, function(err, saved) {
  currentUser.foods.push(food);
  currentUser.save(function (err) {
    if (err) return next(err);
    res.redirect('/foods');
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var food = currentUser.foods.id(req.params.id);
  if (!food) return next(makeError(res, 'Document not found', 404));
  else {
    food.name = req.body.name;
    food.address = req.body.address;
    currentUser.save(function(err) {
      if (err) return next(err);
      res.redirect('/foods');
    });
  }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var food = currentUser.foods.id(req.params.id);
  if (!food) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.foods.indexOf(food);
  currentUser.foods.splice(index, 1);
  currentUser.save(function(err) {
    if (err) return next(err);
    res.redirect('/foods');
  });
});

module.exports = router;
