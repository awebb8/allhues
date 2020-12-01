const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentCreatorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
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
  image: {
    type: String,
    default: "https://avatars.dicebear.com/api/female/sdfsdf.svg",
  },
  // videos: {
  //   type: Array,
  // },
  videos: [Object],
  // videos: [
  //   {
  //     vidLink: {
  //       type: String,
  //     },
  //   },
  // ],
  following: [Object],
  followers: [Object],
  role: {
    type: String,
    enum: ["Consumer", "Content Creator"],
    default: "Consumer",
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Kit" }],
  kits: [{ type: Schema.Types.ObjectId, ref: "Kit" }],
});

const contentCreator = mongoose.model("contentCreator", contentCreatorSchema);

module.exports = contentCreator;
