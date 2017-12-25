export const SCHEMA = {
	"metadata": {
		"name": null,
		"description": null,
		"paradigm": "Backpropagation"
	},
	"creator": {
		"name": null,
		"contact": null
	},
	"peoblemDomain": {
		"propagationType": {
			"value": null,
			"possibleValues": ["feedforward"],
			"learningType": {
				"value": null,
				"possibleValues": ["definedconstructed", "trained", "supervised", "usupervised", "linear"]
			}
		},
		"applicationField": {
			"value": null,
			"possibleValues": ["AccFin", "HealthMed", "Marketing", "Retail", "Insur", "Telecom", "Operations", "EMS"]
		},
		"problemType": {
			"value": null,
			"possibleValues": ["Classifiers", "Approximators", "Memory", "Optimisation", "Clustering"]
		},
		"netoworkType": "Backpropagation"
	},
	"endpoints": [{
		"name": "train",
		"endpoint": null
	}, {
		"name": "test",
		"endpoint": null
	}],
	"structure": {
		"inputLayer": {
			"result": {
				"nodesId": []
			},
			"config": {
				"dimensions": {
					"min": 1,
					"max": 1
				},
				"size": {
					"min": 960,
					"max": 960
				}
			}
		},
		"hiddenLayer": {
			"result": {
				"dimensions": [{
					"id": null,
					"nodesId": []
				}]
			},
			"config": {
				"dimensions": {
					"min": 1,
					"max": 1
				},
				"size": {
					"min": 960,
					"max": 960
				}
			}
		},
		"outputLayer": {
			"result": {
				"nodesId": []
			},
			"config": {
				"dimensions": {
					"min": 1,
					"max": 1
				},
				"size": {
					"min": 960,
					"max": 960
				}
			}
		},
		"connections": {
			"fullyConnected": {
				"isConnected": null
			},
			"shortcuts": {
				"isConnected": null,
				"connections": [{
					"fromNode": 0,
					"toNode": 0
				}]
			}
		}
	},
	"parameters": {
		"input": [{
			"parameter": "learningrate",
			"value": 0.4,
			"possibleValues": [0.1, 0.2, 0.3, 0.4]
		},
			{
				"parameter": "biaInput",
				"value": 1,
				"possibleValues": []
			},
			{
				"parameter": "biasHidden",
				"value": 1,
				"possibleValues": []
			},
			{
				"parameter": "momentum",
				"value": 0.1,
				"possibleValues": []
			},
			{
				"parameter": "activationFunction",
				"value": 0.1,
				"possibleValues": []
			},
			{
				"parameter": "threshold",
				"value": 0.000001,
				"possibleValues": []
			}
		]
	}
};
