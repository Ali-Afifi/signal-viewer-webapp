createChart();

let counter = 0;

setInterval(async () => {
	Plotly.extendTraces(
		document.getElementById("signal"),
		{
			y: [await (await getData()).yAxis],
		},
		[0]
	);
	counter+=5;
	if (counter > 5) {
		Plotly.relayout(document.getElementById("signal"), {
			xaxis: {
				range: [counter - 5, counter],
			},
			yaxis: {
				autorange: true,
				type: "numeric",
			},
		});
	}
}, 1500);

async function createChart() {
	const myDiv = document.getElementById("signal");

	const { xAxis, yAxis } = await getData();

	const data = [
		{
			x: xAxis,
			y: yAxis,
			type: "scatter",
			mode: "lines",
		},
	];

	const layout = {
		xaxis: {
			range: [0, 5],
			type: "numeric",
		},
		yaxis: {
			autorange: true,
			type: "numeric",
		},
	};

	Plotly.newPlot(myDiv, data, layout);
}

async function getData() {
	const response = await fetch("../temp_signals/healthy_ecg.csv");
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

		// console.log(`time: ${time}, value: ${value}`);
	});

	return {
		xAxis,
		yAxis,
	};
}
