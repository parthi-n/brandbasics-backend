const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
	itemName: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
	image: {
		type: String,
	},
	itemType: {
		type: String,
		enum: ["Set Meal", "Ala Carte", "Add On"],
	},
});

const shopSchema = new mongoose.Schema({
	shopName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},

	menu: [menuSchema],
	orderNumber: {
		type: Number,
	},
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
