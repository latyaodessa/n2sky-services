import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loader from './../../../core/loader/loader'
import NoOwnNNComponent from './no-own-nn-component'
import NavigationPage from '../core/navigation-page'
import LogoWhite from './../../../../../res/img/logo-white.svg'
import LogoGrey from './../../../../../res/img/logo-grey.svg'
import Enter from './../../../../../res/img/icons/right-arrow.png'
import LockedIcon from './../../../../../res/img/icons/locked.svg'
import UnlockedIcon from './../../../../../res/img/icons/unlocked.svg'
import StarColoredIcon from './../../../../../res/img/icons/star_color.svg'
import StartWhiteIcnon from './../../../../../res/img/icons/star_white.svg'


import {getAvailableDescriptions} from './../../../../actions/n2sky/neural-network-actions'

const offsetSize = 9;

@connect((store) => {
	return {
		descriptions: store.getDescriptionsReducer.descriptions,
		done: store.getDescriptionsReducer.done,
	}
})
export default class AvailableNetworksOverview extends React.Component {

	constructor(props) {
		super(props);
		this.geDescriptonWithOffset = this.geDescriptonWithOffset.bind(this);

	}

	componentDidMount() {
		this.geDescriptonWithOffset(0, offsetSize);
	}

	geDescriptonWithOffset(from) {
		this.props.dispatch(getAvailableDescriptions(from, offsetSize));
	}


	getDescription = () => {
		return this.props.descriptions.map(d => {
			return <div key={d._id} className="container-panel pure-u-1-3">
				<div className="container-nn">
					<div className="container-header-panel">
						<img className="header-panel-icon" src={StartWhiteIcnon}/>
						<img className="header-panel-icon" src={d.isPublic ? UnlockedIcon : LockedIcon}/>
						<h1>{d.name}</h1>
						{this.getRunningStatus(d.isRunning)}
					</div>
					<ul>
						<li>Owner: {d.createdBy}</li>
						<li>Created On: {d.createdOn}</li>
						<li>Domain: {d.domain}</li>
						<li>Input Dimentions: {d.inputDimensions}</li>
						<li>Input Type: {d.inputType}</li>
					</ul>
					<div>
						<Link to={"/n2sky/network/" + d._id} className="button" role="button">
							<span>Details and actions</span>
							<div className="icon">
								<img src={Enter}/>
							</div>
						</Link>
					</div>
				</div>
			</div>
		})
	};

	getRunningStatus = (isRunning) => {
		if (isRunning) {
			return <div className="is-running-header">

				<h1>Running</h1>
				<img id="spin" src={LogoWhite}/>
			</div>
		} else {
			return <div className="is-running-header">
				<h1>Not Running</h1>
				<img src={LogoGrey}/>
			</div>
		}
	};

	getNoOwnNN = () => {
		return <NoOwnNNComponent/>
	};


	render() {
		console.log(this.props)
		return (
			<div>
				<div className="pure-g">
					{this.props.done ? this.getDescription() : <Loader/>}
				</div>
				{this.props.done && this.props.descriptions.length === 0 ? this.getNoOwnNN() : null}
				<NavigationPage method={this.geDescriptonWithOffset} offsetSize={offsetSize}/>
			</div>
		)
	}
}

