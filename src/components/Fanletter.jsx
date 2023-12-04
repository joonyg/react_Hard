import React from 'react'
import styled from 'styled-components'
import Normalimg from '../assets/imgs/normalimage.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/hooks/useSelector'
import api from '../axios/api'
import { fetchLetters } from '../redux/modules/letter'
export default function Fanletter({ selectedPlayer }) {
  const navigate = useNavigate()
  const Letter = useSelector(state => state.letters.letters)

  return (
    <>
      {Letter.filter(item => item.writeTo === selectedPlayer).map(letter => (
        <FanContainer
          key={letter.id}
          onClick={() => {
            navigate(`/${letter.writeTo}/${letter.id}`, {})
          }}
        >
          <section>
            <FanFigure>
              <AvatarImg src={Normalimg} />
            </FanFigure>
            <FanletterBox>
              <span>{letter.nickname}</span>
              <time>{letter.creatAT}</time>
              <p>{letter.content}</p>
            </FanletterBox>
          </section>
        </FanContainer>
      ))}
    </>
  )
}

const FanContainer = styled.li`
  background-color: black;
  margin: 3px;
  color: white;
  list-style: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
  }
  border-radius: 5px;
  flex-direction: column;
`
const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
`
const FanFigure = styled.figure`
  margin-left: 10px;
  border-radius: 50%;
`
const FanletterBox = styled.div`
  width: 150px;
  flex-direction: column;
  justify-content: center;
  display: flex;
  font-weight: bold;
  span {
    color: blue;
  }
  p {
    background-color: gray;
    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
    width: 350px;
    height: 40px;
    text-overflow: ellipsis;
  }
`
