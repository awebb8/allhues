const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KitSchema = new Schema({
	kitName: {
		type: String,
	},
	kitDescription: {
		type: String,
	},
	hueTypeId: {
		type: Number,
	},
	creatorId: {
		type: String,
	},
	imageUrl: {
		type: String,
	},
	kitItems: [
		// {
		//   type: Schema.Types.ObjectId,
		//   ref: "KitItems",
		// },
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
