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
  var freeFood = global.currentUser.freeFood;
  res.render('freeFood/index', { freeFood: freeFood }); //might need flash message
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var food = {
    name: '',
    address: '',
    user: []
  };
  res.render('freeFood/new', { freeFood: freeFood });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var food = currentUser.freeFood.id(req.params.id);
  if (!food) return next(makeError(res, 'Document not found', 404));
  res.render('freeFood/show', { freeFood: freeFood } );
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var food = currentUser.freeFood.id(req.params.id);
  if (!food) return next(makeError(res, 'Document not found', 404));
  res.render('freeFood/edit', { freeFood: freeFood } );
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var food = {
    name: req.body.name,
    address: req.body.address,
    user: req.body.user
  };
  // Food.create(food, function(err, saved) {
  currentUser.freeFood.push(food);
  currentUser.save(function (err) {
    if (err) return next(err);
    res.redirect('/freeFood');
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var food = currentUser.freeFood.id(req.params.id);
  if (!food) return next(makeError(res, 'Document not found', 404));
  else {
    food.name = req.body.name;
    food.address = req.body.address;
    currentUser.save(function(err) {
      if (err) return next(err);
      res.redirect('/freeFood');
    });
  }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var food = currentUser.freeFood.id(req.params.id);
  if (!food) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.freeFood.indexOf(food);
  currentUser.freeFood.splice(index, 1);
  currentUser.save(function(err) {
    if (err) return next(err);
    res.redirect('/freeFood');
  });
});

module.exports = router;
