const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	title: {
		type: String,
		required: [true, "Please provide title"],
	},
	address: {
		type: String,
		required: [true, "Please provide address"],
	},
	photos: {
		type: [String],
		required: [true, "Please provide photos"],
	},
	description: String,
	perks: [String],
	extraInfo: String,
	checkIn: Number,
	checkOut: Number,
	maxGuest: Number,
	price: {
		type: Number,
		required: [true, "Please provide price"],
	},
});

module.exports = mongoose.model("Place", placeSchema);
