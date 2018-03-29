import React from 'react'
import Box from './Box'
import './Grid.css'

export default class Grid extends React.Component {
	render() {
		const { rows, cols, gridData } = this.props
		const dimension = {
			height: `${rows * 14}px`,
			width: `${cols * 14}px`
		}
		let boxes = []
		gridData.forEach((rowData, rIndex) => {
			boxes.push(
				rowData.map((data, cIndex) => {
					return (
						<div key={`${rIndex}-${cIndex}`}>
							<Box id={`${rIndex}-${cIndex}`} alive={data} />
						</div>
					)
				})
			)
		})
		return (
			<div className="Grid" style={dimension}>
				{boxes}
			</div>
		)
	}
}
