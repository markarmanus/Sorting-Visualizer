import React from "react"
import Visualizer from "./Visualizer"
import styled from "styled-components"
import { generateArray, waitFor } from "../HelperFunctions"
import { BuubleSort } from "../SearchAlgorthims"
import NavBar from "./NavBar"
const VisualizerContainer = styled.div`
  width: 100%;
  height: 100%;
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
        await BuubleSort(this)
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

  render() {
    return (
      <div>
        <NavBar></NavBar>
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
