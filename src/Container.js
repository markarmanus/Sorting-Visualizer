import React from "react"
import styled from "styled-components"
import Bar from "./Bar.js"

export default class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      multiplexor: this.calculateNormalizer(props),
      barWidth: this.calculateBarWidth(props)
    }
  }
  calculateNormalizer(props) {
    if (props.newStart) {
      let maxSoFar = 0
      props.values.forEach(value => {
        maxSoFar = value > maxSoFar ? value : maxSoFar
      })
      return window.innerHeight / 1.5 / maxSoFar
    } else {
      return 1
    }
  }
  calculateBarWidth(props) {
    if (props.newStart) {
      return Math.floor(window.innerWidth / 2 / props.values.length) == 0
        ? 1
        : Math.floor(window.innerWidth / 2 / props.values.length)
    }
  }

  render() {
    return (
      <div style={{ height: window.innerHeight / 1.5 }}>
        {this.props.values.map((value, index) => (
          <Bar
            color={
              this.props.switching.includes(index)
                ? "red"
                : this.props.comparing.includes(index)
                ? "blue"
                : "black"
            }
            key={index}
            width={this.state.barWidth}
            height={Math.floor(value * this.state.multiplexor)}
            newStart={this.props.newStart}
          ></Bar>
        ))}
      </div>
    )
  }
}
