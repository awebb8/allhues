const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReceivedMessageSchema = new Schema({
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  senderId: {
    type: String,
  },
  senderUsername: {
    type: String,
  },
    createdDate: {
      type: Date,
      default: Date.now,
    },
});
const ReceivedMessage = mongoose.model(
  "ReceivedMessage",
  ReceivedMessageSchema
);
module.exports = ReceivedMessage;
