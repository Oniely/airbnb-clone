require("dotenv").config();

const express = require("express");
const app = express();

// packages
const connectDB = require("./db/connect");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// middleware
app.use(express.json());
// to enable to use cookie (check index controller - auth)
app.use(cookieParser());
app.use("/uploads", express.static("./uploads"));

// to enable communication/connection from client/frontend react
app.use(
	cors({
		credentials: true,
		// url of frontend
		origin: "http://localhost:5173",
	})
);

// routes
app.use("/", require("./routes"));
app.use("/account", require("./routes/account"));
app.use("/upload", require("./routes/upload"));
app.use("/user-places", require("./routes/user-places"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log(`Server is listening on port ${PORT}...`);
	} catch (error) {
		console.log(error);
	}
});
