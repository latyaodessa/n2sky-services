import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import style from './style.scss'

export default class ServerDashlet extends React.Component {

	state = {
		selected: false
	};

	constructor(props) {
		super(props);
	}

	setSelected() {
		this.setState({
			selected: !this.state.selected
		})
	}

	render() {
		return (
			<material className={this.state.selected ? 'child selected' : 'child'}>
				<div className='content'>
					<div onClick={this.setSelected.bind(this)} className='title'>{this.props.server.name}</div>
					<div onClick={this.setSelected.bind(this)} className='description'>
						<ul>
							<li>ID: {this.props.server.id}</li>
							<li>Image: {this.props.server.image}</li>
							<li>Progress: {this.props.server.progress}</li>
							<li>Status: {this.props.server.status}</li>
							<li>Updated: {this.props.server.updated}</li>
						</ul>
					</div>
				</div>
			</material>
		)
	}
}
