import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var data = []
var text = {
	title: "",
	axisX:"",
	axisY: ""
}
var type="pie"

class PieChart extends Component {
	constructor(props) {
		super(props);
		console.log(props)
		data = props.data.data
		text = props.data.text
		type = props.data.type

	}

	componentWillUpdate(nextProps, nextState, nextContext) {
		console.log(nextProps)
		data = nextProps.data.data
		text = nextProps.data.text
		type = nextProps.data.type
	}


	render() {
		console.log(data)
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: text.title
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y} songs",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y} songs",
				dataPoints:data,
					// [
					// 	{y: 18, label: 2},
						// {y: 49, label: 1},
						// {y: 9, label: 3},
						// {y: 5, label: "Referral"},
						// {y: 19, label: "Social"}
					// ]
			}]
		}


		return (
			<div>
				{/*<h1>Researches Year Pie Chart</h1>*/}
				<CanvasJSChart options={options}
					/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default PieChart;
