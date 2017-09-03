import axios from "axios"

import {GET_PROJECTS} from "../../restclient/dashboard/openstack-rest-client"
import {HOST} from "../../restclient/abstract-rest-client"

import {
	FETCH_OPENSTACK_PROJECTS_FULFILLED,
	FETCH_OPENSTACK_PROJECTS_REJECTED,
	FETCH_OPENSTACK_PROJECT_BY_ID_FULFILLED,
	FETCH_OPENSTACK_PROJECT_BY_ID_REJECTED,
	FETCH_FLAVOR_FULFILLED,
	FETCH_FLAVOR_REJECTED
} from "../../constants/dashboard/openstack-constants"

export function getOpenstackProjects() {
	return function (dispatch) {
		axios.get(GET_PROJECTS)
			.then((res) => {
				dispatch({type: FETCH_OPENSTACK_PROJECTS_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_OPENSTACK_PROJECTS_REJECTED, payload: err})
			})
	}
}

export function getOpenstackProjectById(id) {
	return function (dispatch) {
		axios.get(GET_PROJECTS + '/' + id)
			.then((res) => {
				dispatch({type: FETCH_OPENSTACK_PROJECT_BY_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_OPENSTACK_PROJECT_BY_ID_REJECTED, payload: err})
			})
	}
}

export function getOpenstackFlavor(id) {
	return function (dispatch) {
		axios.get(HOST + '/flavors/' + id)
			.then((res) => {
				dispatch({type: FETCH_FLAVOR_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_FLAVOR_REJECTED, payload: err})
			})
	}
}
