import React from 'react';
import {connect} from 'react-redux'
import Loader from './../../core/loader/loader'
import DescriptionsOverview from './components/description-overview'


@connect((store) => {
	return {

	}
})
export default class N2SkyDashboard extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'Neural Networks'
		};
	}



	getTabs() {
		let tabs = ["Neural Networks", "Running Instances", "Available Networks"];
		return tabs.map(ct => <li onClick={() => this.setActiveTab(ct)} key={ct}><a>{ct}</a></li>);
	}

	setActiveTab(tab) {
		this.setState({
			activeTab: tab
		})
	}

	getActiveTab() {
		if (this.state.activeTab === 'Neural Networks') {
			return <DescriptionsOverview/>
		} else if (this.state.activeTab === 'neutron') {
			return <DescriptionsOverview/>
		} else if (this.state.activeTab === 'images') {
			return <DescriptionsOverview/>
		} else if (this.state.activeTab === 'vitrage') {
			return <DescriptionsOverview/>
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

