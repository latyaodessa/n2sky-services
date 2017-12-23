import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import ArrowUpIcon from './../../../../../../res/img/icons/up-arrow-grey.svg'
import RightArrowIcon from './../../../../../../res/img/icons/right-arrow-white.svg'
import AbstractAlertPopUp from './../../../../core/popup/abstract-alert-popup'
import {label_nn_structure} from './../add-nn-from-paradigm'

import Loader from './../../../../core/loader/loader'
import style from './style.scss'

const WAIT_INTERVAL = 1000;

@connect((store) => {
	return {}
})
export default class NNDescription extends React.Component {

	state = {
		paradigm: null,
		name: null,
		description: null,
		propagationType: null,
		learningType: null,
		applicationField: null,
		problemType: null,
		violated: false,
		violatedText: null
	};


	constructor(props) {
		super(props);

		console.log(this.props.schema)
		this.handleChange = ::this.handleChange;
	}

	componentWillMount() {
		this.timer = null;
	}


	handleChange(event) {
		// console.log(event);
		clearTimeout(this.timer);

		this.setState({[event.target.name]: event.target.value});

		// this.timer = setTimeout(::this.getDockerHubUserProjects, WAIT_INTERVAL);
	}

	getParadigmsCombobox() {
		return (<select name='paradigm' onChange={this.handleChange} className="combobox full-width">
			<option disabled selected value> -- select paradigm --</option>
			<option name="backpropagation" value="backpropagation">backpropagation</option>
		</select>);
	}

	getPropagationTypeCombobox() {
		return (<select name='propagationType' onChange={this.handleChange} className="combobox full-width">
			<option disabled selected value> -- select propagation type --</option>
			{this.props.schema.peoblemDomain.propagationType.possibleValues.map(pt => {
				return <option key={pt} name={pt} value={pt}>{pt}</option>
			})
			}
		</select>);
	}

	getLearningTypeCombobox() {
		return (<select name='learningType' onChange={this.handleChange} className="combobox full-width">
			<option disabled selected value> -- select learning type --</option>
			{this.props.schema.peoblemDomain.propagationType.learningType.possibleValues.map(pt => {
				return <option key={pt} name={pt} value={pt}>{pt}</option>
			})
			}
		</select>);
	}

	getApplicationFieldCombobox() {
		return (<select name='applicationField' onChange={this.handleChange} className="combobox full-width">
			<option disabled selected value> -- select application field --</option>
			{this.props.schema.peoblemDomain.applicationField.possibleValues.map(pt => {
				return <option key={pt} name={pt} value={pt}>{pt}</option>
			})
			}
		</select>);
	}

	getProblemTypeCombobox() {
		return (<select name='problemType' onChange={this.handleChange} className="combobox full-width">
			<option disabled selected value> -- select problem type --</option>
			{this.props.schema.peoblemDomain.problemType.possibleValues.map(pt => {
				return <option key={pt} name={pt} value={pt}>{pt}</option>
			})
			}    </select>);
	}

	getForm = () => {
		return <div>
			<div className="paradigm-fixed-labels">
				<h1>Network Type: {this.props.schema.peoblemDomain.netoworkType}</h1>
				<h1>Creator: {localStorage.getItem("user")}</h1>
			</div>
			<form className="pure-form modal-content-container">
				<fieldset className="pure-group">
					<input type="text" name='name' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Name"/>
					<input type="text" name='description' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Short description"/>
					{this.getPropagationTypeCombobox()}
					{this.getLearningTypeCombobox()}
					{this.getApplicationFieldCombobox()}
					{this.getProblemTypeCombobox()}
				</fieldset>

				<a onClick={this.submitForm} className="button" role="button">
					<span>Next</span>
					<div className="icon">
						<img src={RightArrowIcon}/>
					</div>
				</a>

			</form>
		</div>
	};

	submitForm = () => {
		this.commit()
			.then(res => this.props.commitCreatorMetadataProblemDomain(res))
			.then(res => this.props.changeActiveTab(label_nn_structure))
			.catch(err => this.changeValidation(err))

	};

	commit = () => {
		return new Promise((res, rej) => {

			let nNDescription = {
				name: this.state.name,
				description: this.state.description,
				propagationType: this.state.propagationType,
				learningType: this.state.learningType,
				applicationField: this.state.applicationField,
				problemType: this.state.problemType

			};

			Object.entries(nNDescription).forEach(([key, value]) => {
				if (!value) {
					rej("Value of " + key + " can not be empty")
				}
			});

			let obj = {};
			// metadata
			obj.metadata = this.props.schema.metadata;
			obj.metadata.name = nNDescription.name;
			obj.metadata.description = nNDescription.description;
			// creator
			obj.creator = this.props.schema.creator;
			obj.creator.name = localStorage.getItem("user");
			//peoblemDomain
			obj.peoblemDomain = this.props.schema.peoblemDomain;
			obj.peoblemDomain.propagationType.value = nNDescription.propagationType;
			obj.peoblemDomain.propagationType.learningType.value = nNDescription.learningType;
			obj.peoblemDomain.applicationField.value = nNDescription.applicationField;
			obj.peoblemDomain.problemType.value = nNDescription.problemType;

			res(obj)
		});
	};

	getNoSelection = () => {
		return <div className="paradigm-back-title">
			<img src={ArrowUpIcon}/>
			<h1>Please, select existing paradigm first</h1>
		</div>
	};


	changeValidation(text = null) {
		this.setState({
			violated: !this.state.violated,
			violatedText: text
		});
	}


	render() {
		return (
			<div>
				<div className="container-paradigm-wrapper">
					<div className="container-paradigm">
						{this.getParadigmsCombobox()}
						{this.state.paradigm ? this.getForm() : this.getNoSelection()}
					</div>
				</div>
				{this.state.violated ? <AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)}
																									 title={this.state.violatedText}
																									 content="All fields are mandatory!"/> : null}
			</div>
		)
	}
}

