import React from 'react';
import style from './style.scss'
import Neuron from './../../../res/img/neuron.png'
import LogoWhite from './../../../res/img/logo-white.png'
import LogoBlack from './../../../res/img/logo.svg'
import {Link} from 'react-router'
import AbstractAlertPopUp from './../core/popup/abstract-alert-popup'
import {browserHistory} from 'react-router'



export default class Auth extends React.Component {


	state = {
		form: "profile",
		username: '',
		password: '',
		violated: false,
		logo: LogoWhite
	};

	constructor(props) {
		super(props);
		if(localStorage.getItem('user')){
			browserHistory.push('/overview');
		}
	}

	authonize() {
		if (!this.state.username || !this.state.password) {
			this.setState({violated: true});
			return;
		}
		localStorage.setItem('user', this.state.username);
		browserHistory.push('/overview');
	}


	openForm() {
		this.setState({
			form: "profile--open",
			logo: LogoBlack
		});
	}

	changeValidation() {
		this.setState({
			violated: !this.state.violated
		});
	}

	render() {
		return (
			<div>
				{this.state.violated ?
					<AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)} title="Validation error"
															content="All fields are mandatory!"/> : null}
				<div className="container">
					<div className={this.state.form}>
						<button className="profile__avatar" id="toggleProfile">
							<div onClick={this.openForm.bind(this)} className="header-auth">
								<img id="spin" src={this.state.logo}/>
								<div className="wrapper-header">
								<div className="letters">
									<span className="letter">n</span>
									<span className="letter">2</span>
									<span className="letter">s</span>
									<span className="letter">k</span>
									<span className="letter">y</span>
								</div>
							</div>
							</div>
						</button>
						<div className="profile__form">
							<div className="profile__fields">
								<div className="field">
									<input value={this.state.username} onChange={(evt) => {
										this.setState({username: evt.target.value})
									}} type="text" id="fieldUser" className="input" required/>
									<label htmlFor="fieldUser" className="label">Username</label>
								</div>
								<div className="field">
									<input value={this.state.password} onChange={(evt) => {
										this.setState({password: evt.target.value})
									}} type="password" id="fieldPassword" className="input" required/>
									<label htmlFor="fieldPassword" className="label">Password</label>
								</div>
								<div className="profile__footer">
									<button onClick={this.authonize.bind(this)} className="btn">Login</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

