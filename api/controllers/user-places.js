const Place = require("../models/Place");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const newPlace = async (req, res) => {
	const { token } = req.cookies;

	jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
		if (err) throw err;

		const {
			title,
			address,
			addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
			price
		} = req.body;

		try {
			const place = await Place.create({
				owner: userData.id,
				title,
				address,
				photos: addedPhotos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuest: maxGuests,
				price
			});

			res.status(StatusCodes.OK).json(place);
		} catch (error) {
			res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
		}
	});
};

const places = (req, res) => {
	const { token } = req.cookies;

	jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
		if (err) throw err;

		const { id } = userData;

		try {
			const places = await Place.find({ owner: id });
			res.status(StatusCodes.OK).json(places);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
		}
	});
};

const place = async (req, res) => {
	const { id } = req.params;

	try {
		const place = await Place.findById(id);
		res.status(StatusCodes.OK).json(place);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

const updatePlace = async (req, res) => {
	const { token } = req.cookies;
	const { id } = req.params;
	const {
		title,
		address,
		addedPhotos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
		price
	} = req.body;

	jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
		if (err) throw err;

		try {
			// find the place by _id using id and compare token userData to the result
			// then update the place using .set() and .save()
			const place = await Place.findById(id);
			if (place.owner.toString() === userData.id) {
				place.set({
					title,
					address,
					photos: addedPhotos,
					description,
					perks,
					extraInfo,
					checkIn,
					checkOut,
					maxGuest: maxGuests,
					price
				});
				place.save();
				res.status(StatusCodes.OK).json(place);
			} else {
				res.status(StatusCodes.UNAUTHORIZED).json(false);
			}
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
		}
	});
};

module.exports = { newPlace, places, place, updatePlace };
