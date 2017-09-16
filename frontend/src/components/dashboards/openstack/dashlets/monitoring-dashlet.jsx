import React from 'react'
import {connect} from 'react-redux'
import style from './style.scss'
import {Line} from 'react-chartjs'
import {getMonitoringData} from '../../../../actions/dashboard/openstack-monitoring-actions'
import { TimeSeries, TimeRange } from "pondjs";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";



@connect((store) => {
	return {
		monitoring: store.monitoring
	}
})
export default class MonitoringDashlet extends React.Component {

	state = {
		metricName: '',
		metric: {},
		data: null
	};

	constructor(props) {
		super(props);

		this.props.dispatch(getMonitoringData(this.props.conf)).then(() => {
			this.setState({
				metricName: this.props.conf.metric,
				metric: this.props.monitoring[this.props.conf.metric]
			});
			this.setGraphData();
		});
	}

	triggerMonitoring(){
		this.props.dispatch(getMonitoringData(this.props.conf)).then(() => {
			this.setState({
				metricName: this.props.conf.metric,
				metric: this.props.monitoring[this.props.conf.metric]
			});
			this.setGraphData();
		});
	}

	componentDidMount() {

		// setInterval(() => this.triggerMonitoring(), 7000);
	}


	setGraphData() {

		console.log(this.state);

		let datasets = this.getDataSets();
		let labels = this.getLabels();

		this.setState({
			data: {
				labels: labels,
				datasets: datasets
			}
		});
	}

	getLabels() {
		let labels = [];
		this.state.metric.shift().values.map(t => labels.push(t[0]))
		return labels;
	}

	getDataSets() {
		let datasets = [];

		this.state.metric.map(dataset => {

			delete dataset.metric['__name__'];
			delete dataset.metric['instance'];
			delete dataset.metric['job'];

			// TODO Label
			let label = JSON.stringify(dataset.metric);
			let data = [];
			dataset.values.map(v => data.push(v[1]));
			datasets.push({
				label,
				data,
				backgroundColor: [
					'rgba(255,99,132)'
				]
			})
		});
		return datasets;
	}


	render() {
		// let series = new TimeSeries(this.state.data2);
		//
		// return (<ChartContainer timeRange={series.timerange()}>
		// 	<ChartRow height="200">
		// 		<YAxis id="axis1" label="AUD" type="linear" format="$,.2f"/>
		// 		<Charts>
		// 			<LineChart axis="axis1" series={series}/>
		// 		</Charts>
		// 	</ChartRow>
		// </ChartContainer>);

		// return (<div/>);
		return (<div>{this.state.data ? <Line data={this.state.data} width="600" height="250"/> : null}</div>)

	}
}

