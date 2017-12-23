import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loader from './../../core/loader/loader'
import DescriptionsOverview from './components/description-overview'

import CloudCreate from './../../../../res/img/icons/cloud-create.svg'
import Networkcon from './../../../../res/img/icons/network.svg'
import ModelsIcon from './../../../../res/img/icons/cube.svg'
import CloudFromParadigmIcon from './../../../../res/img/icons/cloud-search.svg'
import NewDescriptionPopup from './../../dashboards/n2sky/components/new-description-popup'

import {getCopiedDescriptions} from './../../../actions/n2sky/neural-network-actions'

const label_ynn = "Your Networks";
const label_y_running = "Your Running Networks";
const label_y_saved = "Saved Networks";
const label_all_networks = "All Networks";

@connect((store) => {
	return {
		savedDescriptionsByUser: store.savedDescriptionsByUser,
		modelsByDescId: store.modelsByDescId.models
	}
})
export default class N2SkyDashboard extends React.Component {


	constructor(props) {
		super(props);

		this.props.dispatch(getCopiedDescriptions(localStorage.getItem("user")));

		this.state = {
			activeTab: label_ynn,
			isChainMode: false,
			showNNModal: false
		};
	}


	getTabs() {
		let tabs = [label_ynn, label_y_running, label_y_saved];
		if (localStorage.getItem("user") === 'admin') {
			tabs.push(label_all_networks)
		}
		return tabs.map(ct => <li onClick={() => this.setActiveTab(ct)} key={ct}><a>{ct}</a></li>);
	}

	setActiveTab(tab) {
		this.setState({
			activeTab: tab
		})
	}

	getActiveTab() {
		if (this.state.activeTab === label_ynn) {
			let reqParams = {
				static_filters: {createdBy: localStorage.getItem("user")}
			};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_y_running) {
			let reqParams = {
				static_filters: {
					createdBy: localStorage.getItem("user"),
					isRunning: true}
			};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_all_networks) {
			let reqParams = {};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_y_saved) {
			let reqParams = {
				static_filters: {
					_id: {$in: this.props.savedDescriptionsByUser.saved.descriptionsId}
				}
			};
			return <DescriptionsOverview reqParams={reqParams}/>

		}

	}

	getNavbar = (text) => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">{text}</span></li>
			</ul>
		</nav>
	};

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
					<Link to="/n2sky/paradigm/create">
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

	showCloseNewNNModal() {
		this.setState({
			showNNModal: !this.state.showNNModal
		})
	}


	render() {
		return (
			<div>
				{this.getNavbar("N2Sky Dashboard")}
				{this.getToolsLinks()}
				<nav className="topbar">
					<ul>
						{this.getTabs()}
					</ul>
				</nav>
				{this.state.activeTab ? this.getActiveTab() : <Loader/>}
				{this.state.showNNModal ? <NewDescriptionPopup showCloseModal={this.showCloseNewNNModal.bind(this)}/> : null}
			</div>
		)
	}
}

