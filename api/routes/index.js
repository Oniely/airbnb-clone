const express = require("express");
const router = express.Router();

const { login, register, logout, places, place } = require("../controllers");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(logout);
router.route("/places").get(places);
router.route("/place/:id").get(place);

module.exports = router;
