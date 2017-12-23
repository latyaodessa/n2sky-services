import React from 'react';
import {connect} from 'react-redux'
import {ReactCytoscape, cytoscape} from 'react-cytoscape';
import FullyConnectedIcon from './../../../../../../res/img/icons/fullconnected.svg'
import AddShortcutIcon from './../../../../../../res/img/icons/shortcuts.svg'

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
		edges: [],
		isShortcut: false,
		selectedInput: null,
		selectedShortcut: null,
		shortcuts: []
	};

	constructor(props) {
		super(props);

		this.handleChange = ::this.handleChange;
		this.handleHiddenDim = ::this.handleHiddenDim;
		this.handleHiddenNode = ::this.handleHiddenNode;
		this.handleShortcutsInput = ::this.handleShortcutsInput;
	}


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
			},
			{
				"selector": "edge.unbundled-bezier-up",
				"style": {
					"curve-style": "unbundled-bezier",
					"control-point-distances": -120,
					"control-point-weights": 0.5
				}
			},
			{
				"selector": "edge.unbundled-bezier-down",
				"style": {
					"curve-style": "unbundled-bezier",
					"control-point-distances": 120,
					"control-point-weights": 0.1
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


	removeAllEdges = (edgeNodeId) => {
		console.log(edgeNodeId);
		return new Promise((resolve, reject) => {
			let edges = this.state.edges.filter(edge => edge.data.source !== edgeNodeId);
			this.setState({edges: edges})
			resolve(this.state);
		}).then(r => {
			this.rerenderLayouts();
			console.log(this.state)
		})
	};

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
				this.state.hidden[this.state.hidden.length - 1].nodes.map(hiddenNode => {
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

	isAllLayersFilled = () => {
		return this.state.input.length > 0 && this.state.output.length > 0 && this.state.hidden.length > 0
	};

	getConnectionNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Neural network connection</span></li>
			</ul>
		</nav>
	};

	getConnectionContent = () => {
		return <div className="pure-g circle-grid">
			<div className="pure-u-1-3 grid-table">
				<div className="pure-g circle-grid">
					<div className="pure-u-1-2 grid-table">
						<a onClick={this.execFullyConnected.bind(this)} className="button" role="button">
							<span>Execute full connection</span>
							<div className="icon">
								<img src={FullyConnectedIcon}/>
							</div>
						</a>
					</div>
					<div className="pure-u-1-2 grid-table">
						<form className="pure-form">
							<label className="pure-checkbox container-paradigm-wrapper">
								<input onClick={this.changeShortcut.bind(this)} id="option-one" type="checkbox" value=""/>
								<span>Make shortcuts</span>
							</label>
						</form>
					</div>
				</div>
			</div>
			<div className="pure-u-1-2 grid-table">
				{this.state.isShortcut ? this.getShotcutsForm() : null}
			</div>
		</div>
	};

	getShotcutsForm = () => {
		return <div className="pure-g circle-grid">
			<div className="pure-u-1-2 grid-table">
				<div>
					{this.state.shortcuts.map(sc => {
						return <div><h1>Shortcut: from {sc.from} to {sc.to}</h1></div>
					})}
				</div>
				<form className="pure-form">
					<fieldset>
						<select onChange={this.handleShortcutsInput} name="selectedInput" className="pure-input-1-2">
							<option disabled selected value> -- select input node --</option>
							{this.state.input.map(inputNode =>
								<option key={inputNode.data.id} value={inputNode.data.id}>{inputNode.data.id}</option>
							)}
						</select>
						<select onChange={this.handleShortcutsInput} name="selectedShortcut" className="pure-input-1-2">
							<option disabled selected value> -- select input node --</option>
							{this.state.hidden.map(hidden =>
								<option key={hidden.id} value={hidden.id}>{hidden.id}</option>
							)}
							<option value="output">output layer</option>

						</select>
					</fieldset>
				</form>
			</div>
			<div className="pure-u-1-2 grid-table">
				<a onClick={this.executeAddShortCut.bind(this)} className="button" role="button">
					<span>Add shortcut</span>
					<div className="icon">
						<img src={AddShortcutIcon}/>
					</div>
				</a>
			</div>
		</div>
	};

	handleShortcutsInput(event) {
		console.log(event.target.value);
		this.setState({[event.target.name]: event.target.value});
	}

	executeAddShortCut = () => {
		if (this.state.selectedInput && this.state.selectedShortcut) {
			this.removeAllEdges(this.state.selectedInput).then(r => {

				let toBlockNodes = [];

				if (this.state.selectedShortcut === 'output') {
					toBlockNodes = this.state.output;
				} else {
					toBlockNodes = this.state.hidden.filter(h => h.id === this.state.selectedShortcut)[0].nodes;
				}

				console.log(toBlockNodes);


				let edges = this.state.edges;

				console.log(this.state.selectedInput.match(/\d+/g).map(Number));
				console.log( this.state.selectedInput);

				let edgeStyle = this.state.input.length / 2 > this.state.selectedInput.match(/\d+/g).map(Number)[0] ? "unbundled-bezier-up" : "unbundled-bezier-down";

				toBlockNodes.map(toNode => {
					edges.push({
						data: {
							id: this.state.selectedInput + toNode.data.id,
							source: this.state.selectedInput,
							target: toNode.data.id
						},
						classes: edgeStyle
					})
				});

			}).then(r => {
				this.rerenderLayouts();
				console.log(this.state)
			}).then(r => {
				let shortcuts = this.state.shortcuts;
				shortcuts.push({from: this.state.selectedInput, to: this.state.selectedShortcut});
				this.setState({shortcuts: shortcuts, selectedInput: null, selectedShortcut: null})
			});
		}
	};

	changeShortcut() {
		this.setState({isShortcut: !this.state.isShortcut})
	}


	render() {
		return (
			<div>
				{this.getTitles()}
				{this.getButtonLayout()}
				{this.isAllLayersFilled() ? this.getConnectionNavbar() : null}
				{this.isAllLayersFilled() ? this.getConnectionContent() : null}
				{this.isAllLayersFilled() ? this.getVisualizations() :
					<div className="container-paradigm-wrapper">
						<h1>Please fill up layers to visualise neural network structure</h1>
					</div>}


			</div>

		)
	}

}



