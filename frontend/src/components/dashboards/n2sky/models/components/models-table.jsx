import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getModelsByReqParams} from './../../../../../actions/n2sky/neural-network-actions'
import Loader from "../../../../core/loader/loader"
import OwnIcon from './../../../../../../res/img/icons/pc-coding.svg'
import AvalIcon from './../../../../../../res/img/icons/cloud-code.svg'
import RefreshIcon from './../../../../../../res/img/icons/refresh-button.svg'
import SaveIconBlack from './../../../../../../res/img/icons/copy-list.svg'
import CopyModelPopup from './copy-model-popup'
import style from './style.scss'

const WAIT_INTERVAL = 1000;

@connect((store) => {
	return {
		modelsByDescId: store.modelsByDescId.models
	}
})
export default class ModelsTable extends React.Component {


	state = {
		name: null,
		trainedBy: null,
		accuracy: null,
		isCopy: false,
		model: null,
		load: 3,
		modelCopy: null,
		showModal: false
	};

	constructor(props) {
		super(props);
		this.getModelsByDescId();
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

			let filters = {
				name: this.state.name,
				isCopy: this.state.isCopy,
				trainedBy: this.state.trainedBy
			};

			let reqParams = {
				ids: this.props.descripIds,
				filters: filters
			};
			res(reqParams);
		}).then(reqParams => {
			this.props.dispatch(getModelsByReqParams(reqParams, 0, this.state.load)).then(() => {
			});
		});

	};

	getTrainedModelsTalbe = () => {
		return <table className="full-width pure-table">
			<thead>
			<tr>
				<th>Model Name</th>
				<th>User</th>
				<th>Running Instance</th>
				<th>Performed tests</th>
				<th>Copy</th>
			</tr>
			</thead>

			<tbody>
			{this.getRow()}
			</tbody>
		</table>
	};

	getRow = () => {
		return this.props.modelsByDescId.map(m => {
			return <tr onClick={this.props.setModel.bind(this, m)} key={m._id} className="pure-table clickable">
				<td>{m.name}</td>
				<td>{m.trainedBy}</td>
				<td>{m.endpoint}</td>
				<td>{m.tests.length}</td>
				<td onClick={this.showCloseModal.bind(this, m)}><img className="icon-button-in-table" src={SaveIconBlack}/></td>
				{/*<td>*/}
				{/*<Link to={"/n2sky/network/" + m.descriptionId + "/test/" + m._id} className="icon-button-container"><img*/}
				{/*src={TrainIconGrey}/></Link>*/}
				{/*</td>*/}
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
					<label>
						<input onClick={this.handleClick.bind(this)} type="checkbox"/> Only Copy
					</label>
				</fieldset>
			</form>
		</div>
	};

	increaseLoad = () => {
		let newLoad = this.state.load + this.state.load;
		this.setState({load: newLoad});
		this.getModelsByDescId();
	};

	changetrainedByFilter(isAll) {
		if (isAll) {
			this.setState({trainedBy: null});
			this.getModelsByDescId();
		} else {
			this.setState({trainedBy: localStorage.getItem("user")});
			this.getModelsByDescId();
		}

	}

	showCloseModal(modelCopy = null) {
		this.setState({
			modelCopy: modelCopy,
			showModal: !this.state.showModal
		})
	}

	render() {
		return (
			<div>
				<div className="table-filter-container">
					<ul>
						<li onClick={this.changetrainedByFilter.bind(this, false)}>
							<img src={OwnIcon}/>
							<span>Own models</span>
						</li>
						<li onClick={this.changetrainedByFilter.bind(this, true)}>
							<img src={AvalIcon}/>
							<span>Available models</span>
						</li>
					</ul>
				</div>
				<div className="table-details">
					{this.getTableFilter()}
					{this.props.modelsByDescId ? this.getTrainedModelsTalbe() : <Loader/>}
				</div>
				<div onClick={this.increaseLoad.bind(this)} className="refresh-button">
					<img src={RefreshIcon}/>
				</div>
				{this.state.showModal ? <CopyModelPopup modelCopy={this.state.modelCopy}
																								showCloseModal={this.showCloseModal.bind(this)}/> : null}
			</div>
		)
	}
}

