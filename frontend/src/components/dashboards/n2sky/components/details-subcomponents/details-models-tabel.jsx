import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import TrainIconGrey from './../../../../../../res/img/icons/flask_grey.svg'

@connect((store) => {
	return {
	}
})
export default class DetailsModelsTable extends React.Component {


	state = {};

	constructor(props) {
		super(props);

	}



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
					<Link to={"/n2sky/network/" + this.props.params.id + "/test/" + m._id} className="icon-button-container"><img
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

	render() {
		return (
			<div>
				{this.getTrainedModelsTalbe()}
			</div>
		)
	}
}

