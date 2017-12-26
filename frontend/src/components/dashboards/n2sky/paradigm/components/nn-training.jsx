import React from 'react';
import {connect} from 'react-redux'
import style from './style.scss'

@connect((store) => {
	return {}
})
export default class NNTraining extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div>
				<h1> train </h1>

			</div>
		)
	}
}

