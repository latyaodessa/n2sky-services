import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {SCHEMA} from "./schema";

import RightArrowIcon from './../../../../../res/img/icons/right-arrow-white.svg'

import NNDescription from './components/nn-description'
import NNStructure from './components/nn-structure'
import Loader from "../../../core/loader/loader";

export const label_nn_desc = "Neural network Description";
export const label_nn_structure = "Neural Network Structure";
export const label_nn_training = "Neural Network Training";


@connect((store) => {
	return {}
})
export default class AddNNFromParadigm extends React.Component {

	state = {
		activeTab: label_nn_structure, //label_nn_desc
		schema: null
	};

	constructor(props) {
		super(props);
		this.commitCreatorMetadataProblemDomain =::this.commitCreatorMetadataProblemDomain;
		this.changeActiveTab =::this.changeActiveTab;
	}

	componentDidMount() {
		this.setState({schema: SCHEMA})
	}

	getActiveTab = () => {
		let activeStyle = {
			backgroundColor: 'dimgrey'
		};
		console.log(this.state);
		return <nav className="topbar">
			<ul>
				{this.state.activeTab === label_nn_desc ?
					<li><span className="no-action" style={activeStyle}>{label_nn_desc}</span></li> :
					<li><span className="no-action">{label_nn_desc}</span></li>}

				<li><span className="no-action"><img src={RightArrowIcon}/></span></li>

				{this.state.activeTab === label_nn_structure ?
					<li><span className="no-action" style={activeStyle}>{label_nn_structure}</span></li> :
					<li><span className="no-action">{label_nn_structure}</span></li>}

				<li><span className="no-action"><img src={RightArrowIcon}/></span></li>

				{this.state.activeTab === label_nn_training ?
					<li><span className="no-action" style={activeStyle}>{label_nn_training}</span></li> :
					<li><span className="no-action">{label_nn_training}</span></li>}
			</ul>
		</nav>
	};

	commitCreatorMetadataProblemDomain(obj) {
		this.setState({
			schema: {
				...this.state.schema,
				metadata: obj.metadata,
				creator: obj.creator,
				peoblemDomain: obj.peoblemDomain
			}
		});
		return this.state.schema;
	}

	changeActiveTab = (activeTab) => {
		this.setState({activeTab: activeTab})
	};

	render() {
		return (
			<div>
				{this.state.schema ? <div>
						{this.getActiveTab()}
						{this.state.activeTab === label_nn_desc ? <NNDescription changeActiveTab={this.changeActiveTab} commitCreatorMetadataProblemDomain={this.commitCreatorMetadataProblemDomain} schema={this.state.schema}/> : null}
						{this.state.activeTab === label_nn_structure ? <NNStructure/> : null}
					</div>
					: <Loader/>}

			</div>
		)
	}
}

