import React from 'react';
import {connect} from 'react-redux'
import {
	getDescriptionById,
	getModelsByDescriptionId,
} from '../../../../actions/n2sky/neural-network-actions'
import Loader from './../../../core/loader/loader'

import DetailsNavbar from './details-subcomponents/details-navbar'
import DetailsNavbarInstances from './details-subcomponents/details-navbar-instances'
import DetailsModelsTable from './details-subcomponents/details-models-tabel'
import DetailsContent from './details-subcomponents/details-content'

@connect((store) => {
	return {
		descriptionById: store.descriptionById.description,
		modelsByDescId: store.modelsByDescId.models
	}
})
export default class NetworkDetails extends React.Component {


	constructor(props) {
		super(props);
		this.props.dispatch(getDescriptionById(this.props.params.id));
		this.props.dispatch(getModelsByDescriptionId(this.props.params.id))
	}


	render() {
		return (
			<div>
				{this.props.descriptionById ? <DetailsNavbar descriptionById={this.props.descriptionById}/> : null}
				{this.props.descriptionById ? <DetailsContent descriptionById={this.props.descriptionById}/> : <Loader/>}
				{this.props.descriptionById ? <DetailsNavbarInstances descriptionById={this.props.descriptionById}/> : null}
				{this.props.modelsByDescId ? <DetailsModelsTable modelsByDescId={this.props.modelsByDescId}/> : <Loader/>}

			</div>
		)
	}
}

