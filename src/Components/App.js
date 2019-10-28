import React from "react"
import Visualizer from "./Visualizer"
import styled from "styled-components"
import { generateArray } from "../HelperFunctions"
import { BuubleSort } from "../SearchAlgorthims"
import NavBar from "./NavBar"
import { CONF } from "../Contstants/Conf"
const VisualizerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`

export default class App extends React.Component {
  constructor(props) {
    super(props)
    const values = generateArray(CONF.DEFAULT_START_SIZE)
    this.state = {
      values: values,
      originalValues: values.slice(),
      comparing: [],
      pivot: null,
      size: CONF.DEFAULT_START_SIZE,
      inFinalPosition: [],
      doneSotring: false,
      inProgress: false,
      switching: [],
      speed: CONF.DEFAULT_SPEED,
      newStart: true,
      selectedAlgorthim: "Bubble Sort"
    }
    this.startSearch = this.startSearch.bind(this)
    this.onClickSort = this.onClickSort.bind(this)
    this.resetValues = this.resetValues.bind(this)
    this.onChangeSize = this.onChangeSize.bind(this)
    this.onChangeSpeed = this.onChangeSpeed.bind(this)
    this.onClickResetart = this.onClickResetart.bind(this)
    this.onClickNewArray = this.onClickNewArray.bind(this)
    this.onSelectAlgorthim = this.onSelectAlgorthim.bind(this)
  }

  async onClickSort() {
    if (this.state.inProgress) return
    if (this.state.doneSotring) this.onClickResetart()
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
    // to fix a bug where restart finished before this runs.
    if (!this.state.newStart) {
      this.setState({
        doneSotring: true,
        inProgress: false,
        comparing: [],
        switching: []
      })
    }
  }

  resetValues(setValuesTo) {
    this.setState({
      newStart: true,
      comparing: [],
      values: setValuesTo,
      originalValues: setValuesTo.slice(),
      switching: [],
      inProgress: false,
      inFinalPosition: [],
      doneSotring: false
    })
  }

  onClickResetart() {
    this.resetValues(this.state.originalValues)
  }

  onSelectAlgorthim(algorthim) {
    this.setState({
      selectedAlgorthim: algorthim
    })
  }

  onChangeSpeed(speed) {
    this.setState({
      speed: 500 - speed
    })
  }

  onChangeSize(size) {
    let newArray = generateArray(size)
    this.resetValues(newArray)
    this.setState({ size: size })
  }

  onClickNewArray() {
    this.resetValues(generateArray(this.state.size))
  }
  render() {
    return (
      <div>
        <NavBar
          onChangeSize={this.onChangeSize}
          onChangeSpeed={this.onChangeSpeed}
          onClickSort={this.onClickSort}
          onClickNewArray={this.onClickNewArray}
          onClickResetart={this.onClickResetart}
          onSelectAlgorthim={this.onSelectAlgorthim}
        ></NavBar>
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
