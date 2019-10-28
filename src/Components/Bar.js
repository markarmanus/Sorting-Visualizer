import React from "react"
import styled from "styled-components"

const maringPercentage = 0.1

const BarContainer = styled.div`
  width: ${props => props.width * (1 - maringPercentage)}%;
  background-color: ${props => props.color};
  margin-right: ${props => maringPercentage * props.width}%;
  height: ${props => props.height}%;
  display: inline-block;
`

export default class Bar extends React.Component {
  constructor(props) {
    super(props)
  }
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.height !== this.props.height ||
      nextProps.color !== this.props.color ||
      nextProps.newStart
    )
  }
  render() {
    return (
      <BarContainer
        color={this.props.color}
        width={this.props.width}
        height={this.props.height}
      ></BarContainer>
    )
  }
}
