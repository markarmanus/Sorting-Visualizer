import React from "react"
import Container from "./Container"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: this.generateArray(10),
      comparing: [],
      done: false,
      inProgress: false,
      switching: [],
      speed: 0,
      newStart: true,
      selectedAlgorthim: "Bubble Sort"
    }
    this.search = this.search.bind(this)
    this.reset = this.reset.bind(this)
  }

  generateArray(length) {
    // Plus one to avoid 0 values
    return Array.from({ length: length }, () => Math.random() * 100)
  }

  async waitFor(time) {
    await new Promise(resolve => setTimeout(resolve, time))
  }

  async search() {
    if (this.state.inProgress) return
    await this.setState({ newStart: false, done: false, inProgress: true })
    let tempCopy = this.state.values
    switch (this.state.selectedAlgorthim) {
      case "Bubble Sort":
        for (let x = this.state.values.length - 1; x > 0; x--) {
          for (let i = 0; i < x; i++) {
            if (this.state.newStart) return
            this.setState({
              comparing: [i, i + 1]
            })
            await this.waitFor(this.state.speed)
            if (tempCopy[i] > tempCopy[i + 1]) {
              this.setState({
                switching: [i, i + 1]
              })
              await this.waitFor(this.state.speed)
              let temp = tempCopy[i]
              tempCopy[i] = tempCopy[i + 1]
              tempCopy[i + 1] = temp
              this.setState({
                values: tempCopy
              })
              await this.waitFor(this.state.speed)
              this.setState({
                switching: []
              })
              await this.waitFor(this.state.speed)
            }
          }
        }
        break
      default:
        break
    }
    this.setState({
      done: true,
      comparing: [],
      switching: []
    })
  }

  reset() {
    this.setState({
      newStart: true,
      values: this.generateArray(50),
      comparing: [],
      switching: [],
      inProgress: false,
      done: false
    })
  }
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          position: "absolute"
        }}
      >
        <button onClick={this.search}>click me</button>
        <button onClick={this.reset}>reset</button>

        <Container
          comparing={this.state.comparing}
          switching={this.state.switching}
          newStart={this.state.newStart}
          done={this.state.done}
          values={this.state.values}
        ></Container>
      </div>
    )
  }
}
