const User = require("../models/User");
const Place = require("../models/Place");
const Booking = require("../models/Booking");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function getUserDataFromToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
			if (err) reject(err);

			resolve(userData);
		});
	});
}

// AUTH CONTROL
const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user) {
			const comparePassword = await bcrypt.compare(
				password,
				user.password
			);

			if (comparePassword) {
				jwt.sign(
					{ id: user._id, email: user.email, name: user.name },
					process.env.JWT_SECRET,
					{},
					(err, token) => {
						if (err) throw err;
						res.cookie("token", token).json(user);
					}
				);
			} else {
				res.status(StatusCodes.UNAUTHORIZED).json({
					msg: "Invalid Credentials",
				});
			}
		} else {
			res.status(StatusCodes.NOT_FOUND).json({
				msg: "Email does not exist",
			});
		}
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json(error);
	}
};

const register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await User.create({
			name,
			email,
			password,
		});

		res.status(StatusCodes.OK).json(user);
	} catch (error) {
		res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
	}
};

const logout = async (req, res) => {
	res.cookie("token", "").json(true);
};

// PLACE CONTROL
const getPlaces = async (req, res) => {
	try {
		const places = await Place.find({});
		res.status(StatusCodes.OK).json(places);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

const getPlace = async (req, res) => {
	const { id } = req.params;

	try {
		const place = await Place.findById(id);
		res.status(StatusCodes.OK).json(place);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

// BOOKING CONTROL
const bookPlace = async (req, res) => {
	const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
		req.body;

	try {
		const userData = await getUserDataFromToken(req.cookies.token);
		const bookPlace = await Booking.create({
			user: userData.id,
			place,
			checkIn,
			checkOut,
			numberOfGuests,
			name,
			phone,
			price,
		});

		res.status(StatusCodes.OK).json(bookPlace);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

const getAllBookings = async (req, res) => {
	try {
		const userData = await getUserDataFromToken(req.cookies.token);
		const bookings = await Booking.find({ user: userData.id }).populate('place');

		res.status(StatusCodes.OK).json(bookings);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

module.exports = {
	login,
	register,
	logout,
	getPlace,
	getPlaces,
	bookPlace,
	getAllBookings,
};
