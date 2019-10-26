import React from "react"
import Container from "./Container"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: this.generateArray(100),
      selected: 0,
      comparing: [0, 3],
      newStart: true,
      selectedAlgorthim: "Bubble Sort"
    }
  }
  generateArray(length) {
    return Array.from({ length: length }, () =>
      Math.floor(Math.random() * 100 + 1)
    )
  }
  searchIteration() {}
  componentDidMount() {
    this.setState({
      newStart: false
    })
  }
  nextStep() {}
  render() {
    return (
      <div>
        <Container
          selected={this.state.selected}
          comparing={[0, 3]}
          switching={[1, 4]}
          newStart={this.state.newStart}
          values={this.state.values}
        ></Container>
      </div>
    )
  }
}
