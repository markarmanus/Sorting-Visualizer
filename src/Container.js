import React from "react"
import styled from "styled-components"
import Bar from "./Bar.js"

export default class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      multiplexor: 0,
      barWidth: 0
    }
    this.calculateBarWidth = this.calculateBarWidth.bind(this)
    this.calculateNormalizer = this.calculateNormalizer.bind(this)
  }

  calculateNormalizer(values) {
    let maxSoFar = 0
    values.forEach(value => {
      maxSoFar = value > maxSoFar ? value : maxSoFar
    })
    this.setState({ multiplexor: window.innerHeight / 1.5 / maxSoFar })
  }

  calculateBarWidth(values) {
    Math.floor(window.innerWidth / 2 / values.length) == 0
      ? this.setState({ barWidth: 1 })
      : this.setState({
          barWidth: Math.floor(window.innerWidth / 2 / values.length)
        })
  }
  getColor(index) {
    return this.props.done
      ? "purple"
      : this.props.switching.includes(index)
      ? "red"
      : this.props.comparing.includes(index)
      ? "green"
      : "black"
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newStart) {
      this.calculateNormalizer(nextProps.values)
      this.calculateBarWidth(nextProps.values)
    }
  }
  componentWillMount() {
    this.calculateNormalizer(this.props.values)
    this.calculateBarWidth(this.props.values)
  }
  render() {
    return (
      <div>
        {this.props.values.map((value, index) => (
          <Bar
            color={this.getColor(index)}
            key={index}
            width={this.state.barWidth}
            height={value * this.state.multiplexor}
            newStart={this.props.newStart}
          ></Bar>
        ))}
      </div>
    )
  }
}
