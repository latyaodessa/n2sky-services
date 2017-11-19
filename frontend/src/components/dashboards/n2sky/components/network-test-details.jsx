import React from 'react';
import {connect} from 'react-redux'
import TestModelPopup from './test-model-popup'
import {getDescriptionById, getModelsById} from '../../../../actions/n2sky/neural-network-actions'
import Loader from './../../../core/loader/loader'
import LogoWhite from './../../../../../res/img/logo-white.svg'
import LogoGrey from './../../../../../res/img/logo-grey.svg'
import DownloadIcon from './../../../../../res/img/icons/download.svg'
import TestIcon from './../../../../../res/img/icons/flask_white.svg'


@connect((store) => {
	return {
		descriptionById: store.descriptionById.description,
		model: store.modelById.model
	}
})
export default class NetworkTestDetails extends React.Component {

	state = {
		showModal: false
	};

	constructor(props) {
		super(props);
		this.props.dispatch(getDescriptionById(this.props.params.id));
		this.props.dispatch(getModelsById(this.props.params.model_id));

		console.log(this.props.params.id);
		console.log(this.props.params.model_id);

	}

	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	getNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><a>Neural Network {this.props.descriptionById.name}</a></li>
			</ul>
		</nav>
	};

	getContent = () => {
		return <div className="pure-g">
			{this.props.model ? this.getRawModel() : <Loader/>}
			{this.props.model ? this.getParamDetails() : <Loader/>}
			{this.getMainDetails()}
		</div>
	};

	getMainDetails = () => {
		return <div className="container-panel pure-u-1-3">
			<div className="container-nn">
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
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>Model: {this.props.model.name}</h1>
				</div>
				<ul>
					<li><span>Trained By: </span> {this.props.model.trainedBy}</li>
					<li><span>Location: </span> {this.props.model.endpoint}</li>
					<li><span>Trained on: </span> {this.props.model.trainedOn}</li>
					<li/>
					<li/>
					<li><span>Parameters:</span></li>
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

	getRawModel = () => {
		return <div className="container-panel pure-u-1-3">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>Model Parameters / Default Values</h1>
				</div>
				<pre className="raw-model">
					{JSON.stringify(this.props.model.model, null, 2)}
				</pre>
				{console.log(this.props)}
				<a onClick={this.download.bind(this)} className="button" role="button">
					<span>Download JSON file</span>
					<div className="icon">
						<img src={DownloadIcon}/>
					</div>
				</a>
			</div>
		</div>
	};

	download() {
		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.props.model.model, null, 2)));
		element.setAttribute('download', this.props.model.name + ".txt");

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	getTestsNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Testing results</span></li>
				<li className="right-float">
					<div className="standard-nav-item">
					<span onClick={this.showCloseModal.bind(this)} className="button" role="button">
						<span>Test the model</span>
						<div className="icon">
							<img src={TestIcon}/>
						</div>
					</span>
					</div>
				</li>
			</ul>
		</nav>
	};

	getRow = () => {
		return this.props.model.tests.map(m => {
			return <tr key={m._id} className="pure-table">
				<td>{m.user}</td>
				<td>{m.testing_data}</td>
				<td>{m.result}</td>
				<td>{m.createdOn}</td>
			</tr>
		})
	};

	getTestsTable = () => {
		return <table className="full-width pure-table">
			<thead>
			<tr>
				<th>User</th>
				<th>Testing Data</th>
				<th>Result</th>
				<th>Testing Date</th>
			</tr>
			</thead>

			<tbody>
			{this.getRow()}
			</tbody>
		</table>
	}


	render() {
		return (
			<div>
				{console.log(this.props.model)}
				{this.props.descriptionById ? this.getNavbar() : null}
				{this.props.descriptionById ? this.getContent() : <Loader/>}
				{this.getTestsNavbar()}
				{this.state.showModal ? <TestModelPopup modelName={this.props.model.name} modelId={this.props.params.model_id}
												showCloseModal={this.showCloseModal.bind(this)}/> : null}
				{this.props.model ? this.getTestsTable() : null}
			</div>
		)
	}
}

