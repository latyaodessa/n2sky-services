import React from 'react';
import {connect} from 'react-redux';
import {getOpenstackProjects} from "../../../actions/dashboard/openstack-actions"
import Loader from './../../core/loader/loader'
import ProjectsDashlet from './dashlets/projects-dashlet'
import MonitoringDashlet from './dashlets/monitoring-dashlet'



@connect((store) => {
	return {
		projects: store.openstackProjectsReducer.projects,
		fetched: store.openstackProjectsReducer.fetched
	}
})
export default class OpenStackMainDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackProjects());
	}

	addDashlets(projects) {
		if(!projects.projects) return null;
		return projects.projects.map(prj =>  <ProjectsDashlet key={prj.id} project={prj}/>);
	}


	render() {
		return (
			<div className="pure-g">
				{this.props.fetched ? this.addDashlets(this.props.projects) : <Loader/>}
				<MonitoringDashlet/>
			</div>
		)
	}
}
