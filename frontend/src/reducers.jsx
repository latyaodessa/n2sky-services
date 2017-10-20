import {combineReducers} from "redux"
import openstackProjectsReducer from './reducers/dashboard/openstack/openstack-projects-reducer'
import openstackProjectByIdReducer from './reducers/dashboard/openstack/openstack-prokect-by-id-reducer'
import flavor from './reducers/dashboard/openstack/flavor-reducer'
import openstackServers from './reducers/dashboard/openstack/server-reducer'
import monitoring from './reducers/dashboard/openstack/monitoring-reducer'
import openstackServerDetails from './reducers/dashboard/openstack/server-details-reducer'
import openstackUserConfig from './reducers/dashboard/openstack/openstack-user-config'
import openstackMonitoringConfig from './reducers/dashboard/openstack/openstack-monitoring-config'
import serverDetails from './reducers/dashboard/openstack/server-by-id-reducer'
import removeOpenstackMonitoring from './reducers/dashboard/openstack/openstack-remove-monitoring'
import openstackNeutron from './reducers/dashboard/openstack/openstack-neutron-reducer'
import openstackImages from './reducers/dashboard/openstack/openstack-images-reducer'
import openstackVitrage from './reducers/dashboard/openstack/openstack-templates-reducer'

import login from './reducers/administration/login-reducer'
import reg from './reducers/administration/reg-reducer'





export default combineReducers({
	openstackProjectsReducer,
	openstackProjectByIdReducer,
	flavor,
	openstackServers,
	monitoring,
	openstackUserConfig,
	openstackMonitoringConfig,
	openstackServerDetails,
	serverDetails,
	removeOpenstackMonitoring,
	openstackNeutron,
	openstackImages,
	openstackVitrage,
	login,
	reg
});
