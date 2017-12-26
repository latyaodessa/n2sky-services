import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {SCHEMA} from "./schema";

import RightArrowIcon from './../../../../../res/img/icons/right-arrow-white.svg'

import NNDescription from './components/nn-description'
import NNStructure from './components/nn-structure'
import Loader from "../../../core/loader/loader";
import NNTraining from "./components/nn-training";

export const label_nn_desc = "Neural network Description";
export const label_nn_structure = "Neural Network Structure";
export const label_nn_training = "Neural Network Training";


@connect((store) => {
	return {}
})
export default class AddNNFromParadigm extends React.Component {

	state = {
		activeTab: label_nn_structure,
		schema: null
	};

	constructor(props) {
		super(props);
		this.commitCreatorMetadataProblemDomain = ::this.commitCreatorMetadataProblemDomain;
		this.commitStructure = ::this.commitStructure;
		this.changeActiveTab = ::this.changeActiveTab;
	}

	componentDidMount() {
		this.setState({schema: SCHEMA})
	}

	getActiveTab = () => {
		let activeStyle = {
			backgroundColor: 'dimgrey'
		};
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


	commitStructure(obj) {
		this.setState(prevState => ({
			...prevState,
			schema: {
				...prevState.schema,
				structure: {
					...prevState.schema.structure,
					inputLayer: {
						...prevState.schema.structure.inputLayer,
						result: {nodesId: obj.input}
					},
					outputLayer: {
						...prevState.schema.structure.outputLayer,
						result: {nodesId: obj.output}
					},
					hiddenLayer: {
						...prevState.schema.structure.outputLayer,
						result: {dimensions: obj.hidden}
					},
					connections: obj.connections
				}
			}
		}));
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
						{this.state.activeTab === label_nn_desc ? <NNDescription changeActiveTab={this.changeActiveTab}
																																		 commitCreatorMetadataProblemDomain={this.commitCreatorMetadataProblemDomain}
																																		 schema={this.state.schema}/> : null}
						{this.state.activeTab === label_nn_structure ?
							<NNStructure changeActiveTab={this.changeActiveTab} commitStructure={this.commitStructure}/> : null}

							{this.state.activeTab === label_nn_training ?
							<NNTraining/> : null}
					</div>
					: <Loader/>}

			</div>
		)
	}
}

