import React from 'react';
import {connect} from 'react-redux'
import style from './style.scss'
import {getUserByIdentity} from './../../actions/administration/user-actions'
import UserIcon from './../../../res/img/icons/android.svg'

@connect((store) => {
	return {
		user: store.getUserByIdentity.user,
	}
})
export default class UserProfile extends React.Component {


	state = {};

	constructor(props) {
		super(props);
		this.props.dispatch(getUserByIdentity(localStorage.getItem("user")));
	}

	getName = () => {
		let fn = localStorage.getItem("firstName");
		let ln = localStorage.getItem("lastName");
		if (fn || ln) {
			return fn + " " + ln;
		}
		return localStorage.getItem("user");
	};


	render() {
		return (
			<aside className="profile-card">
				<header>
					<a target="_blank" href="#">
						<img src="http://lorempixel.com/150/150/people/" className="hoverZoomLink"/>
					</a>

					<h1>
						John Doe
					</h1>

					<h2>
						Better Visuals
					</h2>

				</header>

				<div className="profile-bio">

					<p>
						It takes monumental improvement for us to change how we live our lives. Design is the way we access that
						improvement.
					</p>

				</div>

				<ul className="profile-social-links">
					<li>
						<a target="_blank" href="https://www.facebook.com/creativedonut">
							<i className="fa fa-facebook"/>
						</a>
					</li>
					<li>
						<a target="_blank" href="https://twitter.com/dropyourbass">
							<i className="fa fa-twitter"/>
						</a>
					</li>
					<li>
						<a target="_blank" href="https://github.com/vipulsaxena">
							<i className="fa fa-github"/>
						</a>
					</li>
					<li>
						<a target="_blank" href="https://www.behance.net/vipulsaxena">

							<i className="fa fa-behance"/>
						</a>
					</li>
				</ul>
			</aside>
		)
	}
}

