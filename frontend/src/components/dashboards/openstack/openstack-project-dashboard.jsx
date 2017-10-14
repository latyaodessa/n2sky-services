import React from 'react';
import {connect} from 'react-redux';
import {getOpenstackProjectById} from "../../../actions/dashboard/openstack-actions"
import Loader from './../../core/loader/loader'
import ComputeDashboard from './boards/compute-dashboard'
import style from './style.scss'

@connect((store) => {
	return {
		project: store.openstackProjectByIdReducer.project,
		fetched: store.openstackProjectByIdReducer.fetched
	}
})
export default class OpenStackProjectDashboard extends React.Component {
	state = {
		activeTab: 'nova'
	};

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackProjectById(this.props.params.id));
	}

	componentDidMount() {
		this.setActiveTab("nova");
	}


	getActiveTab() {
		if (this.state.activeTab === 'nova') {
			return <ComputeDashboard id={this.props.params.id}/>
		}
	}

	setActiveTab(tab) {
		this.setState({
			activeTab: tab
		})
	}

	getTabs() {

		let tabs = ["nova", "neutron", "images", "vitrage"];

		return tabs.map(ct => <li onClick={() => this.setActiveTab(ct)} key={ct}><a>{ct}</a>
		</li>);
	}


	render() {
		return (
			<div>
				 <nav className="topbar">
					<ul>
						{this.getTabs()}
					</ul>
				</nav>
				{this.state.activeTab ? this.getActiveTab() : <Loader/>}
			</div>
		)
	}
}
