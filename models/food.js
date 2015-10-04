var mongoose = require('mongoose');
// var User = require('./user');
var Schema = mongoose.Schema;

var foodSchema = new Schema ({
  name: String,
  address: String,
  date: Date,
  time: Date,
  // user: [{ type: mongoose.Schema.ObjectId, ref 'User' }]
});

module.exports = mongoose.model('Food', foodSchema);
