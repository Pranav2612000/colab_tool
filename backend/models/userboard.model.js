const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBoards = new Schema({
  username: {
    type: String,
    required: true,
  },
  personalBoards: {
      type: [String]
  },
  teamBoards: {
      type: [String]
  }
});
var UserBoards = mongoose.model('userBoards', userBoards);

module.exports = UserBoards;
