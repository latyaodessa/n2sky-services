import axios from "axios"

import {HOST_MODEL_REPO_SERVICE} from "../../restclient/abstract-rest-client"

import {
	TRAIN_NEURAL_NETWROK_FULFILLED,
	TRAIN_NEURAL_NETWROK_REJECTED,
	TEST_NEURAL_NETWROK_REJECTED,
	TEST_NEURAL_NETWROK_FULFILLED,
	SAVE_DESCRIPTION_FULFILLED,
	SAVE_DESCRIPTION_REJECTED,
	FETCH_DESCRIPTIONS_FULFILLED,
	FETCH_DESCRIPTIONS_REJECTED,
	FETCH_DESCRIPTION_BY_ID_FULFILLED,
	FETCH_DESCRIPTION_BY_ID_REJECTED,
	FETCH_MODELS_BY_DESC_ID_FULFILLED,
	FETCH_MODELS_BY_DESC_ID_REJECTED,
	FETCH_MODEL_BY_ID_FULFILLED,
	FETCH_MODEL_BY_ID_REJECTED
} from "../../constants/n2sky/n2sky-constants"


export function train(trainData) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "model/train", trainData)
			.then((res) => {
				dispatch({type: TRAIN_NEURAL_NETWROK_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: TRAIN_NEURAL_NETWROK_REJECTED, payload: err})
			})
	}
}

export function test(request) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "model/test", request)
			.then((res) => {
				dispatch({type: TEST_NEURAL_NETWROK_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: TEST_NEURAL_NETWROK_REJECTED, payload: err})
			})
	}
}

export function saveModelDescription(description) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "description/create", description)
			.then((res) => {
				dispatch({type: SAVE_DESCRIPTION_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: SAVE_DESCRIPTION_REJECTED, payload: err})
			})
	}
}

export function getDescriptions(reqParams, from, offsetSize) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "descriptions" + "/" + from + "/" + offsetSize;
	return function (dispatch) {
		return axios.post(endpoint, reqParams)
			.then((res) => {
				dispatch({type: FETCH_DESCRIPTIONS_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_DESCRIPTIONS_REJECTED, payload: err})
			})
	}
}

export function getAvailableDescriptions(from, offsetSize) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "descriptions/running/" + from + '/' + offsetSize;
	return function (dispatch) {
		return axios.post(endpoint, {})
			.then((res) => {
				dispatch({type: FETCH_DESCRIPTIONS_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_DESCRIPTIONS_REJECTED, payload: err})
			})
	}
}

export function getDescriptionById(id) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "description" + "/" + id;
	return function (dispatch) {
		return axios.get(endpoint)
			.then((res) => {
				dispatch({type: FETCH_DESCRIPTION_BY_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_DESCRIPTION_BY_ID_REJECTED, payload: err})
			})
	}
}

export function getModelsByDescriptionId(descriptionId) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "models" + "/" + descriptionId;
	return function (dispatch) {
		return axios.get(endpoint)
			.then((res) => {
				dispatch({type: FETCH_MODELS_BY_DESC_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_MODELS_BY_DESC_ID_REJECTED, payload: err})
			})
	}
}

export function getModelsById(modelId) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "models/id" + "/" + modelId;
	return function (dispatch) {
		return axios.get(endpoint)
			.then((res) => {
				dispatch({type: FETCH_MODEL_BY_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_MODEL_BY_ID_REJECTED, payload: err})
			})
	}
}


