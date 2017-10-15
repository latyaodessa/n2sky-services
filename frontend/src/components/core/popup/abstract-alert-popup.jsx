import React from 'react'
import style from './style.scss'

export default class AbstractAlertPopUp extends React.Component {
	constructor(props){
		super(props);
	}

	getButtonColor(){
		switch(this.props.type) {
			case 'warning':
				return {backgroundColor: '#f9a742'};
				break;
			case 'error':
				return {backgroundColor: '#e06767'};
				break;
			default:
				return null;
		}
	}

	render() {
		return (
			<div onClick={this.props.validation} className="alert-popup">
				<span className='button-popup'>{this.props.title}</span>
			</div>
		);
	}
};
