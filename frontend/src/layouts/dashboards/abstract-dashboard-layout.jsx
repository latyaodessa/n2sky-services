import React from 'react'
import Sidebar from './../core/sidebar'
import {browserHistory} from 'react-router'
import style from './style.scss'

export default class AbstractDashboardLayout extends React.Component {
	constructor(props) {
		super(props);
		if(!localStorage.getItem("user")){
			browserHistory.push('/');
		}
		this.state = {};

	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions() {
		this.setState({
			width: window.innerWidth
		})
	}

	render() {
		return (
			<div>
				<Sidebar/>
				<div className="wrap-all-the-things">
					{React.cloneElement(this.props.children)}
				</div>
			</div>
		)
	}
}
