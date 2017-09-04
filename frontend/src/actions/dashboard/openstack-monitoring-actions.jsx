import axios from "axios"

import {GET_PROJECTS} from "../../restclient/dashboard/openstack-rest-client"
import {HOST} from "../../restclient/abstract-rest-client"

import {
	FETCH_MONITOR_FULFILLED,
	FETCH_SERVER_REJECTED
} from "../../constants/dashboard/openstack-constants"

export function getMonitoringData() {
	return function (dispatch) {
		axios.get(GET_PROJECTS)
			.then((res) => {
				dispatch({type: FETCH_MONITOR_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_SERVER_REJECTED, payload: err})
			})
	}
}
