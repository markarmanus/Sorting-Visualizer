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
    this.calculateBarWidth = this.calculateBarWidth.bind(this)
    this.calculateNormalizer = this.calculateNormalizer.bind(this)
  }

  calculateNormalizer(values) {
    let maxSoFar = 0
    values.forEach(value => {
      maxSoFar = value > maxSoFar ? value : maxSoFar
    })
    this.setState({ multiplexor: 100 / maxSoFar })
  }

  calculateBarWidth(values) {
    // to avoid negative values in case of really hight lengths.
    this.setState({
      barWidth: Math.max(100 / values.length, 0.001)
    })
  }
  getColor(index) {
    return this.props.done || this.props.inFinalPosition.includes(index)
      ? COLORS.IN_POSITION
      : this.props.pivot == index
      ? COLORS.PIVOT
      : this.props.switching.includes(index)
      ? COLORS.SWITCHING
      : this.props.comparing.includes(index)
      ? COLORS.COMPARING
      : COLORS.NONE
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
