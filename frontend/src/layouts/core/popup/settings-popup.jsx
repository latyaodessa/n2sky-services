import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../components/core/loader/loader'
import OpenStackMonitoringModal from './../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import OpenStackCreateMetricPopUp from './../../../components/dashboards/openstack/modal/openstack-create-metric-modal'
import LaptopIcon from './../../../../res/img/icons/laptop.svg'
import style from './style.scss'


export default class SettingsPopUp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showCreateOpenstackDashlet: false
		};

	}

	showCloseCreateOpenstackDashletModal() {
		this.setState({
			showCreateOpenstackDashlet: !this.state.showCreateOpenstackDashlet
		})
	}

	getCreateOpenstackDashlet(){
		return <OpenStackCreateMetricPopUp showCloseModal={this.showCloseCreateOpenstackDashletModal.bind(this)}/>;
	}

	getMainMenu() {
		return <ul className="settings-list">
			<li onClick={this.showCloseCreateOpenstackDashletModal.bind(this)}><img src={LaptopIcon}/> <span>Create Openstack Monitoring Dashlet</span></li>
		</ul>
	}

	getContent() {
		return <div>
			{this.getMainMenu()}
			{this.state.showCreateOpenstackDashlet ? this.getCreateOpenstackDashlet() : null}

		</div>
	}


	render() {
		return (<div>

			<OpenStackMonitoringModal showCloseModal={this.props.showCloseModal}
																content={this.getContent()}
																title="Dashboard Settings"/>
		</div>)
	}

}
