import React from 'react';
import {connect} from 'react-redux'
import {getOpenStackUserConfigData} from '../../../actions/dashboard/openstack-monitoring-actions'
import Loader from './../../core/loader/loader'
import MonitoringDashlet from './../../dashboards/openstack/dashlets/monitoring-dashlet-new'
import XORIcon from './../../../../res/img/icons/xor.svg'
import XORNetwork from './networks/xor-network'
import NewDescriptionPopup from './common/new-description-popup'


@connect((store) => {
	return {
		// openstackUserConfig: store.openstackUserConfig.config,
		// openstackUserConfigFetched: store.openstackUserConfig.fetched
	}
})
export default class N2SkyDashboard extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			showCreateOpenstackDashlet: false
		};
		// this.props.dispatch(getOpenStackUserConfigData(localStorage.getItem("user"), 'overview'));
	}

	showCloseModal = () => {
		this.setState({
			showCreateOpenstackDashlet: !this.state.showCreateOpenstackDashlet
		})
	};


	getOpenstackMonitoringPanel = () => {
		return <div>
			<img src={XORIcon}/>
		</div>
	};

	getNewDescriptionPoppup = () => {
		return (this.state.showCreateOpenstackDashlet ? <NewDescriptionPopup showCloseModal={this.showCloseModal}/> : null);
	};

	getContent = () => {
		return <div>
			<a onClick={this.showCloseModal} className="button">new description</a>
		</div>
	};


	render() {
		return (
			<div>
				{this.getNewDescriptionPoppup()}
				{this.getContent()}
				{/*{this.getOpenstackMonitoringPanel()}*/}
				{/*<XORNetwork />*/}
			</div>
		)
	}
}

