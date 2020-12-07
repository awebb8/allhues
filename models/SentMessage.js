const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SentMessageSchema = new Schema({
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  receiverId: {
    type: String,
  },
  receiverUsername: {
    type: String,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const SentMessage = mongoose.model("SentMessage", SentMessageSchema);
module.exports = SentMessage;
