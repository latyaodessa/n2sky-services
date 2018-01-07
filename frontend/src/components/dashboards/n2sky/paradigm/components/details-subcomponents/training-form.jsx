import React from 'react';
import {connect} from 'react-redux'
import {deleteNNFromProject} from '../../../../../../actions/n2sky/project-actions'
import TrainIcon from './../../../../../../../res/img/icons/knowledge-transfer.svg'
import VinnslIcon from './../../../../../../../res/img/icons/settings-vinnsl.svg'
import DeleteIcon from './../../../../../../../res/img/icons/delete-button-red.svg'
import {browserHistory} from 'react-router'
import DetailsModelsTable from './../../../components/details-subcomponents/details-models-tabel'

@connect((store) => {
	return {}
})
export default class TrainingForm extends React.Component {


	constructor(props) {
		super(props);

		let initObj = {};
		this.props.descriptionById.parameters.input.map(p => {
			initObj[p.parameter] = p.defaultValue;
		});

		this.state = {inputParams: initObj, isTrain: false};

		this.handleChange = ::this.handleChange;

	}


	generateFreeInput = (name, defaultValue) => {
		return <div key={name} className="paradigm-fixed-labels"><h1>{name}</h1><input type="text" name={name}
																																									 onChange={this.handleChange}
																																									 className="pure-input-1-1 full-width"
																																									 placeholder={name}
																																									 defaultValue={defaultValue}/>
		</div>
	};
	generateCombobox = (name, possibleValues) => {
		return (
			<div key={name} className="paradigm-fixed-labels"><h1>{name}</h1><select name={name} onChange={this.handleChange}
																																							 className="combobox full-width">
				<option disabled selected value> -- select {name} --</option>
				{possibleValues.map(v => {
					return <option key={v} name={v} value={v}>{v}</option>
				})
				}
			</select></div>);
	};

	getForm = () => {
		return <div>
			<div className="paradigm-fixed-labels">
				<h1>Input Parameters</h1>
			</div>
			<form className="pure-form modal-content-container">
				<fieldset className="pure-group">
					{this.props.descriptionById.parameters.input.map(p => {
						if (!p.possibleValues || p.possibleValues.length === 0) {
							return this.generateFreeInput(p.parameter, p.defaultValue)
						} else {
							return this.generateCombobox(p.parameter, p.possibleValues)
						}
					})}
				</fieldset>
			</form>
		</div>
	};

	getUploadFileForm = () => {
		return <div>
			<div className="paradigm-fixed-labels">
				<h1>Training Data</h1>
				<h1>Description: {this.props.descriptionById.data.description}</h1>
				<h1>File: {this.props.descriptionById.data.fileDescription}</h1>
				<h1>Table: {this.props.descriptionById.data.tableDescription}</h1>
			</div>
			<form className="pure-form modal-content-container">
				<fieldset className="pure-group">
					<input type="file" name="fileToUpload" className="pure-input-1-1 full-width"/>
				</fieldset>

				<a onClick={this.submitForm} className="button" role="button">
					<span>Train the neural network</span>
					<div className="icon">
						<img src={TrainIcon}/>
					</div>
				</a>

			</form>
		</div>
	};

	handleChange(event) {

		console.log(event.target.name);

		this.setState(prevState => ({
			...prevState,
			inputParams: {
				...prevState.inputParams,
				[event.target.name]: event.target.value
			}
		}));

	}

	submitForm = () => {
		console.log(JSON.stringify(this.state));
	};

	getTrainForm = () => {
		return <div className="pure-g">
			<div className="pure-u-1-2 table-details">{this.getForm()}</div>
			<div className="pure-u-1-2 table-details">{this.getUploadFileForm()}</div>
		</div>
	};

	getInfoForm = () => {
		return <div className="pure-g">
			<div className="pure-u-1-3 container-panel">{this.getActionsDetails()}</div>
			<div className="pure-u-1-3 container-panel"/>
			<div className="pure-u-1-3 container-panel">{this.getSettingsDetails()}</div>

		</div>
	};

	getActionsDetails = () => {
		return <div className="container-nn">
			<div className="container-header-panel">
				<h1>Actions</h1>
			</div>
			<ul>
				<li className="link" onClick={() => this.setState({isTrain: !this.state.isTrain})}>
					<img src={TrainIcon}/> {this.state.isTrain ? 'Hide' : 'Show'} training form
				</li>
				<li className="link" onClick={this.downloadVinnsl.bind(this, 'xml')}>
					<img src={VinnslIcon}/> Download ViNNSL XML format
				</li>
				<li className="link" onClick={this.downloadVinnsl.bind(this, 'json')}>
					<img src={VinnslIcon}/> Download ViNNSL JSON format
				</li>
			</ul>
		</div>
	};

	getSettingsDetails = () => {
		return <div className="container-nn">
			<div className="container-header-panel">
				<h1>Administration</h1>
			</div>
			<ul>
				<li className="link" onClick={this.deleteNeuralNetwork.bind(this)}>
					<img src={DeleteIcon}/> Delete Neural Network
				</li>
			</ul>
		</div>
	};

	deleteNeuralNetwork = () => {
			this.props.dispatch(deleteNNFromProject(this.props.descriptionById._id)).then(() => {
				browserHistory.push('/n2sky');
			});
	};

	downloadVinnsl = (format) => {

		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.props.descriptionById, null, '\t')));
		element.setAttribute('download', this.props.descriptionById.metadata.name + '.' + format);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);

		// console.log(JSON.stringify(JSON.parse(this.props.descriptionById),null,2));
	};

	getNavbarInstances = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Trained Models</span></li>
			</ul>
		</nav>
	};


	render() {
		return (
			<div>
				{this.getInfoForm()}
				{this.state.isTrain ? this.getTrainForm() : null}
				{this.getNavbarInstances()}
				{this.props.descriptionById ? <DetailsModelsTable descriptionById={this.props.descriptionById} descripIds={new Array(this.props.descriptionById._id)}/> : <Loader/>}
			</div>
		)
	}
}

