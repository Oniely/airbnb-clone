const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const profile = (req, res) => {
	const { token } = req.cookies;

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
			if (err) throw err;
			
			const { name, email, _id } = await User.findById(userData.id);
			res.status(StatusCodes.OK).json({ token, name, email, _id });
		});
	} else {
		res.json(null);
	}
};

module.exports = {
	profile,
};
