const express = require("express");
const router = express.Router();

const {
	login,
	register,
	logout,
	getPlace,
	getPlaces,
	bookPlace,
	getAllBookings,
} = require("../controllers");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(logout);

router.route("/places").get(getPlaces);
router.route("/place/:id").get(getPlace);

router.route("/booking").post(bookPlace);

router.route("/bookings").get(getAllBookings);

module.exports = router;
