const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, required: true },
	place: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Place",
	},
	checkIn: { type: Date, required: true },
	checkOut: { type: Date, required: true },
	name: { type: String, required: true },
	phone: { type: String, required: true },
	price: { type: Number, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);
