import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loader from './../../../../core/loader/loader'
import DownloadIcon from './../../../../../../res/img/icons/download.svg'
import TestIcon from './../../../../../../res/img/icons/flask_white.svg'

@connect((store) => {
	return {}
})
export default class ModeDetails extends React.Component {


	constructor(props) {
		super(props);
	}

	getRawModel = () => {
		return <div className="container-panel pure-u-1-1">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>RAW MODEL in JSON Format</h1>
				</div>
				<pre className="raw-model">
					{JSON.stringify(this.props.model.model, null, 2)}
				</pre>
				{console.log(this.props)}
				<a onClick={this.download.bind(this)} className="button" role="button">
					<span>Download JSON file</span>
					<div className="icon">
						<img src={DownloadIcon}/>
					</div>
				</a>
			</div>
		</div>
	};

	getContent = () => {
		return <div>

			<div className="pure-g">
				{this.props.model ? this.getParamDetails() : <Loader/>}
				{this.getTabs()}
				{this.props.model ? this.getRawModel() : <Loader/>}
			</div>
		</div>
	};

	getTabs = () => {
		return <nav className="topbar pure-u-1-1">
			<ul>
				<li><span className="tab">Raw Model</span></li>
				<li><span className="tab">VINSL Formated Model</span></li>
			</ul>
		</nav>
	};

	getParamDetails = () => {
		return <div className="container-panel pure-u-1-1">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>Model: {this.props.model.name}</h1>
					<div className="button-in-header">
						<Link to={"/n2sky/network/" + this.props.model.descriptionId + "/test/" + this.props.model._id}
									className="icon-button-container button" role="button">
							<span>Details and Tests</span>
							<div className="icon">
								<img src={TestIcon}/>
							</div>
						</Link>
					</div>
				</div>
				{this.getRequestedParameters(this.props.model.modelParameters)}
			</div>
		</div>
	};

	getRequestedParameters(modelParameters) {
		let lies = [];
		for (let [key, value] of Object.entries(modelParameters)) {
			lies.push(<li key={key}><span>{key}:</span> {value} </li>)
		}
		return <ul>{lies}</ul>;
	}


	download() {
		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.props.model.model, null, 2)));
		element.setAttribute('download', this.props.model.name + ".txt");

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	render() {
		console.log(this.props.model);
		return (
			<div>
				{this.getContent()}
			</div>
		)
	}
}

