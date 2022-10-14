const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const filesPayloadExists = require("./middleware/filesPayloadExists");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
	"/upload",
	fileUpload({ createParentPath: true }),
	filesPayloadExists,
	fileExtLimiter([".csv"]),
	fileSizeLimiter,
	(req, res) => {
		const files = req.files;
		// console.log(files);

		Object.keys(files).forEach((key) => {
			const filepath = path.join(
				__dirname,
				"uploaded_signals",
				files[key].name
			);
			files[key].mv(filepath, (err) => {
				if (err)
					return res
						.status(500)
						.json({ status: "error", message: err });
			});
		});

		return res.json({
			status: "success",
			message: Object.keys(files).toString(),
		});
	}
);

app.listen(8080, () => {
	console.log("listening on http://localhost:8080");
});
