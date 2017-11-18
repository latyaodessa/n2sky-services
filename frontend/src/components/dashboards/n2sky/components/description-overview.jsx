import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loader from './../../../core/loader/loader'
import LogoWhite from './../../../../../res/img/logo-white.svg'
import LogoGrey from './../../../../../res/img/logo-grey.svg'
import Enter from './../../../../../res/img/icons/right-arrow.png'


import {getDescriptions} from './../../../../actions/n2sky/neural-network-actions'


@connect((store) => {
	return {
		descriptions: store.getDescriptionsReducer.descriptions,
		done: store.getDescriptionsReducer.done,
	}
})
export default class DescriptionsOverview extends React.Component {


	constructor(props) {
		super(props);
		this.props.dispatch(getDescriptions(localStorage.getItem("user"), localStorage.getItem("type"))).then(() => {
			console.log(this.props);
		});
	}

	getDescription = () => {
		console.log(this.props.descriptions)
		return this.props.descriptions.map(d => {
			return <div key={d._id} className="container-panel pure-u-1-3">
				<div className="container-nn">
					<div className="container-header-panel">
						<h1>{d.name}</h1>
						{this.getRunningStatus(d.isRunning)}
					</div>
					<ul>
						<li>Owner: {d.createdBy}</li>
						<li>Created On: {d.createdOn}</li>
						<li>Domain: {d.domain}</li>
						<li>Input Dimentions: {d.inputDimensions}</li>
						<li>Input Type: {d.inputType}</li>
					</ul>
					<Link to={"/n2sky/network/" + d._id} className="button" role="button">
						<span>Details and actions</span>
						<div className="icon">
							<img src={Enter}/>
						</div>
					</Link>
				</div>
			</div>
		})
	};

	getRunningStatus = (isRunning) => {
		if (isRunning) {
			return <div className="is-running-header">

				<h1>Running</h1>
				<img id="spin" src={LogoWhite}/>
			</div>
		} else {
			return <div className="is-running-header">
				<h1>Not Running</h1>
				<img src={LogoGrey}/>
			</div>
		}
	};


	render() {
		return (
			<div>
				<div className="pure-g">
					{this.props.done ? this.getDescription() : <Loader/>}
				</div>
			</div>
		)
	}
}

