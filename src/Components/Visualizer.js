import React from "react"
import styled from "styled-components"
import Bar from "./Bar.js"
import { COLORS } from "../Contstants/Colors"

const Main = styled.div`
  display: flex;
  height: 50%;
  width: 60%;
  margin: auto;
`

export default class Visualizer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      multiplexor: 0,
      barWidth: 0
    }
  }

  static calculateNormalizer(values) {
    let maxSoFar = 0
    values.forEach(value => {
      maxSoFar = value > maxSoFar ? value : maxSoFar
    })
    return 100 / maxSoFar
  }

  getColor(index) {
    return this.props.done || this.props.inFinalPosition.includes(index)
      ? COLORS.IN_POSITION
      : this.props.switching.includes(index)
      ? COLORS.SWITCHING
      : this.props.pivot.includes(index)
      ? COLORS.PIVOT
      : this.props.comparing.includes(index)
      ? COLORS.COMPARING
      : this.props.alternative.includes(index)
      ? COLORS.ALTERNATIVE
      : COLORS.NONE
  }

  static getDerivedStateFromProps(props) {
    if (props.newStart) {
      return {
        barWidth: Math.max(100 / props.values.length, 0.001),
        multiplexor: Visualizer.calculateNormalizer(props.values)
      }
    }
    return null
  }

  render() {
    return (
      <Main>
        {this.props.values.map((value, index) => (
          <Bar
            color={this.getColor(index)}
            key={index}
            width={this.state.barWidth}
            height={value * this.state.multiplexor}
            newStart={this.props.newStart}
          ></Bar>
        ))}
      </Main>
    )
  }
}
