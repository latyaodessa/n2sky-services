import React from 'react';
import {connect} from 'react-redux'
import {Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';
import {ReactCytoscape, cytoscape} from 'react-cytoscape';

const WAIT_INTERVAL = 1000;
const initYPost = -250;


@connect((store) => {
	return {}
})
export default class NNStructure extends React.Component {

	state = {
		elements: {nodes: [], edges: []},
		input: [],
		output: [],
		hidden: [],
		edges: []
	};

	constructor(props) {
		super(props);

		this.handleChange = ::this.handleChange;
		this.handleHiddenDim = ::this.handleHiddenDim;
		this.handleHiddenNode = ::this.handleHiddenNode;
	}

	drawCircle = (type, nodeId) => {

		let color = "#FFF";

		if (type === 'input') {
			color = "#00a2b3"
		}

		if (type === 'hidden') {
			color = "#d1bedd"
		}

		let stroke = {
			"color": "#c2c2c2"
		};
		return <div key={nodeId} id={nodeId}><Circle r={20} fill={{"color": color}} stroke={stroke} strokeWidth={2}/></div>
	};

	getTitles = () => {
		return <div className="pure-g circle-grid">
			<div className="pure-u-1-3 grid-table">
				<div className="layout-title">
					<h1>Input Layer</h1>
				</div>
			</div>
			<div className="pure-u-1-3 grid-table">
				<h1>Hidden Layers</h1>
			</div>
			<div className="pure-u-1-3 grid-table">
				<h1>Output Layer</h1>
			</div>
		</div>
	};

	// getNodes = () => {
	// 	console.log(this.state);
	// 	return <div className="pure-g circle-grid">
	// 		<div className="pure-u-1-3 grid-table">
	// 			{this.state.input.map(item => {
	// 				{
	// 					return this.drawCircle('input', item)
	// 				}
	//
	// 			})}
	// 		</div>
	//
	// 		<div className="pure-u-1-3 grid-table">
	//
	// 			<div className="pure-g">
	//
	// 				{this.state.hidden.map(item => {
	// 					{
	//
	// 						return <div className={"pure-u-1-" + this.state.hidden.length + " grid-table"}>
	// 							<h1>{item.id}</h1>
	// 							{item.nodes.map(node => {
	// 								return this.drawCircle('hidden', node)
	//
	// 							})
	// 							}
	//
	// 						</div>
	// 					}
	//
	// 				})}
	// 			</div>
	// 		</div>


	// 		<div className="pure-u-1-3 grid-table">
	// 			{this.state.output.map(item => {
	// 				{
	// 					return this.drawCircle('output', item)
	// 				}
	// 			})}
	// 		</div>
	// 	</div>
	// };


	handleChange(event) {

		let array = [];

		let xPost = 0;
		if (event.target.name === 'input') {
			xPost = -400;
		}

		for (let i = 1; i <= event.target.value; i++) {

			let id = i + "-" + event.target.name;
			array.push({data: {id: id}, position: {x: xPost, y: initYPost + i * 20}});
		}


		return new Promise((resolve, reject) => {
			this.setState({[event.target.name]: array});
			resolve(this.state);
		}).then(r => {
				this.rerenderLayouts();
				console.log(this.state)
			}
		);


	}

	rerenderLayouts() {
		let nodes = [];
		nodes.push(...this.state.input);
		nodes.push(...this.state.output);
		this.state.hidden.map(dim => {
			nodes.push(...dim.nodes);
		});
		this.setState({elements: {nodes: nodes, edges: this.state.edges}});

	}

	// handleChange(event) {
	//
	// 	let array = [];
	//
	// 	for (let i = 1; i <= event.target.value; i++) {
	// 		array.push(i + "-" + event.target.name)
	// 	}
	//
	//
	// 	this.setState({[event.target.name]: array});
	//
	// }

	handleHiddenDim(event) {

		let array = [];

		let layoutPosition = -350;

		for (let i = 1; i <= event.target.value; i++) {
			let dem = {
				id: i + "-hidden-layer",
				xPosition: layoutPosition + i * 100,
				nodes: []
			};

			array.push(dem)
		}

		console.log(array);

		this.setState({hidden: array});

	}

	handleHiddenNode(event) {

		let layers = this.state.hidden;

		layers.map(item => {
			if (item.id === event.target.name) {
				let array = [];
				for (let i = 1; i <= event.target.value; i++) {

					let id = i + "-node-" + event.target.name;
					array.push({data: {id: id}, position: {x: item.xPosition, y: initYPost + i * 20}});

				}
				item.nodes = array;
			}
		});

		return new Promise((resolve, reject) => {
			this.setState({hidden: layers});
			resolve(this.state);
		}).then(r => {
				this.rerenderLayouts();
				console.log(this.state)
			}
		);


	}


	getButtonLayout = () => {
		return <div className="pure-g circle-grid">
			<div className="pure-u-1-3 grid-table">
				<div className="layout-button-bar">
					<input type="number" name='input' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Amount of input nodes"/>
				</div>
			</div>
			<div className="pure-u-1-3 grid-table">
				<div className="layout-button-bar">
					<input type="number" name='hidden' onChange={this.handleHiddenDim} className="pure-input-1-1 full-width"
								 placeholder="Amount of hidden layers"/>
					{this.state.hidden.map(item => {
						return <div key={item.id} className="hidden-layers-node-container">
							<h1>{item.id}</h1>
							<input type="number" name={item.id} onChange={this.handleHiddenNode} className="pure-input-1-1 half-width"
										 placeholder="Amount"/>
						</div>
					})
					}

				</div>
			</div>
			<div className="pure-u-1-3 grid-table">
				<div className="layout-button-bar">
					<input type="number" name='output' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Amount of output nodes"/>
				</div>
			</div>
		</div>
	};

	// execFullConnection = () => {
	// 	console.log(this.state);
	// 	return <div>
	// 		<Line x1={85} y1={150} x2={350} y2={350} stroke={{color: '#E65243'}} strokeWidth={3}/>
	// 	</div>
	// };

	//
	// getElements() {
	// 	return {
	// 		nodes: [
	// 			{data: {id: 'a'}, position: {x: -400, y: -200}},
	// 			{data: {id: 'b'}, position: {x: -400, y: -80}},
	// 			{data: {id: 'c'}, position: {x: -200, y: -80}},
	// 			{data: {id: 'e'}, position: {x: 0, y: -80}}
	// 		],
	//
	// 		edges: [
	// 			// {data: {id: 'ae', source: 'a', target: 'e'}},
	// 			// {data: {id: 'ab', source: 'a', target: 'b'}},
	// 			// {data: {id: 'be', source: 'b', target: 'e'}},
	// 			// {data: {id: 'bc', source: 'b', target: 'c'}},
	// 			// {data: {id: 'ce', source: 'c', target: 'e'}}
	// 		]
	// 	};
	// }


	getVisualizations() {

		let style = [ // the stylesheet for the graph
			{
				selector: 'node',
				style: {
					'background-color': '#d1d1d1',
					'height': "15px",
					"width": "15px",
					// 'label': 'data(id)',
					'color': '#FFF',
					'font-size': "10px"
				}
			},

			{
				selector: 'edge',
				style: {
					'width': 1,
					'line-color': '#ccc',
					'target-arrow-color': '#ccc',
					'target-arrow-shape': 'triangle'
				}
			}
		];

		return <div className="cyt-container"><ReactCytoscape containerID="cy"
																													elements={this.state.elements}
																													cyRef={(cy) => {
																														this.cyRef(cy)
																													}}
																													cytoscapeOptions={{wheelSensitivity: 0.1}}
																													style={style}
																													pan={{x: 0, y: 0}}
																													layout={{name: 'preset'}}/>
		</div>
	}

	cyRef(cy) {
		this.cy = cy;
		cy.on('tap', 'node', function (evt) {
			let node = evt.target;
			console.log('tapped ' + node.id());
		});
	}

	execFullyConnected() {


		return new Promise((resolve, reject) => {
			let edges = [];

			this.state.input.map(inputNode => {
				this.state.hidden[0].nodes.map(hiddenNode => {
					edges.push({
						data: {
							id: inputNode.data.id + hiddenNode.data.id,
							source: inputNode.data.id,
							target: hiddenNode.data.id
						}
					})
				})

			});

			if (this.state.hidden.length > 1) {
				for (let i = 0; i < this.state.hidden.length; i++) {

					if (i + 1 < this.state.hidden.length) {
						this.state.hidden[i].nodes.map(hd1 => {
							this.state.hidden[i + 1].nodes.map(hd2 => {
								edges.push({
									data: {
										id: hd1.data.id + hd2.data.id,
										source: hd1.data.id,
										target: hd2.data.id
									}
								})
							});
						});
					}
				}
			}

			this.state.output.map(outputNode => {
				this.state.hidden[this.state.hidden.length-1].nodes.map(hiddenNode => {
					edges.push({
						data: {
							id: hiddenNode.data.id + outputNode.data.id,
							source: hiddenNode.data.id,
							target: outputNode.data.id
						}
					})
				})

			});


			this.setState({edges: edges});
			resolve(this.state);
		}).then(r => {
				this.rerenderLayouts();
				console.log(this.state)
			}
		);





	}


	render() {
		return (
			<div>

				<input onClick={this.execFullyConnected.bind(this)} type="button" value="aaa"/>

				{this.getTitles()}
				{this.getButtonLayout()}
				{this.getVisualizations()}
				{/*{this.getNodes()}*/}
				{/*{this.execFullConnection()}*/}


			</div>

		)
	}

}



