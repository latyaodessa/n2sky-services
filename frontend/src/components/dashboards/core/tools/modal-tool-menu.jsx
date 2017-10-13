import React from 'react'
import style from './style.scss'


export default class ModalToolMenu extends React.Component {

	constructor(props) {
		super(props);
		console.log("im alive");
	}

	render() {
		return (<div>
			<div className='menu-tool'>
				<div className='messages button-tool'/>
				<div className='music button-tool'/>
				<div className='home button-tool'/>
				<div className='places button-tool'/>
				<div className='bookmark button-tool'/>
				<div className='main button-tool'>Menu</div>
			</div>
		</div>)
	}
}


