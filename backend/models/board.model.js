const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boards = new Schema({
  created_by: {
      type: String,
      required: true,
  },
  boardname: {
      type: String,
      required: true,
  },
  usernames: {
      type: [String],
      required: true,
  },
  list: Schema.Types.Mixed
  /*list [
            {
                title:String,
                pos: {X: Y:},
                cards: [
                    {
                    index;
                    text:
                    due-date:
                    attachement:
                    }
                ]
            }
         ]
         */
});
var Boards = mongoose.model('boards', boards);

module.exports = Boards;