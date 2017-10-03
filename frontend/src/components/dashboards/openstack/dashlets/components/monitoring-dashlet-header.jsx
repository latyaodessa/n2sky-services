import React from 'react'
import style from './style.scss'
import RemoveIcon from './../../../../../../res/img/icons/delete.svg'

export default class MonitoringDashletHeader extends React.Component {

	state = {
		hover: false
	};

	constructor(props) {
		super(props);
	}

	generateName(name) {
		let clean = name.replace(/_/g, " ");
		return clean;
	}

	render() {
		return (
			<div onMouseEnter={()=> {this.setState({hover : true})}} onMouseLeave={()=> {this.setState({hover : false})}} className="dashlet-header">
				<div className="left-side">
					<h1>{this.generateName(this.props.name)}</h1>
				</div>
				<div className="right-side">
					{this.state.hover ? <img src={RemoveIcon}/> : null }
				</div>
			</div>
		)
	}
}
