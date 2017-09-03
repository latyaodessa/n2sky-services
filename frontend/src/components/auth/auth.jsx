import React from 'react';
import style from './style.scss'
import Neuron from './../../../res/img/neuron.png'
import {Link} from 'react-router'

export default class Auth extends React.Component {


	state = {
		form: "profile"
	};

	constructor(props) {
		super(props);
	}


	openForm() {
		this.setState({
			form: "profile--open"
		});
	}

	render() {
		return (
			<div className="container">
				<div className={this.state.form}>
					<button className="profile__avatar" id="toggleProfile">
						<img onClick={this.openForm.bind(this)} src={Neuron}/>
					</button>
					<div className="profile__form">
						<div className="profile__fields">
							<div className="field">
								<input type="text" id="fieldUser" className="input" required/>
								<label htmlFor="fieldUser" className="label">Username</label>
							</div>
							<div className="field">
								<input type="password" id="fieldPassword" className="input" required/>
								<label htmlFor="fieldPassword" className="label">Password</label>
							</div>
							<div className="profile__footer">
								<Link to="/overview">
									<button className="btn">Login</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

