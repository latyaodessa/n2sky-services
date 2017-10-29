import React from 'react';
import {connect} from 'react-redux'
import {train, getDescriptionById} from '../../../../actions/n2sky/neural-network-actions'
import Loader from './../../../core/loader/loader'
import LogoWhite from './../../../../../res/img/logo-white.svg'
import LogoGrey from './../../../../../res/img/logo-grey.svg'


@connect((store) => {
	return {
		descriptionById: store.descriptionById.description
	}
})
export default class NetworkDetails extends React.Component {

	state = {};

	constructor(props) {
		super(props);
		this.props.dispatch(getDescriptionById(this.props.params.id));
	}

	getMainDetails = () => {
		return <div className="container-panel pure-u-1-3">
			<div>
				<div className="container-header-panel">
					<h1>{this.props.descriptionById.name}</h1>
					{this.getRunningStatus(this.props.descriptionById.isRunning)}
				</div>
				<ul>
					<li>Owner: {this.props.descriptionById.createdBy}</li>
					<li>Created On: {this.props.descriptionById.createdOn}</li>
					<li>Domain: {this.props.descriptionById.domain}</li>
					<li>Input Dimentions: {this.props.descriptionById.inputDimensions}</li>
					<li>Input Type: {this.props.descriptionById.inputType}</li>
				</ul>
			</div>
		</div>
	};

	getParamDetails = () => {
		return <div className="container-panel pure-u-1-3">
			<div>
				<div className="container-header-panel">
					<h1>Model Parameters / Default Values</h1>
				</div>
				<ul>
					{this.props.descriptionById.modelParameters.map(p => {
							return <li key={p._id}>{p.parameter} : {p.defaultValue}</li>
					})}
				</ul>
			</div>
		</div>
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


	getDockerDetails = () => {
		return <div className="container-panel pure-u-1-3">
			<div>
				<div className="container-header-panel">
					<h1>Docker Image</h1>
				</div>
				<ul>
					<li> Name: {this.props.descriptionById.docker.name}</li>
					<li> User: {this.props.descriptionById.docker.user}</li>
					<li> Namespace: {this.props.descriptionById.docker.namespace}</li>
					<li> Description: {this.props.descriptionById.docker.description}</li>
					<li> Last Updated: {this.props.descriptionById.docker.last_updated}</li>
				</ul>
			</div>
		</div>
	};

	getContent = () => {
		console.log(this.props.descriptionById);
		return <div className="pure-g">
			{this.getMainDetails()}
			{this.getParamDetails()}
			{this.getDockerDetails()}
		</div>
	};

	getNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><a>Neural Network {this.props.descriptionById.name}</a></li>
			</ul>
		</nav>
	}

	getNavbarInstances = () => {
		return <nav className="topbar">
			<ul>
				<li><a>Trained Models</a></li>
			</ul>
		</nav>
	}

	render() {
		return (
			<div>
				{this.props.descriptionById ? this.getNavbar() : null}
				{this.props.descriptionById ? this.getContent() : <Loader/>}
				{this.getNavbarInstances()}
			</div>
		)
	}
}

