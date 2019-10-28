import React from "react"
import Visualizer from "./Visualizer"
import styled from "styled-components"
import { generateArray, waitFor } from "./HelperFunctions"
const VisualizerContainer = styled.div`
  width: 100%;
  height: 100%;
  top: 10%;
  left: 0;
  position: absolute;
`
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: generateArray(10),
      comparing: [],
      pivot: null,
      inFinalPosition: [],
      doneSotring: false,
      inProgress: false,
      switching: [],
      speed: 1,
      newStart: true,
      selectedAlgorthim: "Bubble Sort"
    }
    this.startSearch = this.startSearch.bind(this)
    this.onClickSort = this.onClickSort.bind(this)
    this.BuubleSort = this.BuubleSort.bind(this)
    this.reset = this.reset.bind(this)
  }

  async onClickSort() {
    if (this.state.inProgress) return
    this.setState(
      {
        newStart: false,
        doneSotring: false,
        inProgress: true
      },
      () => this.startSearch()
    )
  }
  async startSearch() {
    switch (this.state.selectedAlgorthim) {
      case "Bubble Sort":
        await this.BuubleSort()
        break
      case "Quick Sort":
        break
      default:
        break
    }
    this.setState({
      doneSotring: true,
      comparing: [],
      switching: []
    })
  }

  reset() {
    this.setState({
      newStart: true,
      values: generateArray(50),
      comparing: [],
      switching: [],
      inProgress: false,
      inFinalPosition: [],
      doneSotring: false
    })
  }

  async BuubleSort() {
    let tempCopy = this.state.values
    for (let x = this.state.values.length - 1; x > 0; x--) {
      for (let i = 0; i < x; i++) {
        if (this.state.newStart) return
        this.setState({
          comparing: [i, i + 1]
        })
        await waitFor(this.state.speed)
        if (tempCopy[i] > tempCopy[i + 1]) {
          this.setState({
            switching: [i, i + 1]
          })
          await waitFor(this.state.speed)
          let temp = tempCopy[i]
          tempCopy[i] = tempCopy[i + 1]
          tempCopy[i + 1] = temp
          this.setState({
            values: tempCopy
          })
          await waitFor(this.state.speed)
          this.setState({
            switching: []
          })
          await waitFor(this.state.speed)
        }
      }
      let temp = this.state.inFinalPosition
      temp.push(x)
      this.setState({
        inFinalPosition: temp
      })
      await waitFor(this.state.speed)
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickSort}>click me</button>
        <button onClick={this.reset}>reset</button>
        <VisualizerContainer>
          <Visualizer
            comparing={this.state.comparing}
            switching={this.state.switching}
            newStart={this.state.newStart}
            done={this.state.doneSotring}
            pivot={this.state.pivot}
            inFinalPosition={this.state.inFinalPosition}
            values={this.state.values}
          ></Visualizer>
        </VisualizerContainer>
      </div>
    )
  }
}
