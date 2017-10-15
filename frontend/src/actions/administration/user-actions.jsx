import axios from "axios"

import {HOST_USER_SERVICE} from "../../restclient/abstract-rest-client"

import {LOGIN_FULFILLED, LOGIN_REJECTED} from "../../constants/administration/user-constants"


export function login(userData) {
	console.log(userData);
	console.log(HOST_USER_SERVICE + "login");

	return function (dispatch) {
		return axios.post(HOST_USER_SERVICE + "login", userData)
			.then((res) => {
				dispatch({type: LOGIN_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: LOGIN_REJECTED, payload: err})
			})
	}
}
