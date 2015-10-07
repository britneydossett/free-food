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
  Food.find({ owner: currentUser }, function(err, foods) {
     if (err) return next(err);
     res.render('foods/index', { foods: foods });
   });
  // console.log('Food Index');
  // var foods = global.currentUser.foods;
  // res.render('foods/index', { foods: foods }); //might need flash message
});

//Create an API (hint: project 4)
router.get('/api/foods', function(req, res, next) {
  Food.find({}, function(err, foods) {
     if (err) return next(err);
     res.send(foods);
   });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var food = {
    name: '',
    address: '',
    date: Date,
    time: String,
    user: []
  };
  res.render('foods/new', { food: food });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  Food.findById(req.params.id, function(err, food) {
     if (err) return next(err);
     res.render('foods/show', { food: food });
   });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  Food.findById(req.params.id, function(err, food) {
     if (err) return next(err);
      res.render('foods/edit', { food: food } );
   });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var food = {
    name: req.body.name,
    address: req.body.address,
    date: req.body.date,
    time: req.body.time,
    owner: currentUser._id
  };
  Food.create(food, function(err, saved) {
  // currentUser.foods.push(food);
  // currentUser.save(function (err) {
    if (err) return next(err);
    res.redirect('/foods');
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  Food.findById(req.params.id, function(err, food) {
     if (err) return next(err);
  else {
    food.name = req.body.name;
    food.address = req.body.address;
    food.date = req.body.date;
    food.time = req.body.time;
    food.save(function(err) {
      if (err) return next(err);
      res.redirect('/foods');
    });
  }
});
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  Food.findByIdAndRemove(req.params.id, function(err, food) {
    if (err) return next(err);
    if (!food) return next(makeError(res, 'Document not found', 404));
    res.redirect('/foods');
  });
});

module.exports = router;
