import React from 'react'
import Sidebar from './../core/sidebar'
import style from './style.scss'

export default class AbstractDashboardLayout extends React.Component {
	constructor(props) {
		super(props);
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
