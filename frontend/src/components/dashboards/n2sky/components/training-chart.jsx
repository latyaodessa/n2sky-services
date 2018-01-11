import {LineChart} from 'react-easy-chart';
import React from 'react';

export default class TrainingChart extends React.Component {

	constructor(props) {
		super(props);
		// console.log(this.props.data);
		console.log(this.props.data.slice(0, 10))
	}

	render() {
		return (
			<div style={{backgroundColor: "#FFF", margin: '10px'}}>
				<LineChart
					lineColors={['#B91C1F']}
					axes
					grid
					verticalGrid
					interpolate={'cardinal'}
					width={document.body.clientWidth - 100}
					height={250}
					axisLabels={{x: 'Epoches', y: 'Loss'}}
					style={{
						".label": {
							color: "red"
						}
					}}
					data={[this.props.data]}
				/>
			</div>
		)
	}
};
