import React from 'react';
import style from './style.scss'

export default class UserProfile extends React.Component {


	state = {};

	constructor(props) {
		super(props);
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

				<div className="profile-header">
					<a href="https://tutsplus.com">
						<img className="profile-pic"
								 src="https://pbs.twimg.com/profile_images/619517630538510336/A7enqSs__400x400.jpg"/>
					</a>

					<h1>{this.getName()}</h1>

				</div>

				<div className="profile-bio">

					<p>I’m a 22 year old guy from Belgium.
						Currently studying multimedia production in the great city of Ghent.
						Being in school gives me a lot of opportunities to learn and to be creative, but in my spare time I continue
						this path and do a lot of research.</p>

				</div>

			</aside>
		)
	}
}

