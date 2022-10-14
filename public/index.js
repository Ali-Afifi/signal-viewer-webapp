createChart();

async function createChart() {
	const myDiv = document.getElementById("signal");

	const { xAxis, yAxis } = await getData();

	Plotly.newPlot(myDiv, [
		{
			x: xAxis,
			y: yAxis,
			type: "line",
		},
	]);
}

async function getData() {
	const response = await fetch("signals/healthy_emg.csv");
	const data = await response.text();

	const table = data.split("\n").slice(1);

	const xAxis = [];
	const yAxis = [];

	table.forEach((row) => {
		let column = row.split(",");

		let time = column[0];
		let value = column[1];

		xAxis.push(time);
		yAxis.push(parseFloat(value));

		console.log(`time: ${time}, value: ${value}`);
	});

	return {
		xAxis,
		yAxis,
	};
}
