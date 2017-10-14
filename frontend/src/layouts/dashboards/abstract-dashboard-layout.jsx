import React from 'react'
import Sidebar from './../core/sidebar'
import {browserHistory} from 'react-router'
import SettingsPopUp from './../core/popup/settings-popup'
import style from './style.scss'

export default class AbstractDashboardLayout extends React.Component {
	constructor(props) {
		super(props);
		if (!localStorage.getItem("user")) {
			browserHistory.push('/');
		}
		this.state = {
			showModal: false
		};

	}

	componentDidMount() {
		// window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		// window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions() {
		this.setState({
			width: window.innerWidth
		})
	}

	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	render() {
		return (
			<div>
				<Sidebar showCloseModal={this.showCloseModal.bind(this)}/>
				<div className="wrap-all-the-things">
					{React.cloneElement(this.props.children)}
				</div>
				{this.state.showModal ? <SettingsPopUp showCloseModal={this.showCloseModal.bind(this)}/> : null}
			</div>
		)
	}
}
