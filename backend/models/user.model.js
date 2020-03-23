const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});
var User = mongoose.model('user', user);

module.exports = User;
