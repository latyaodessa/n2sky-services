import React from 'react';
import {connect} from 'react-redux'
import style from './style.scss'
import {getProjectsByParams} from './../../../../actions/n2sky/project-actions'
import Loader from "../../../core/loader/loader";
import {Link} from 'react-router';


@connect((store) => {
	return {
		projects: store.projects.projects
	}
})
export default class ProjectsList extends React.Component {


	constructor(props) {
		super(props);
		let params = {
			static_filters: {createdBy: localStorage.getItem("user")}
		};
		this.props.dispatch(getProjectsByParams(params)).then(() => {
			console.log(this.props);
		})
	}

	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	getFolder = (name, id) => {
		return <div key={id} className="pure-u-1-4">
			<Link to={'/n2sky/project/' + id}>
				<span className="folder"/>
				<span className="projectLabel paradigm-fixed-labels"><h1>{name}</h1></span>
			</Link>
		</div>

	};


	getNavbarProjects = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Your Projects</span></li>
			</ul>
		</nav>
	};

	render() {
		return (
			<div>

				{this.props.projects && this.props.projects.length > 0 ?
					<div>
						{this.getNavbarProjects()}
						<div className="pure-g">
							{this.props.projects.map(p => this.getFolder(p.name, p._id))}
						</div>
					</div>
					: null}
			</div>
		)
	}
}

