import React from 'react'
import './Box.css'
export default class Box extends React.Component {
	render() {
		const { id, alive } = this.props
		return <div className={alive ? 'Box BoxAlive' : 'Box'} id={id} />
	}
}
