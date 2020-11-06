const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentCreatorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  kits: [{ type: Schema.Types.ObjectId, ref: "Kit" }],
});

const contentCreator = mongoose.model("contentCreator", contentCreatorSchema);

module.exports = contentCreator;
