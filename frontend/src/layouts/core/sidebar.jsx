import React from 'react'
import {Link} from 'react-router'
import OpenStackIcon from './../../../res/img/icons/openstack.png'
import CloudifyIcon from './../../../res/img/icons/cloudify.png'

export default class Sidebar extends React.Component {

	render() {
		return (
			<header className="main-head">
				<nav className="head-nav">
					<ul className="menu">
						<li>
							<Link to="/openstack">
								<img className="sibar-icon" src={OpenStackIcon}/>
								<span>OpenStack Dashboard</span>
							</Link>
						</li>
						<li>
							<a href="#">
								<img className="sibar-icon" src={CloudifyIcon}/>
								<span>Cloudify Dashboard</span>
							</a>
						</li>
					</ul>
				</nav>
			</header>
		)
	}
};
