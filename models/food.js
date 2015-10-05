var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var FoodSchema = new Schema ({
  name: String,
  address: String,
  date: {type: Date, required: true},
  time: String,
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  confirmations: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Food', FoodSchema);
