const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KitSchema = new Schema({
  kitName: {
    type: String,
  },
  kitDescription: {
    type: String,
  },
  hueType: {
    type: String,
    enum: ["Fitz1", "Fitz2", "Fitz3", "Fitz4", "Fitz5", "Fitz6"],
  },
  uniqueVisits: {
    type: Number,
    default: 0,
  },
  creatorId: {
    type: String,
  },
  // imageUrl: {
  //   type: String,
  // },
  imageUrl: [Object],
  // videoUrl: {
  //   type: String,
  // },
  videoUrl: [Object],
  kitItems: [
    {
      affiliateLink: {
        type: String,
      },
      makeupCategory: {
        type: String,
      },
      linkClicks: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Kit = mongoose.model("Kit", KitSchema);
module.exports = Kit;
