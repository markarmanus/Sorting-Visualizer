import React from "react"

const marginPercentage = 0.1

export default class Bar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.height !== this.props.height ||
      nextProps.color !== this.props.color ||
      nextProps.newStart
    )
  }

  render() {
    return (
      <div
        //Using in line styling to avoid creating Multiple css classes.
        style={{
          width: `${this.props.width * (1 - marginPercentage)}%`,
          backgroundColor: `${this.props.color}`,
          marginRight: `${this.props.width * marginPercentage}%`,
          height: `${this.props.height}%`,
          display: "inline-block"
        }}
        color={this.props.color}
        width={this.props.width}
        height={this.props.height}
      ></div>
    )
  }
}
