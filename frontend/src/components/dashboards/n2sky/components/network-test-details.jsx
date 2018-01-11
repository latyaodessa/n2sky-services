import React from 'react';
import {connect} from 'react-redux'
import TestModelPopup from './test-model-popup'
import {getModels} from './../../../../actions/n2sky/vinnsl_models_actions'
import Loader from './../../../core/loader/loader'
import LogoWhite from './../../../../../res/img/logo-white.svg'
import LogoGrey from './../../../../../res/img/logo-grey.svg'
import DownloadIcon from './../../../../../res/img/icons/download.svg'
import TestIcon from './../../../../../res/img/icons/flask_white.svg'
import TrainingChart from './training-chart'

@connect((store) => {
	return {
		modelsByDescId: store.modelsByDescId.models
	}
})
export default class NetworkTestDetails extends React.Component {

	state = {
		showModal: false,
		chartData: []
	};

	constructor(props) {
		super(props);
		this.props.dispatch(getModels({static_filters: {_id: this.props.params.model_id}}, 0, 999))
			.then(() => this.generateChartData(this.props.modelsByDescId[0].logs));

	}

	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	getNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><a>Training results and model testing</a></li>
			</ul>
		</nav>
	};

	getContent = () => {
		return <div className="pure-g">
			{this.props.modelsByDescId[0].rawModel ? this.getRawModel() : null}
			{this.getParamDetails()}
			{this.getMainDetails()}
		</div>
	};

	getMainDetails = () => {
		return <div className="container-panel pure-u-1-3">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>Trained Model Details</h1>
				</div>
				<ul>
					<li>Trained By: {this.props.modelsByDescId[0].trainedBy}</li>
					<li>Trained On: {this.props.modelsByDescId[0].trainedOn}</li>
					<li>Tests Count: {this.props.modelsByDescId[0].tests.length}</li>
					<li>Is Copy: {this.props.modelsByDescId[0].isCopy ? "Yes" : "No"}</li>
					<li>Is training Finished: {this.props.modelsByDescId[0].isTrainingDone ? "Trained" : "Processing"}</li>
				</ul>
			</div>
		</div>
	};

	getParamDetails = () => {
		return <div className="container-panel pure-u-1-3">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>Training parameters</h1>
				</div>
				<ul>
					{this.props.modelsByDescId[0].parameters.input.map(p => {
						return <li key={p.parameter}>{p.parameter} : {p.value}</li>
					})}
				</ul>
			</div>
		</div>
	};


	getRawModel = () => {
		return <div className="container-panel pure-u-1-3">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>RAW MODEL in JSON Format</h1>
				</div>
				<pre className="raw-model">
					{JSON.stringify(this.props.modelsByDescId[0].rawModel, null, 2)}
				</pre>
				<a onClick={this.download.bind(this)} className="button" role="button">
					<span>Download raw model </span>
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
		return this.props.modelsByDescId[0].tests.map(m => {
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
	};

	generateChartData = (logs) => {
		new Promise((res, rej) => {
			let data = [];
			logs.map(d => {
				let obj = {
					x: parseInt(d.epoch),
					y: parseFloat(d.loss)
				};
				data.push(obj);
				res(data)
			})
		}).then(data => this.setState({chartData: data}));

	};


	render() {
		return (
			<div>

				{this.props.modelsByDescId ? <div>
						{this.getNavbar()}
						{this.getContent()}
						{this.state.chartData.length > 0 ? <TrainingChart data={this.state.chartData}/> : <Loader/>}
						{this.getTestsNavbar()}
						{this.getTestsTable()}
					</div>
					: <Loader/>}
				{this.state.showModal ?
					<TestModelPopup modelName="Test the model" modelId={this.props.modelsByDescId[0]._id}/> : null}
			</div>
		)
	}
}

