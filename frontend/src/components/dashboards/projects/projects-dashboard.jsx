import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loader from './../../core/loader/loader'

import CloudCreate from './../../../../res/img/icons/cloud-create.svg'
import Networkcon from './../../../../res/img/icons/network.svg'
import ModelsIcon from './../../../../res/img/icons/cube.svg'
import CloudFromParadigmIcon from './../../../../res/img/icons/cloud-search.svg'
import CreateProjectPopup from './../n2sky/components/create-project-popup'
import {getProjectById} from './../../../actions/n2sky/project-actions'
import NewDescriptionPopup from './../n2sky/components/new-description-popup'

@connect((store) => {
	return {
		projects: store.projects.projects
	}
})
export default class ProjectDashboard extends React.Component {


	constructor(props) {
		super(props);

		this.props.dispatch(getProjectById(this.props.params.id)).then(() => {
			console.log(this.props);
		});

		this.state = {
			showNNModal: false,
		};
	}


	getNavbar = (text) => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">{text}</span></li>
			</ul>
		</nav>
	};


	showCloseNewNNModal() {
		this.setState({
			showNNModal: !this.state.showNNModal
		})
	}


	getToolsLinks() {
		return <div>

			<div className="pure-g admin-tools-container">
				<div className="pure-u-1-4">
					<Link to="/n2sky/available">
						<div>
							<img className="sibar-icon" src={Networkcon}/>
						</div>
						<span>Available neural networks</span>
					</Link>
				</div>
				<div className="pure-u-1-4">
					<Link to="/n2sky/models">
						<div>
							<img className="sibar-icon" src={ModelsIcon}/>
						</div>
						<span>Models repository</span>
					</Link>
				</div>
				<div className="pure-u-1-4">
					<Link to={'/n2sky/paradigm/create/' + this.props.params.id}>
						<div>
							<img className="sibar-icon" src={CloudFromParadigmIcon}/>
						</div>
						<span>Add neural network from paradigm</span>
					</Link>
				</div>
				<div className="pure-u-1-4">
					<a onClick={this.showCloseNewNNModal.bind(this)}>
						<div>
							<img className="sibar-icon" src={CloudCreate}/>
						</div>
						<span>Add neural network from scratch</span>
					</a>
				</div>
			</div>
		</div>
	}

	getNeuralNetworks = () => {
		return <div className="pure-g">
			<div className="pure-u-1-4">

			</div>
		</div>
	};


	render() {
		return (
			<div>
				{this.props.projects ?
					<div>
						{this.getNavbar("Project: " + this.props.projects.name)}
						{this.getToolsLinks()}
						{this.props.projects.nns ?
							<div>
							{this.getNavbar("Neural networks")}
						</div>
							: null}
						{this.state.showNNModal ?
							<NewDescriptionPopup showCloseModal={this.showCloseNewNNModal.bind(this)}/> : null}
					</div> : <Loader/>}
			</div>
		)
	}
}

