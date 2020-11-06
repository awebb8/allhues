const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentCreatorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
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

const contentCreator = mongoose.model("contentCreator", contentCreatorSchema);

module.exports = contentCreator;