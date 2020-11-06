const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kitItemsSchema = new Schema({
  kitItemId: {
    type: Number,
  },
  affiliateLink: {
    type: String,
  },
  kitId: {
    type: Number,
  },
});

const kitItems = mongoose.model("KitItems", kitItemsSchema);

module.exports = kitItems;
