const imageDownloader = require("image-downloader");
const { StatusCodes } = require("http-status-codes");
const pathR = require("path");
const multer = require("multer");
const fs = require("fs");

const uploadByLink = async (req, res) => {
	const { link } = req.body;
	const newName = "photo-" + Date.now() + ".jpg";
	const destPath = pathR.join(__dirname, "../uploads/", newName);

	try {
		await imageDownloader.image({
			url: link,
			dest: destPath,
		});
		res.status(StatusCodes.OK).json(newName);
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json(error);
	}
};

const uploadByFiles = async (req, res) => {
	const uploadedFiles = [];
	for (let i = 0; i < req.files.length; i++) {
		const { path, originalname } = req.files[i];
		const ext = originalname.split(".")[1];
		const newPath = path + "." + ext;
		fs.renameSync(path, newPath);

		const fileName = pathR.basename(newPath);
		uploadedFiles.push(fileName);
	}
	res.status(StatusCodes.OK).json(uploadedFiles);
};

module.exports = { uploadByLink, uploadByFiles };
