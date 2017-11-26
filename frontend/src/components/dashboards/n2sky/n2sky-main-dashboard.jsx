import React from 'react';
import Loader from './../../core/loader/loader'
import DescriptionsOverview from './components/description-overview'
import AvailableNetworksOverview from './components/available-networks-overview'

const label_ynn = "Your Networks";
const label_y_running = "Your Running Networks";
const label_all_networks = "All Networks";


export default class N2SkyDashboard extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			activeTab: label_ynn
		};
	}


	getTabs() {
		let tabs = [label_ynn, label_y_running];
		if(localStorage.getItem("user") === 'admin') {
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
				createdBy : localStorage.getItem("user")
			};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_y_running) {
			let reqParams = {
				createdBy : localStorage.getItem("user"),
				isRunning: true
			};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_all_networks) {
			let reqParams = {
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
				aaa
			</div>
		)
	}
}

