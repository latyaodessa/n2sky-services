import React from 'react';
import {connect} from 'react-redux';
import {getOpenstackImages} from "../../../../actions/dashboard/openstack-actions"
import Loader from '../../../core/loader/loader'
import style from './style.scss'
import DownloadIcon from '../../../../../res/img/icons/download.svg'

@connect((store) => {
	return {
		openstackImages: store.openstackImages
	}
})
export default class ImagesDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackImages());
	}


	getImages() {
		return this.props.openstackImages.images.images.map(img => {
			return <div key={img.id} className="container-panel pure-u-1-3">
				<h1>{img.name}</h1>
				<ul>
					<li>Descripton: {img.description}</li>
					<li>ID: {img.id}</li>
					<li>Created at: {img.created_at}</li>
					<li>Container Format: {img.container_format}</li>
					<li>Disk Format: {img.disk_format}</li>
					<li>Size: {img.size}</li>
					<li>Status: {img.status}</li>
					<li>Visibility: {img.visibility}</li>
					<a className="button" role="button">
						<span>Download Image</span>
						<div className="icon">
							<img src={DownloadIcon}/>
						</div>
					</a>
				</ul>
			</div>
		})
	}

	render() {
		return (
			<div>
				{console.log(this.props)}
				{this.props.openstackImages.images ? this.getImages() : <Loader/>}
			</div>
		)
	}

}
