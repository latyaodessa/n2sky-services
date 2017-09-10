import axios from "axios"

import {MONITORING_API} from "../../restclient/abstract-rest-client"

import {
	FETCH_MONITORING_DATA_FULFILLED,
	FETCH_MONITORING_DATA_REJECTED
} from "../../constants/dashboard/monitoring-constants"

export function getMonitoringData(m) {
	return function (dispatch) {
		let monitoringEndpoint = [MONITORING_API, m.metric, m.delay, m.delaytype, m.step].join('/');
		axios.get(monitoringEndpoint)
				.then((res) => {
					dispatch({type: m.metric + '/'+ FETCH_MONITORING_DATA_FULFILLED, payload: res.data})
				})
				.catch((err) => {
					dispatch({type: m.metric + '/' + FETCH_MONITORING_DATA_REJECTED, payload: err})
				})
		}
}
