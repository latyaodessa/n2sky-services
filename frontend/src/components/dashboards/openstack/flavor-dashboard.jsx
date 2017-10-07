import React from 'react'
import {connect} from 'react-redux'
import {getOpenstackFlavor} from "../../../actions/dashboard/openstack-actions"
import Loader from './../../core/loader/loader'
import FlavorDashlet from './dashlets/flavors-dashlet'


@connect((store) => {
	return {
		flavor: store.flavor.flavor,
		fetched: store.flavor.fetched
	}
})
export default class FlavorDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackFlavor(this.props.id));
	}

	addDashlets(flavors) {
		return flavors.flavors.map(flv => <FlavorDashlet key={flv.id} flavor={flv}/>);
	}


	render() {
		return (
			<div className='list-dashlet pure-u-1-2'>
				<div className="atb-text-wrap">
					<div className="atb-text">
						<h1 className="new-single-title">Flavors</h1>
					</div>
				</div>
				{this.props.fetched ? this.addDashlets(this.props.flavor) : <Loader/>}
			</div>
		)
	}
}
