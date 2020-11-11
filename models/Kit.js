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
  },
  uniqueVisits: {
    type: Number,
    default: 0,
  },
  creatorId: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  kitItems: [
    {
      affiliateLink: {
        type: String,
      },
      makeupCategory: {
        type: String,
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
