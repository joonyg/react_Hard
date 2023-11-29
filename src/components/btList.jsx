import React from 'react'
import styled from 'styled-components'

export default function Context(props) {
  const selectPlayer = name => {
    props.setSelectedPlayer(name)
  }

  return (
    <>
      <PlayerBTcontainer>
        <PlayerUI>
          <PlayerBT onClick={() => selectPlayer('Zeus')}>ZEUS</PlayerBT>
          <PlayerBT onClick={() => selectPlayer('Oner')}>ONER</PlayerBT>
          <PlayerBT onClick={() => selectPlayer('Faker')}>FAKER</PlayerBT>
          <PlayerBT onClick={() => selectPlayer('Guma')}>GUMAYUSI</PlayerBT>
          <PlayerBT onClick={() => selectPlayer('Keria')}>KERIA</PlayerBT>
        </PlayerUI>
      </PlayerBTcontainer>
    </>
  )
}
const PlayerUI = styled.nav`
  color: black;
`
const PlayerBT = styled.button`
  margin: 4px;
  width: 90px;
  height: 40px;
  text-align: center;
  font-weight: bold;
  display: inline-block;
  border-radius: 10px;
  &:hover {
    background-color: red;
  }
  &:active {
    background-color: red;
  }
  &:focus {
    box-shadow: 0 0 0 3px red;
  }
`

const PlayerBTcontainer = styled.div`
  padding-bottom: 10px;
  background-color: black;
  display: flex;
  justify-content: center;
`
