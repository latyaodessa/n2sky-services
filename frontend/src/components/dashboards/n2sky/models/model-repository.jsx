import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import ModeDetails from './components/model-details'
import ModelsTable from './components/models-table'
import EmptyModelDetails from './components/empty-model-details'

@connect((store) => {
	return {}
})
export default class ModelsRepository extends React.Component {


	state = {
		model: null
	};

	constructor(props) {
		super(props);

	}

	getNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Models Repository</span></li>
			</ul>
		</nav>
	};

	setModel = (model) => {
		this.setState({model: model})
	};


	render() {
		return (
			<div>
				{this.getNavbar()}
				<div className="pure-g">
					<div className="pure-u-1-2"><ModelsTable setModel={this.setModel}/></div>
					<div className="pure-u-1-2">
						{this.state.model ? <ModeDetails model={this.state.model}/> : <EmptyModelDetails/>}
					</div>
					{/*{this.props.done ? this.getDescription() : <Loader/>}*/}
				</div>
				{/*{this.props.done && this.props.descriptions.length === 0 ? this.getNoOwnNN() : null}*/}
				{/*<NavigationPage chainButtonVisible={false} method={this.geDescriptonWithOffset} offsetSize={offsetSize}/>*/}
			</div>
		)
	}
}

