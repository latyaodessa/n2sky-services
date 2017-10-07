import React from 'react'
import {connect} from 'react-redux'
import {getOpenstackServers} from "../../../actions/dashboard/openstack-actions"
import Loader from './../../core/loader/loader'
import ServerDashlet from './dashlets/server-dashlet'

@connect((store) => {
	return {
		servers: store.openstackServers.servers,
		fetched: store.openstackServers.fetched
	}
})
export default class ServerDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackServers(this.props.id));
	}

	addDashlets(servers) {
		return servers.servers.map(server => <ServerDashlet key={server.id} server={server}/>);
	}


	render() {
		return (
			<div className='list-dashlet pure-u-1-2'>
				<div className="atb-text-wrap">
					<div className="atb-text">
						<h1 className="new-single-title">Servers</h1>
					</div>
				</div>
				{this.props.fetched ? this.addDashlets(this.props.servers) : <Loader/>}
			</div>
		)
	}
}
