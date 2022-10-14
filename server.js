const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
	const file = fs.readFileSync("./public/index.html", {
		encoding: "utf-8",
	});
	res.send(file);
});

app.listen(8080, () => {
	console.log("listening on http://localhost:8080");
});


