import React from 'react'
import style from './style.scss'
import { Line } from 'react-chartjs'


export default class MonitoringDashlet extends React.Component {

	state = {
		data : {}
	};

	constructor(props) {
		super(props);

		console.log(this.props.monitoring);

		let datasets = [];
		let labels = [];
		this.props.monitoring[0].values.map(t => labels.push(t[0]));

		this.props.monitoring.map( dataset => {
			// TODO Label
			let label = dataset.metric.mode + dataset.metric.cpu;
			let data = [];
			dataset.values.map(v => data.push(v[1]));
			datasets.push({
				label,
				data
			})

		});

		this.state = {
			data : {
				labels: labels,
				datasets : datasets
			}
		};
	}

	render() {
		return (
			<Line data={this.state.data} width="600" height="250"/>
		);
	}
}

