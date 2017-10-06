import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import SuccessIcon from './../../../../../res/img/icons/success.svg'
import MultiplyIcon from './../../../../../res/img/icons/multiply.svg'
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

	getIpAdresses(){
		return this.props.server.addresses.private.map( ip => {
			return <div key={ip.addr} className="info-header-item"> IP Address: {ip.addr}, type: {ip["OS-EXT-IPS:type"]}</div>
		});
	}

	getStatus(){
		let img = null;
		if(this.props.server.status === "ACTIVE"){
			img = <img src={SuccessIcon} className="icon-dashlet"/>;
		} else {
			img = <img src={MultiplyIcon} className="icon-dashlet"/>;
		}
			return <div className="info-header-item"> {img} Status: {this.props.server.status}</div>
	}

	render() {
		return (
			<material className={this.state.selected ? 'child selected' : 'child'}>
				<div className='content'>
					<div onClick={this.setSelected.bind(this)} className="title">
						<div className='title-header'>{this.props.server.name}</div>
						{this.getStatus()}
						<div className="info-header"> {this.getIpAdresses()}</div>
					</div>
					{		console.log(this.props.server)}
					<div onClick={this.setSelected.bind(this)} className='description'>
						<ul>
							<li>ID: {this.props.server.id}</li>
							<li>Image: {this.props.server.image}</li>
							<li>Progress: {this.props.server.progress}</li>
							<li>Updated: {this.props.server.updated}</li>
						</ul>
					</div>
				</div>
			</material>
		)
	}
}
