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
	"executionEnvironment": {
		"isRunning": false,
		"isPublic": false,
		"hardware": null,
		"lastRun": null
	},
	"problemDomain": {
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
		"networkType": "Backpropagation"
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
					"from": null,
					"to": null
				}]
			}
		}
	},
	"parameters": {
		"input": [{
			"parameter": "learningrate",
			"defaultValue": 0.4,
			"possibleValues": ["0.1", "0.2", "0.3", "0.4"]
		},
			{
				"parameter": "biaInput",
				"defaultValue": 1,
				"possibleValues": []
			},
			{
				"parameter": "biasHidden",
				"defaultValue": 1,
				"possibleValues": []
			},
			{
				"parameter": "momentum",
				"defaultValue": 0.1,
				"possibleValues": []
			},
			{
				"parameter": "activationFunction",
				"defaultValue": 0.1,
				"possibleValues": []
			},
			{
				"parameter": "threshold",
				"defaultValue": 0.000001,
				"possibleValues": []
			}
		]
	},
	data: {
		description: "CSV, comma separated",
		tableDescription: ",",
		fileDescription: "CSV"
	}
};
