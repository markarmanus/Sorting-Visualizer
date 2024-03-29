import React from "react"
import styled from "styled-components"
import { Typography, Button } from "antd"

const Container = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 150px;
  background-color: #1b2a41;
  justify-content: center;
  display: flex;
  align-items: center;
`
const CenterContainer = styled.div`
  display: inline-grid;
  justify-items: center;
`
const StyledText = styled(Typography.Text)`
  color: white !important;
`
const StyledButton = styled(Button)`
  display: block;
  border: 0 !important;
`
export default function Footer() {
  return (
    <Container>
      <CenterContainer>
        <StyledText>Made By Mark Armanious © 2019</StyledText>
        <StyledButton
          href={"https://github.com/markarmanus/Sorting-Visualizer"}
          target={"_blank"}
          shape={"circle"}
          ghost={true}
          icon={"github"}
        ></StyledButton>
      </CenterContainer>
    </Container>
  )
}
