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
const WAIT_INTERVAL = 1000;

@connect((store) => {
	return {
		descriptions: store.getDescriptionsReducer.descriptions,
		done: store.getDescriptionsReducer.done,
		savedDescriptionsByUser: store.savedDescriptionsByUser
	}
})
export default class AvailableNetworksOverview extends React.Component {

	state = {
		name: null,
		domain: null,
		inputDimensions: null,
		inputType: null
	};

	constructor(props) {
		super(props);
		this.geDescriptonWithOffset = this.geDescriptonWithOffset.bind(this);
		this.handleChange = ::this.handleChange;
	}

	componentDidMount() {
		this.geDescriptonWithOffset(0, offsetSize);
	}

	geDescriptonWithOffset(from) {
		let user = localStorage.getItem("user");
		this.props.dispatch(getCopiedDescriptions(user)).then(() => {

			new Promise((res, rej) => {

				let reqParams =  {};
						reqParams.static_filters = {isRunning: true, isPublic: true, createdBy: {$ne: user}};
						reqParams.filters = this.state;

				res(reqParams);
			}).then(reqParams => {
				this.props.dispatch(getDescriptions(reqParams, from, offsetSize)).then(() => {
					console.log(this.props);
				});
			});

		});
	}

	getNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Available Neural Networks</span></li>
			</ul>
		</nav>
	};

	handleChange(event) {
		clearTimeout(this.timer);

		this.setState({[event.target.name]: event.target.value});

		this.timer = setTimeout(::this.geDescriptonWithOffset(0), WAIT_INTERVAL);
	}

	handleClick() {
		clearTimeout(this.timer);

		let isRunning = !this.state.isRunning;

		this.setState({isRunning: isRunning});

		if (!isRunning) {
			this.setState({isCloudify: null});
		}
		// this.timer = setTimeout(::this.getModelsByDescId, WAIT_INTERVAL);

	}

	handleRadio(isCloudify) {
		clearTimeout(this.timer);
		this.setState({isCloudify: isCloudify});
		// this.timer = setTimeout(::this.getModelsByDescId, WAIT_INTERVAL);

	}

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

	getTableFilter = () => {
		return <div className="table-filter">
			<form className="pure-form">
				<fieldset>
					<input onChange={this.handleChange} name="name" type="text" placeholder="Name"/>
					<input onChange={this.handleChange} name="domain" type="text" placeholder="Domain"/>
					<input onChange={this.handleChange} name="inputDimensions" type="text" placeholder="Input Dimensions"/>
					<input onChange={this.handleChange} name="inputType" type="text" placeholder="Input Type"/>
				</fieldset>
			</form>
		</div>
	};

	render() {
		return (
			<div>
				{this.getNavbar()}
				{this.getTableFilter()}
				<div className="pure-g">
					{this.props.done ? this.getDescription() : <Loader/>}
				</div>
				{this.props.done && this.props.descriptions.length === 0 ? this.getNoOwnNN() : null}
				<NavigationPage chainButtonVisible={false} method={this.geDescriptonWithOffset} offsetSize={offsetSize}/>
			</div>
		)
	}
}

