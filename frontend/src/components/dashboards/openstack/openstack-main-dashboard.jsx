import React from 'react';
import {connect} from 'react-redux';
import {getOpenstackProjects} from "../../../actions/dashboard/openstack-actions"
import {getMonitoringData} from '../../../actions/dashboard/openstack-monitoring-actions'
import Loader from './../../core/loader/loader'
import ProjectsDashlet from './dashlets/projects-dashlet'
import MonitoringDashlet from './dashlets/monitoring-dashlet'



@connect((store) => {
	return {
		monitoring: store.monitoring,
		projects : store.openstackProjectsReducer.projects,
		fetched : store.openstackProjectsReducer.fetched
	}
})
export default class OpenStackMainDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackProjects());
		let metrics = [
			{
				metric : 'node_cpu',
				delay : 1,
				delaytype : 'minutes',
				step : '10s'
			},
			{
				metric : 'node_memory_active_bytes_total',
				delay : 60,
				delaytype : 'minutes',
				step : '5m'
			}
		];
		this.props.dispatch(getMonitoringData(metrics[0]));
		this.props.dispatch(getMonitoringData(metrics[1]));
	}

	addDashlets(projects) {
		if(!projects.projects) return null;
		return projects.projects.map(prj =>  <ProjectsDashlet key={prj.id} project={prj}/>);
	}


	render() {
		return (
			<div>
				{this.props.fetched ? this.addDashlets(this.props.projects) : <Loader/>}
				{this.props.monitoring.node_cpu ? <MonitoringDashlet monitoring={this.props.monitoring.node_cpu}/> : <b>bb</b>}
				{this.props.monitoring.node_memory_active_bytes_total ? <MonitoringDashlet monitoring={this.props.monitoring.node_memory_active_bytes_total}/> : <b>bb</b>}
			</div>
		)
	}
}
