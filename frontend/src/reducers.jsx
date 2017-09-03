import {combineReducers} from "redux"
import openstackProjectsReducer from './reducers/dashboard/openstack/openstack-projects-reducer'
import openstackProjectByIdReducer from './reducers/dashboard/openstack/openstack-prokect-by-id-reducer'
import flavor from './reducers/dashboard/openstack/flavor-reducer'

export default combineReducers({
	openstackProjectsReducer,
	openstackProjectByIdReducer,
	flavor
});
