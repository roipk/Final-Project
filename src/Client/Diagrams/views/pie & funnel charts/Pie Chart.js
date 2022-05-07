import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			data:props.data,
		};
	}

	async componentDidMount() {
		// this.props.userdata.then((value) => {
		// 	console.log(value)
		// 	this.setState({
		// 		userData: value,
		// 	});
		// });
	}

	render() {
		if(this.state.data)
		{
			const options1 = {
				exportEnabled: true,
				animationEnabled: true,
				title: {
					text: "Researches Year Pie Chart"
				},
				data: [{
					type: "pie",
					startAngle: 75,
					toolTipContent: "<b>{label}</b>: {y}",
					showInLegend: "true",
					legendText: "{label}",
					indexLabelFontSize: 16,
					indexLabel: "{y} - {label}",
					dataPoints:this.state.data

				}]
			}

			return (
				<div>
					{/*<h1>Researches Year Pie Chart</h1>*/}
					<br/>
					<CanvasJSChart options = {options1}
						/* onRef={ref => this.chart = ref} */
					/>
					{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
				</div>
			);
		}
		else
		{
			const options = {
				exportEnabled: true,
				animationEnabled: true,
				title: {
					text: "Website Traffic Sources"
				},
				data: [{
					type: "pie",
					startAngle: 75,
					toolTipContent: "<b>{label}</b>: {y}%",
					showInLegend: "true",
					legendText: "{label}",
					indexLabelFontSize: 16,
					indexLabel: "{label} - {y}%",
					dataPoints:
						[
							{ y: 18, label: 2 },
							{ y: 49, label: 1 },
							{ y: 9, label: 3 },
							{ y: 5, label: "Referral" },
							{ y: 19, label: "Social" }
						]
				}]
			}

			return (
				<div>
					{/*<h1>Researches Year Pie Chart</h1>*/}
					<CanvasJSChart options = {options}
						/* onRef={ref => this.chart = ref} */
					/>
					{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
				</div>
			);
		}

	}
}

export default PieChart;
