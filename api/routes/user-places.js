const express = require("express");
const router = express.Router();

const {
	newPlace,
	places,
	place,
	updatePlace,
} = require("../controllers/user-places");

router.route("/").get(places).post(newPlace);
router.route("/:id").get(place).patch(updatePlace);

module.exports = router;
