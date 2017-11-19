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
				<div className="container-nn">
					<h1>{img.name}</h1>
					<ul>
						<li><span>Descripton:</span> {img.description}</li>
						<li><span>ID:</span> {img.id}</li>
						<li><span>Created at:</span> {img.created_at}</li>
						<li><span>Container Format:</span> {img.container_format}</li>
						<li><span>Disk Format:</span> {img.disk_format}</li>
						<li><span>Size:</span> {img.size}</li>
						<li><span>Status:</span> {img.status}</li>
						<li><span>Visibility:</span> {img.visibility}</li>
					</ul>
					<a className="button" role="button">
						<span>Download Image</span>
						<div className="icon">
							<img src={DownloadIcon}/>
						</div>
					</a>
				</div>
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
