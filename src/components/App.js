import React, { Component } from 'react'
import './App.css'
import Grid from './Grid'

class App extends Component {
	constructor(props) {
		super(props)
		this.rows = 30
		this.cols = 30
		this.playSpeed = 250
		this.state = {
			generation: 0,
			gridData: Array(this.rows)
				.fill()
				.map(row => Array(this.cols).fill())
		}
	}

	seeding() {
		let gridCopy = [...this.state.gridData]
		gridCopy = gridCopy.map((rowData, rIndex) =>
			rowData.map((cell, cIndex) => {
				const isAlive = Math.floor(Math.random() * 4) === 1 ? true : false
				return isAlive ? 1 : 0
			})
		)
		this.setState({
			gridData: gridCopy
		})
	}

	initGame(playSpeed) {
		clearInterval(this.intervalId)
		this.intervalId = setInterval(() => {
			this.liveOrDie()
		}, playSpeed)
	}

	liveOrDie() {
		const gridCopy = this.state.gridData.map((rowData, xIndex) => {
			return rowData.map((state, yIndex) => {
				if (xIndex === 0 || xIndex === this.rows - 1 || yIndex === 0 || yIndex === this.cols - 1) {
					return state
				}
				if (state && this.countNeighbor(this.state.gridData, xIndex, yIndex) < 2) return 0
				if (state && this.countNeighbor(this.state.gridData, xIndex, yIndex) > 3) return 0
				if (!state && this.countNeighbor(this.state.gridData, xIndex, yIndex) === 3) return 1
				return state
			})
		})
		this.setState({
			gridData: gridCopy,
			generation: this.state.generation + 1
		})
	}
	changeSpeed(speed) {
		this.initGame(speed)
	}
	countNeighbor(grid, x, y) {
		let count = 0
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				count = grid[x + i][y + j] ? count + 1 : count
			}
		}
		return count - grid[x][y]
	}
	componentDidMount() {
		this.seeding()
		this.initGame(this.playSpeed)
	}
	render() {
		// console.table(this.state.gridData)
		return (
			<div className="App">
				<header>
					<h2>Game of Life by Me</h2>
				</header>
				<aside>
					<h6>Current Generation: {this.state.generation}</h6>
					<div style={{ padding: '10px 10px' }}>
						<label>play speed: </label>
						<button onClick={() => this.changeSpeed(250)}>Normal</button>
						<button onClick={() => this.changeSpeed(125)}>2 x Speed</button>
						<button onClick={() => this.changeSpeed(75)}>3 x Speed</button>
					</div>
				</aside>
				<main className="centerGrid">
					<Grid rows={this.rows} cols={this.cols} gridData={this.state.gridData} />
				</main>
			</div>
		)
	}
}

export default App
