import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import TrainIconGrey from './../../../../../../res/img/icons/flask_grey.svg'
import {getModelsByReqParams} from './../../../../../actions/n2sky/neural-network-actions'
import Loader from "../../../../core/loader/loader";

const WAIT_INTERVAL = 1000;

@connect((store) => {
	return {
		modelsByDescId: store.modelsByDescId.models
	}
})
export default class DetailsModelsTable extends React.Component {


	state = {
		name: null,
		trainedBy: null,
		accuracy: null,
		isCopy: false,
		showAll: false
	};

	constructor(props) {
		super(props);
		this.getModelsByDescId()
		this.handleChange = ::this.handleChange;
	}

	handleChange(event) {
		clearTimeout(this.timer);

		this.setState({[event.target.name]: event.target.value});

		this.timer = setTimeout(::this.getModelsByDescId, WAIT_INTERVAL);
	}

	handleClick() {
		clearTimeout(this.timer);
		this.setState({isCopy: !this.state.isCopy});
		this.timer = setTimeout(::this.getModelsByDescId, WAIT_INTERVAL);

	}

	getModelsByDescId = () => {


		new Promise((res, rej) => {


			let static_filters = {};

			if (!this.state.showAll) {
				static_filters.trainedBy = localStorage.getItem("user");
			}


			let filters = {
				name: this.state.name,
				trainedBy: this.state.trainedBy,
				accuracy: this.state.accuracy,
				isCopy: this.state.isCopy
			};

			let reqParams = {
				static_filters: static_filters,
				ids: this.props.descripIds,
				filters: filters
			};
			res(reqParams);
		}).then(reqParams => {
			this.props.dispatch(getModelsByReqParams(reqParams, 0, 999)).then(() => {
				console.log(this.props);
			});
		});

	};

	getTrainedModelsTalbe = () => {
		return <table className="full-width pure-table">
			<thead>
			<tr>
				<th>Model Name</th>
				<th>User</th>
				<th>Requested Parameters</th>
				<th>Running Instance</th>
				<th>Details and Test</th>
			</tr>
			</thead>

			<tbody>
			{this.getRow()}
			</tbody>
		</table>
	};

	getRow = () => {
		return this.props.modelsByDescId.map(m => {
			return <tr key={m._id} className="pure-table">
				<td>{m.name}</td>
				<td>{m.trainedBy}</td>
				<td>{this.getRequestedParameters(m.modelParameters)}</td>
				<td>{m.endpoint}</td>
				<td>
					<Link to={"/n2sky/network/" + m.descriptionId + "/test/" + m._id} className="icon-button-container"><img
						src={TrainIconGrey}/></Link>
				</td>
			</tr>
		})
	};

	getRequestedParameters(modelParameters) {
		let lies = [];
		for (let [key, value] of Object.entries(modelParameters)) {
			lies.push(<li key={key}><span>{key}:</span> {value} </li>)
		}
		return <ul>{lies}</ul>;
	}

	getTableFilter = () => {
		return <div className="table-filter">
			<form className="pure-form">
				<fieldset>
					<input onChange={this.handleChange} name="name" type="text" placeholder="Model Name"/>
					<input onChange={this.handleChange} name="trainedBy" type="text" placeholder="Trained By"/>
					<input onChange={this.handleChange} name="accuracy" type="text" placeholder="Accuracy"/>
					<label>
						<input onClick={this.handleClick.bind(this)} type="checkbox"/> Only Copy
					</label>
					{(this.props.descriptionById && this.props.descriptionById.createdBy === localStorage.getItem('user')) || localStorage.getItem('type') === 'admin' ?
						<label>
							<input onClick={this.handleShowAllModels.bind(this)} type="checkbox"/> Show others models
						</label> : null}
				</fieldset>
			</form>
		</div>
	};

	handleShowAllModels() {
		clearTimeout(this.timer);
		this.setState({showAll: !this.state.showAll});
		this.timer = setTimeout(::this.getModelsByDescId, WAIT_INTERVAL);

	}

	render() {
		console.log(this.props);
		return (
			<div className="table-details">
				{this.getTableFilter()}
				{this.props.modelsByDescId ? this.getTrainedModelsTalbe() : <Loader/>}
			</div>
		)
	}
}

