import React from 'react';
import {connect} from 'react-redux'
import {getOpenstackServerInfo, getOpenstackServerById} from "../../../../actions/dashboard/openstack-actions"
import Loader from './../../../core/loader/loader'


@connect((store) => {
	return {
		details: store.openstackServerDetails,
		addresses: store.openstackServerDetails.addresses,
		instanceActions : store.openstackServerDetails.instanceActions,
		interfaceAttachments : store.openstackServerDetails.interfaceAttachments,
		security_groups : store.openstackServerDetails.security_groups,
		diagnostics : store.openstackServerDetails["tap215ff2ff-6f_rx_drop"],
		server : store.serverDetails.server
	}
})
export default class ServerDetailsDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackServerById(props.params.projectid, props.params.serverid));
		this.props.dispatch(getOpenstackServerInfo("ips",props.params.projectid, props.params.serverid));
		this.props.dispatch(getOpenstackServerInfo("diagnostics",props.params.projectid, props.params.serverid));
		this.props.dispatch(getOpenstackServerInfo("os-security-groups",props.params.projectid, props.params.serverid));
		this.props.dispatch(getOpenstackServerInfo("os-instance-actions",props.params.projectid, props.params.serverid));
		this.props.dispatch(getOpenstackServerInfo("os-interface",props.params.projectid, props.params.serverid));

	}

	render() {
		return (
			<div>
				details
				{		console.log(this.props)}
			</div>
		)
	}

}
