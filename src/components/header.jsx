import React from 'react'
import styled from 'styled-components'
import t1img from '../assets/imgs/t1.webp'

export default function header() {
  return (
    <HeaderContainer>
      <img src={t1img} alt="Header Image" />
      <Title>
        <Teamlogo>T1</Teamlogo>fan letter
      </Title>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  background-color: black;
  font-family: 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  padding: 20px;
`

const Title = styled.h1`
  color: white;
`

const Teamlogo = styled.h1`
  color: red;
`
