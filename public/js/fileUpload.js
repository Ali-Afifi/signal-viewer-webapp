const form = document.getElementById("uploadForm");

const sendFiles = async () => {
	const myFiles = document.getElementById("myFiles").files;

	const formData = new FormData();

	Object.keys(myFiles).forEach((key) => {
		formData.append(myFiles.item(key).name, myFiles.item(key));
	});

	const response = await fetch("http://localhost:8080/upload", {
		method: "POST",
		body: formData,
	});

	const json = await response.json();

	const h2 = document.getElementById("uploadMsg");
	h2.textContent = `Status: ${json?.status}\n Message: ${json?.message}`;

	// console.log(json);
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	sendFiles();
});
