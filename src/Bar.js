import React from "react"
import styled from "styled-components"

const BarContainer = styled.div`
  width: ${props => props.width}px;
  background-color: ${props => props.color};
  margin: ${props => (props.width == 1 ? 0 : 1)}px;
  height: ${props => props.height}px;
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
