import React from 'react'
import {Link} from 'react-router'
import CloudCreate from './../../../res/img/icons/cloud-create.svg'

import {browserHistory} from 'react-router'


export default class UserN2SkySidebar extends React.Component {

	state = {
		type: localStorage.getItem("type")
	};

	logout() {
		localStorage.removeItem("user");
		browserHistory.push('/');
	}

	render() {
		return (
			<header className="main-head main-head-right">
				<nav className="head-nav">
					<ul className="menu">
						<li>
							<a onClick={this.props.showCloseModal} href="#">
								<img className="sibar-icon" src={CloudCreate}/>
								<span>Add neural network</span>
							</a>
						</li>
						{/*<li>*/}
							{/*<Link>*/}
								{/*<img className="sibar-icon" src={UserIcon}/>*/}
								{/*<div className="mulitple-lines">*/}
									{/*<span onClick={() => {*/}
										{/*browserHistory.push('/user/profile')*/}
									{/*}}>Profile</span>*/}
									{/*<span onClick={this.logout.bind(this)}>Logout</span>*/}
								{/*</div>*/}
							{/*</Link>*/}
						{/*</li>*/}
					</ul>
				</nav>
			</header>
		)
	}
};