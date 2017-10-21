'use strict';

import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link, browserHistory} from 'react-router'
import {Provider} from "react-redux"
import store from "./store"
import style from './../styles/index.scss'

import AbstractDashboardLayout from './layouts/dashboards/abstract-dashboard-layout'

import Auth from './components/auth/auth'
import Reg from './components/auth/registration'
import UserProfile from './components/auth/user-profile'
import DashboardsOverview from './components/dashboards/dashbpards-overview'
import OpenStackMainDashboard from './components/dashboards/openstack/openstack-main-dashboard'
import N2SkyDashboard from './components/dashboards/n2sky/n2sky-main-dashboard'
import OpenStackProjectDashboard from './components/dashboards/openstack/openstack-project-dashboard'
import ServerDetailsDashboard from './components/dashboards/openstack/boards/server-details-dashlet'
import VitrageDetailsView from './components/dashboards/openstack/boards/vitrage-details-view'


render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Auth}/>
			<Route path="/signup" component={Reg}/>
			<Route component={AbstractDashboardLayout}>
				<Route path="/user/profile" component={UserProfile}/>
				<Route path="/overview" component={DashboardsOverview}/>
				<Route path="/openstack" component={OpenStackMainDashboard}/>
				<Route path="/openstack/project/:id" component={OpenStackProjectDashboard}/>
				<Route path="/openstack/server/:projectid/:serverid" component={ServerDetailsDashboard}/>
				<Route path="/openstack/vitrage/:templateId" component={VitrageDetailsView}/>

				<Route path="/n2sky" component={N2SkyDashboard}/>
			</Route>
		</Router>
	</Provider>
), document.getElementById('app'));
