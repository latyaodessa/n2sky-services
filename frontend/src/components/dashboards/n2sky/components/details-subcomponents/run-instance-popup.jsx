import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../../core/loader/loader'
import AbstractAlertPopUp from './../../../../core/popup/abstract-alert-popup'
import OpenStackMonitoringModal from './../../../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import {getDockerGubUserProjects} from './../../../../../actions/n2sky/dockerhub-actions'
import {saveModelDescription} from './../../../../../actions/n2sky/neural-network-actions'
import AddIcon from './../../../../../../res/img/icons/add.png'



@connect((store) => {
	return {
	}
})
export default class RunInstancePopup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loader: false,
			violated: false
		};

		this.handleChange = ::this.handleChange;
		this.submitForm = ::this.submitForm;
	}


	componentWillMount() {
		this.timer = null;
	}


	handleChange(event) {
		clearTimeout(this.timer);

		this.setState({[event.target.name]: event.target.value});

		this.timer = setTimeout(::this.getDockerHubUserProjects, WAIT_INTERVAL);
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

	getDockerHubUserProjects = () => {
		this.props.dispatch(getDockerGubUserProjects(this.state.user)).then(() => {
		})
	};

	getUserProjectsCombobox() {
		return (<select name='docker' disabled={!this.props.dockerHub}
										onChange={this.handleChange} className="combobox full-width">
			<option disabled selected value> -- select the project --</option>
			{this.props.dockerHub ? this.props.dockerHub.results.map(s => {
				let v = s.user + "/" + s.name;
				return <option key={s.name} id={s.name} name={s.name} value={JSON.stringify(s)}>{v}</option>;
			}) : null}
		</select>);
	}

	submitForm() {
		this.commit()
			.then(r => this.hasNull(r))
			.then(r => {
				this.props.dispatch(saveModelDescription(r)).then(() => {
					location.reload();
				});
			})
			.catch(err => this.setState({violated: true}));
	}



	hasNull(target) {
		return new Promise((resolve, reject) => {
			for (let member in target) {
				if (target[member] === null || target[member] === '') {
					reject(member);
				}
			}
			resolve(target);
		})
	}

	commit() {
		return new Promise((resolve, reject) => {

			let description = {
				user: localStorage.getItem('user'),
				name: this.state.name,
				docker: this.state.docker,
				domain: this.state.domain,
				inputType: this.state.inputType,
				inputDimensions: this.state.inputDimensions,
				modelParameters: this.state.modelParameters
			};
			resolve(description);
		})
	}





	getContent = () => {
		return (
			<form className="pure-form modal-content-container">
				<fieldset className="pure-group">
					<input type="text" name='name' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Neural Network Name"/>
					<input type="text" name='user' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="DockerHub User Name"/>
					<input type="text" name='domain' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Domain"/>
					<input type="text" name='inputType' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Input Type"/>
					<input type="text" name='inputDimensions' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Input Dimensions"/>

				</fieldset>

				<a onClick={this.submitForm} className="button" role="button">
					<span>Create</span>
					<div className="icon">
						<img src={AddIcon}/>
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
																title="Run instance"/>
		</div>)
	}
}
