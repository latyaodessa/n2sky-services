import React from 'react';
import {connect} from 'react-redux'
import {
	updateDescription,
	stopInstanceDescription
} from '../../../../../../actions/n2sky/neural-network-actions'
import StopIcon from './../../../../../../../res/img/icons/stop.svg'
import RunIcon from './../../../../../../../res/img/icons/rocket.svg'
import PrivateIcon from './../../../../../../../res/img/icons/locked.svg'
import PublicIcon from './../../../../../../../res/img/icons/unlocked.svg'
import RunInstancePopup from './run-instance-popup'

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

		this.state = initObj;

		console.log(initObj);
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

				{/*<a onClick={this.submitForm} className="button" role="button">*/}
				{/*<span>Next</span>*/}
				{/*<div className="icon">*/}
				{/*/!*<img src={RightArrowIcon}/>*!/*/}
				{/*</div>*/}
				{/*</a>*/}

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
						{/*<img src={RightArrowIcon}/>*/}
					</div>
				</a>

			</form>
		</div>
	};

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	submitForm = () => {
		console.log(JSON.stringify(this.state));
	};

	render() {
		return (
			<div>
				<div className="pure-g">
					<div className="pure-u-1-2 table-details">{this.getForm()}</div>
					<div className="pure-u-1-2 table-details">{this.getUploadFileForm()}</div>
				</div>
			</div>
		)
	}
}

