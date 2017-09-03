import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import Enter from './../../../../../res/img/icons/right-arrow.png'
import style from './style.scss'

export default class ProjectsDashlet extends React.Component {

	state = {};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="pure-u-1-3 pure-sm-1-1">
				<div className="dashlet-container">
					<ul>
						<li>Name: {this.props.project.name}</li>
						<li>ID: {this.props.project.id}</li>
						{this.props.project.description ? <li>Description: {this.props.project.description}</li> : null}
						<li>Enabled: {this.props.project.enabled ? "Yes" : "No"}</li>
						<li>Is a domain: {this.props.project.is_domain ? "Yes " + this.props.project.domain_id : "No"} </li>
						<li>Parent: {this.props.project.parent_id}</li>
					</ul>
					<Link to={"openstack/project/" + this.props.project.id}>
						<a className="button" role="button">
							<span>Open Project</span>
							<div className="icon">
								<img src={Enter}/>
							</div>
						</a>
					</Link>
				</div>
			</div>
		)
	}
}
