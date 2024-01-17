const express = require("express");
const router = express.Router();

const { profile } = require("../controllers/account");

router.route("/").get(profile);

module.exports = router;
