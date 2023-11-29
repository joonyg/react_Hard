import React from 'react'
import styled from 'styled-components'
import t1img from '../assets/imgs/T1logo.jpg'

export default function footer() {
  return (
    <FooterContainer>
      <img src={t1img} alt="t1 logo footer"></img>
    </FooterContainer>
  )
}

const FooterContainer = styled.header`
  background-color: black;
  font-family: 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  padding: 20px;
`
