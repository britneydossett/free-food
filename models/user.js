var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Food = require('./food');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  local: {
    email: String,
    password: String
  }
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);

