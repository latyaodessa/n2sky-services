import React from 'react';
import {connect} from 'react-redux'
import Loader from './../../core/loader/loader'
import DescriptionsOverview from './components/description-overview'

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
			isChainMode: false
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
				createdBy: localStorage.getItem("user")
			};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_y_running) {
			let reqParams = {
				createdBy: localStorage.getItem("user"),
				isRunning: true
			};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_all_networks) {
			let reqParams = {};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_y_saved) {
			let reqParams = {
				_id: {$in: this.props.savedDescriptionsByUser.saved.descriptionsId}
			};
			return <DescriptionsOverview reqParams={reqParams}/>

		}

	}


	render() {
		return (
			<div>
				<nav className="topbar">
					<ul>
						{this.getTabs()}
					</ul>
				</nav>
				{this.state.activeTab ? this.getActiveTab() : <Loader/>}
			</div>
		)
	}
}

