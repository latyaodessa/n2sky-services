import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../core/loader/loader'
import AbstractAlertPopUp from './../../../core/popup/abstract-alert-popup'
import OpenStackMonitoringModal from './../../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import {test} from './../../../../actions/n2sky/neural-network-actions'
import TestIcong from './../../../../../res/img/icons/coding.svg'


@connect((store) => {
	return {
		model: store.neuralNetwork.success
	}
})
export default class TestModelPopup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showCreateOpenstackDashlet: false,
			testing_data: null
		};

		console.log(this.props);

		this.handleReqChange = ::this.handleReqChange;
		this.submitForm = ::this.submitForm;
	}


	handleReqChange(event) {
		this.state[event.target.name] = event.target.value;
	}


	showCloseCreateOpenstackDashletModal() {
		this.setState({
			showCreateOpenstackDashlet: !this.state.showCreateOpenstackDashlet
		})
	}


	changeValidation() {
		this.setState({
			violated: !this.state.violated
		});
	}


	submitForm() {
		this.commit()
			.then(r => {
				this.props.dispatch(test(r)).then(() => {
					location.reload();
				});
			}).catch(err => this.setState({violated: true}));

	}

	commit() {
		return new Promise((resolve, reject) => {

			let request = {
				modelId: this.props.modelId,
				testing_data: this.state.testing_data,
				user: localStorage.getItem("user")
			};

			resolve(request);
		})
	}


	getContent = () => {
		return (
			<form className="pure-form modal-content-container">
				<div className="popup-label-content">
					<h1>Model: {this.props.modelName}</h1>
				</div>
				<fieldset className="pure-group">
					<input type="text" name="testing_data" onChange={this.handleReqChange} className="pure-input-1-1 full-width"
								 placeholder="Testing Data"/>
				</fieldset>
				<a onClick={this.submitForm} className="button" role="button">
					<span>Perform Testing</span>
					<div className="icon">
						<img src={TestIcong}/>
					</div>
				</a>

			</form>
		);
	};


	render() {
		return (<div>
			{this.state.violated ?
				<AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)} title="Validation error"
														content="All fields are mandatory!"/> : null}
			<OpenStackMonitoringModal showCloseModal={this.props.showCloseModal}
																content={!this.state.loader ? this.getContent() : <Loader/>}
																title="Perform testing"/>
		</div>)
	}
}
