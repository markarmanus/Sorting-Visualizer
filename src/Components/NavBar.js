import React, { Component } from "react"
import styled from "styled-components"
import { Slider, Button, Typography, Select } from "antd"
import "antd/dist/antd.css"
import { CONF } from "../Contstants/Conf"

const Container = styled.div`
  vertical-align: middle;
  display: flex;
  align-items: center;
  background-color: #1b2a41;
`

const CenterFlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  flex-grow: 1;
  @media (max-width: ${CONF.BREAK_POINT_SMALL_SCREEN}) {
    display: grid;
  }
`
const StyledButton = styled(Button)`
  margin: 10px 5%;
  width: 40%;
  @media (max-width: ${CONF.BREAK_POINT_SMALL_SCREEN}) {
    width: 100%;
  }
`

const Left = styled(CenterFlexBox)`
  align-self: flex-start;
  padding-left: 10px;
`
const Center = styled(CenterFlexBox)`
  align-self: center;
  flex-grow: 3;
  @media (max-width: ${CONF.BREAK_POINT_SMALL_SCREEN}) {
    display: contents;
  }
`

const Right = styled(CenterFlexBox)`
  align-self: flex-end;
  padding-right: 10px;
`
const StyledSlider = styled(Slider)`
  width: 100%;
  display: inline-block;
  min-width: 50px;
`
const Label = styled(Typography.Text)`
  color: white !important;
  margin-left: 6px;
  display: inline-block;
`

const Title = styled(Typography.Title)`
  color: white !important;
  display: inline-block;
  font-size: 2vw !important;
  text-align: center;
  @media (max-width: ${CONF.BREAK_POINT_SMALL_SCREEN}) {
    display: none;
  }
  @media (min-width: ${CONF.BREAK_POINT_FULL_HD_SCREEN}) {
    font-size: 40px !important;
  }
  margin: 0 5px !important;
`
const StyledSelector = styled(Select)`
  width: 50%;
  margin: 10px 5% !important;

  @media (max-width: ${CONF.BREAK_POINT_SMALL_SCREEN}) {
    width: 100%;
  }
`
const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 35%;
  align-items: center;
`
export default class NavBar extends Component {
  render() {
    return (
      <Container>
        <Left>
          <StyledButton onClick={this.props.onClickSort} type="primary">
            Sort
          </StyledButton>
          <StyledButton onClick={this.props.onClickResetart} type="secondary">
            Resetart
          </StyledButton>
        </Left>
        <Center>
          <SliderContainer>
            <Label>Size</Label>
            <StyledSlider
              tooltipPlacement={"right"}
              defaultValue={CONF.DEFAULT_START_SIZE}
              onAfterChange={this.props.onChangeSize}
              max={CONF.MAX_ARRAY_SIZE}
              min={CONF.MIN_ARRAY_SIZE}
            />
          </SliderContainer>
          <Title>Sorting Visualizer</Title>
          <SliderContainer>
            <Label>Speed</Label>
            <StyledSlider
              tooltipPlacement={"right"}
              defaultValue={CONF.DEFAULT_SPEED}
              onAfterChange={this.props.onChangeSpeed}
              tipFormatter={value => value + "x"}
              tool
              max={CONF.MAX_SPEED}
              min={CONF.MIN_SPEED}
            />
          </SliderContainer>
        </Center>
        <Right>
          <StyledSelector
            disabled={this.props.inProgress}
            onChange={this.props.onSelectAlgorthim}
            styled={{ width: "100%" }}
            defaultValue={CONF.DEFAULT_ALGORTHIM}
          >
            <Select.Option value="Selection Sort">Selection Sort</Select.Option>
            <Select.Option value="Bubble Sort">Bubble Sort</Select.Option>
            <Select.Option value="Insertion Sort">Insertion Sort</Select.Option>
          </StyledSelector>
          <StyledButton onClick={this.props.onClickNewArray} type="secondary">
            New Array
          </StyledButton>
        </Right>
      </Container>
    )
  }
}
