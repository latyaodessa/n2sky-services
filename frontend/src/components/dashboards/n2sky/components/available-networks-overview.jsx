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


import {
	getDescriptions,
	copyModelDescription,
	getCopiedDescriptions,
	removeCopyModelDescription
} from './../../../../actions/n2sky/neural-network-actions'

const offsetSize = 9;

@connect((store) => {
	return {
		descriptions: store.getDescriptionsReducer.descriptions,
		done: store.getDescriptionsReducer.done,
		savedDescriptionsByUser: store.savedDescriptionsByUser
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
		let user = localStorage.getItem("user");
		this.props.dispatch(getCopiedDescriptions(user)).then(() => {
			let reqParams = {isRunning: true, isPublic: true, createdBy: {$ne: user}};

			this.props.dispatch(getDescriptions(reqParams, from, offsetSize));
		});
	}

	getNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Available Neural Networks</span></li>
				{/*<li className="right-float">*/}
				{/*<div className="standard-nav-item">*/}
				{/*<span onClick={this.showCloseModal.bind(this)} className="button" role="button">*/}
				{/*<span>Train a model</span>*/}
				{/*<div className="icon">*/}
				{/*<img src={TrainIcon}/>*/}
				{/*</div>*/}
				{/*</span>*/}
				{/*</div>*/}
				{/*</li>*/}
			</ul>
		</nav>
	};

	getSaveButton = (d) => {
		console.log(d._id);
		console.log(this.props);
		return this.props.savedDescriptionsByUser.saved && this.props.savedDescriptionsByUser.saved.descriptionsId.includes(d._id) ?
			<img onClick={this.removeCopyToUser.bind(this, d._id)} className="header-panel-icon" src={StarColoredIcon}/>
			:
			<img onClick={this.copyToUser.bind(this, d)} className="header-panel-icon" src={StartWhiteIcnon}/>
	};

	getDescription = () => {
		return this.props.descriptions.map(d => {
			return <div key={d._id} className="container-panel pure-u-1-3">
				<div className="container-nn">
					<div className="container-header-panel">

						{this.getSaveButton(d)}

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

	copyToUser(desc) {
		desc.user = localStorage.getItem("user");
		this.props.dispatch(copyModelDescription(desc)).then(() => {
			location.reload();
		});
	}

	removeCopyToUser(id) {
		this.props.dispatch(removeCopyModelDescription(localStorage.getItem("user"), id)).then(() => {
			location.reload();
		});
	}

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
		return (
			<div>
				{this.getNavbar()}
				<div className="pure-g">
					{this.props.done ? this.getDescription() : <Loader/>}
				</div>
				{this.props.done && this.props.descriptions.length === 0 ? this.getNoOwnNN() : null}
				<NavigationPage method={this.geDescriptonWithOffset} offsetSize={offsetSize}/>
			</div>
		)
	}
}

