import axios from "axios"

import {HOST_NEURAL_NETWORK, HOST_MODEL_REPO_SERVICE} from "../../restclient/abstract-rest-client"

import {
	TRAIN_NEURAL_NETWROK_FULFILLED,
	TRAIN_NEURAL_NETWROK_REJECTED,
	SAVE_DESCRIPTION_FULFILLED,
	SAVE_DESCRIPTION_REJECTED,
	FETCH_DESCRIPTIONS_FULFILLED,
	FETCH_DESCRIPTIONS_REJECTED,
	FETCH_DESCRIPTION_BY_ID_FULFILLED,
	FETCH_DESCRIPTION_BY_ID_REJECTED
} from "../../constants/n2sky/n2sky-constants"


export function train(trainData) {
	return function (dispatch) {
		return axios.post(HOST_NEURAL_NETWORK + "train", trainData)
			.then((res) => {
				dispatch({type: TRAIN_NEURAL_NETWROK_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: TRAIN_NEURAL_NETWROK_REJECTED, payload: err})
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

export function getDescriptions(user, userType) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "descriptions" + "/" + user + "/" + userType;
	return function (dispatch) {
		return axios.get(endpoint)
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

