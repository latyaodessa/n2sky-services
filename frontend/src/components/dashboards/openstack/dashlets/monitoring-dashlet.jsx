import React from 'react'
import {connect} from 'react-redux'
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import style from './style.scss'


// @connect((store) => {
// 	return {
// 		servers: store.monitor.data,
// 		fetched: store.monitor.fetched
// 	}
// })
export default class MonitoringDashlet extends React.Component {


	constructor(props) {
		super(props);
		// this.props.dispatch(getOpenstackServers(this.props.id));
	}

	// addDashlets(servers) {
	// 	return servers.servers.map(server => <ServerDashlet key={server.id} server={server}/>);
	// }

	componentDidMount() {
		// setInterval(() => this.forceUpdate(), 5000);
	}


	render() {

		let data = {
			columns: [
				['free', 30, 200, 100, 400, 150, 250],
				['used', 50, 20, 10, 40, 15, 25]
			]
		};
		const mountNode = document.getElementById('react-c3js');
		return (
			<div className="pure-u-1-3 pure-sm-1-1">
				<C3Chart data={data} />
			</div>)
	}
}
