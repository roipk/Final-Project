import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

var data = []
var text = {
			title: "",
			axisX:"",
			axisY: ""
}
var type="bar"

class BarChart extends Component {
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

	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: text.title//"Most Popular Social Networking Sites"
			},
			axisX: {
				title: text.axisX,//"Social Network",
				// reversed: true,
			},
			axisY: {
				title: text.axisY,//"Monthly Active Users",
				labelFormatter: this.addSymbols
			},
			data: [{
				type: type,
				 dataPoints:data //[
				// 	{ y:  2200000000, label: "Facebook" },
				// 	{ y:  1800000000, label: "YouTube" },
				// 	{ y:  800000000, label: "Instagram" },
				// 	{ y:  563000000, label: "Qzone" },
				// 	{ y:  376000000, label: "Weibo" },
				// 	{ y:  336000000, label: "Twitter" },
				// 	{ y:  330000000, label: "Reddit" }
				// ]
			}]
		}

		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default BarChart;
