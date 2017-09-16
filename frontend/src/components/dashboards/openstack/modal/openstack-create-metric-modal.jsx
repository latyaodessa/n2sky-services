import React from 'react'
import {connect} from 'react-redux';
import OpenStackMonitoringModal from './../../core/modal/openstack-new-dashlet-modal'
import {
	getOpenStackMonitoringConfig,
	addOpenStackDashLet
} from '../../../../actions/dashboard/openstack-monitoring-actions'
import AddIcon from './../../../../../res/img/icons/add.png'
import AbstractAlertPopUp from './../../../core/popup/abstract-alert-popup'


@connect((store) => {
	return {
		config: store.openstackMonitoringConfig.config,
		fetched: store.openstackMonitoringConfig.fetched
	}
})
export default class OpenStackCreateMetricPopUp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			metric: '',
			delay: 0,
			delaytype: '',
			step: '',
			steptype: '',
			violated: false
		};

		this.handleChange = ::this.handleChange;
		this.handleSubmitNewOpenStackDashlet = ::this.handleSubmitNewOpenStackDashlet;

		this.props.dispatch(getOpenStackMonitoringConfig());
	}


	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	changeValidation() {
		this.setState({
			violated: !this.state.violated
		});
	}

	validate() {
		return new Promise((resolve, reject) => {
			for (let key of Object.keys(this.state)) {
				if (this.state[key] === 0 || this.state[key] === '') {
					this.changeValidation();
					reject('Error');
					return;
				}
			}
			resolve(new Date());
		})
	}


	handleSubmitNewOpenStackDashlet() {
		this.validate()
			.then(res => this.setState({
				step: this.state.step + this.state.steptype
			}))
			.then(res => this.props.dispatch(addOpenStackDashLet('fedorenko', this.state)))
			.catch(err => console.log('There was an error:' + err));
	}


	getTimeCombobox(name) {
		return (<select onChange={this.handleChange} name={name} className="combobox half-width">
			<option disabled selected value> -- select an option --</option>
			<option>seconds</option>
			<option>minutes</option>
			<option>hours</option>
			<option>days</option>
			<option>weeks</option>
		</select>);
	}

	getTimeComboboxShort(name) {
		return (<select onChange={this.handleChange} name={name} className="combobox half-width">
			<option disabled selected value> -- select an option --</option>
			<option value='s'>seconds</option>
			<option value='m'>minutes</option>
			<option value='h'>hours</option>
			<option value='d'>days</option>
			<option value='w'>weeks</option>
		</select>);
	}

	getConfigCombobox() {
		return (<select name='metric' onChange={this.handleChange} className="combobox full-width">
			<option disabled selected value> -- select an option --</option>
			{this.props.config.map(c => <option key={c}>{c}</option>)}
		</select>);
	}

	getContent() {
		return (<form className="pure-form">
			<fieldset className="pure-group">
				<label>Metric</label>
				{this.props.fetched ? this.getConfigCombobox() : null}
				<input name='delay' onChange={this.handleChange} type="number" className="pure-input-1-1 half-width"
							 placeholder="Delay"/>
				{this.getTimeCombobox('delaytype')}
				<input name="step" onChange={this.handleChange} type="number" className="pure-input-1-1 half-width"
							 placeholder="Step"/>
				{this.getTimeComboboxShort('steptype')}
			</fieldset>
			<a onClick={this.handleSubmitNewOpenStackDashlet} className="button" role="button">
				<span>Create</span>
				<div className="icon">
					<img src={AddIcon}/>
				</div>
			</a>
		</form>);
	}


	render() {
		return (<div>
			{this.state.violated ?
				<AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)} title="Validation error"
														content="All fields are mandatory!"/> : null}
			<OpenStackMonitoringModal showCloseModal={this.props.showCloseModal} content={this.getContent()}
																title="Create new Dashlet"/>
		</div>)
	}
}


