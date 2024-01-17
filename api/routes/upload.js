const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { uploadByLink, uploadByFiles } = require("../controllers/upload");

router.route("/link").post(uploadByLink);

const destPath = path.join(__dirname, "../uploads/");
const photosMiddleware = multer({ dest: destPath });
router.route("/").post(photosMiddleware.array("photos", 100), uploadByFiles);

module.exports = router;
