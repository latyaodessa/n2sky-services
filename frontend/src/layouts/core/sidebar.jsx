import React from 'react'
import {Link} from 'react-router'
import UserIcon from './../../../res/img/icons/user.svg'
import OpenStackIcon from './../../../res/img/icons/openstack.png'
import CloudifyIcon from './../../../res/img/icons/cloudify.png'
import N2SkyIcon from './../../../res/img/logo-white.png'
import SettingsIcon from './../../../res/img/icons/settings.svg'
import HomeIcon from './../../../res/img/icons/home.svg'
import {browserHistory} from 'react-router'


export default class Sidebar extends React.Component {

	state = {
		type: localStorage.getItem("type")
	};

	logout() {
		localStorage.removeItem("user");
		browserHistory.push('/');
	}

	render() {
		return (
			<header className="main-head">
				<nav className="head-nav">
					<ul className="menu">
						<li>
							<Link>
								<img className="sibar-icon" src={UserIcon}/>
								<div className="mulitple-lines">
									<span onClick={() => {
										browserHistory.push('/user/profile')
									}}>Profile</span>
									<span onClick={this.logout.bind(this)}>Logout</span>
								</div>
							</Link>
						</li>
						<li>
							<Link to="/overview">
								<img className="sibar-icon" src={HomeIcon}/>
								<span>Main Dashboard</span>
							</Link>
						</li>
						{this.state.type && this.state.type === 'admin' ?
							<li>
								<Link to="/openstack">
									<img className="sibar-icon" src={OpenStackIcon}/>
									<span>OpenStack Dashboard</span>
								</Link>
							</li> : null}
						{this.state.type && this.state.type === 'admin' ?
						<li>
							<a href="#">
								<img className="sibar-icon" src={CloudifyIcon}/>
								<span>Cloudify Dashboard</span>
							</a>
						</li> : null}
						<li>
							<Link to="/n2sky">
								<img className="sibar-icon" src={N2SkyIcon}/>
								<span>N2Sky Dashboard</span>
							</Link>
						</li>
						<li>
							<a onClick={this.props.showCloseModal} href="#">
								<img className="sibar-icon" src={SettingsIcon}/>
								<span>Dashboards Settigns</span>
							</a>
						</li>
					</ul>
				</nav>
			</header>
		)
	}
};
