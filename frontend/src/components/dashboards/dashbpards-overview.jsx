import React from 'react';
import {connect} from 'react-redux'
import {getOpenStackUserConfigData} from '../../actions/dashboard/openstack-monitoring-actions'
import Loader from './../core/loader/loader'
import MonitoringDashlet from './../dashboards/openstack/dashlets/monitoring-dashlet-new'


@connect((store) => {
	return {
		openstackUserConfig: store.openstackUserConfig.config,
		openstackUserConfigFetched: store.openstackUserConfig.fetched
	}
})
export default class DashboardsOverview extends React.Component {


	state = {
	};

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenStackUserConfigData(localStorage.getItem("user"), 'overview'));
	}

	addMonitoringDashlets() {
		return this.props.openstackUserConfig.map(conf => <MonitoringDashlet key={conf.metric} conf={conf}/>);
	}


	getOpenstackMonitoringPanel(){
		return <div>
			{this.props.openstackUserConfigFetched ? this.addMonitoringDashlets() : <Loader/> }
		</div>
	}


	render() {
		return (
			<div>
				{this.getOpenstackMonitoringPanel()}
				TO DO
			</div>
		)
	}
}

