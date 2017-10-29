import React from 'react'
import Sidebar from './../core/sidebar'
import UserN2SkySidebar from './../core/user-n2sky-sidebar'
import {browserHistory} from 'react-router'
import NewDescriptionPopup from './../../components/dashboards/n2sky/components/new-description-popup'
import style from './style.scss'

export default class AbstractUserN2SkyLayout extends React.Component {
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
				<div className="wrap-all-the-things wrap-all-the-things-right">
					{React.cloneElement(this.props.children)}
				</div>
				<UserN2SkySidebar showCloseModal={this.showCloseModal.bind(this)}/>
				{this.state.showModal ? <NewDescriptionPopup showCloseModal={this.showCloseModal.bind(this)}/> : null}
			</div>
		)
	}
}
