const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentCreator = new Schema({
    name: {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
  },
);

const contentCreator = mongoose.model("contentCreator", contentCreator);

module.exports = contentCreator