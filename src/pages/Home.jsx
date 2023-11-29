import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Header from '../components/header'
import Btlist from '../components/btList'
import Footer from '../components/footer'
import styled from 'styled-components'
import uuid from 'react-uuid'
import Fanletter from '../components/Fanletter'
import { CaptainContext } from '../components/captaincontext'
import { useDispatch } from 'react-redux'
import letters from '../redux/modules/letter'
import { addFanLetter, ADD_FAN_LETTER } from '../redux/modules/letter'

export default function Home() {
  // console.log(Letter, setLetter)
  const dispatch = useDispatch()
  const Letter = useSelector(state => state.letters)
  console.log(letters)
  const [Nickname, setNickname] = useState('')
  const [LetterInput, setLetterInput] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState('Zeus')

  console.log(LetterInput)
  console.log(Nickname)
  const newLetter = event => {
    event.preventDefault()
    dispatch(addFanLetter(Nickname, LetterInput, selectedPlayer))
    setNickname('')
    setLetterInput('')
  }
  console.log(Letter)
  // 나머지 컴포넌트 렌더링 코드...

  const InputNickname = event => {
    setNickname(event.target.value)
  }

  const InputLetterInput = event => {
    setLetterInput(event.target.value)
  }

  const SelectPlayer = event => {
    setSelectedPlayer(event.target.value)
  }
  return (
    <div>
      <Header />
      <Btlist Letter={Letter} setSelectedPlayer={setSelectedPlayer} />
      <ContextContainer>
        <ContextContainer>
          <FanletterBox>
            <section>
              <label>닉네임 :</label>
              <Nicknameinput
                maxLength="5"
                placeholder="최대 5자 까지 작성가능"
                value={Nickname}
                onChange={event => {
                  InputNickname(event)
                }}
              />
            </section>
            <section>
              <label>내용 :</label>
              <Fanletterinput
                placeholder="최대 100자 까지 작성가능"
                maxLength="100"
                value={LetterInput}
                onChange={event => {
                  InputLetterInput(event)
                }}
              />
            </section>
            <section>
              <FanSelectlabel>누구에게 보내는 것인가요?</FanSelectlabel>
              <select value={selectedPlayer} onChange={SelectPlayer}>
                <option value="Zeus">제우스</option>
                <option value="Oner">오너</option>
                <option value="Faker">페이커</option>
                <option value="Guma">구마유시</option>
                <option value="Keria">케리아</option>
              </select>
            </section>
            <ClickFanletter>
              <ClickFanletterBT onClick={newLetter}>
                팬 래터 등록
              </ClickFanletterBT>
            </ClickFanletter>
          </FanletterBox>
        </ContextContainer>
        <FanletterBox>
          {Letter.filter(item => item.writeTo === selectedPlayer).length ===
          0 ? (
            <p>팬레터가 없습니다.</p>
          ) : (
            <Fanletter selectedPlayer={selectedPlayer} />
          )}
        </FanletterBox>
      </ContextContainer>
      <Footer />
    </div>
  )
}
const FanletterBox = styled.form`
  border: 2px solid red;
  padding: 10px;
  width: 550px;
  height: 350px;
  margin: 0 auto; /* 가운데 정렬을 위해 추가 */
  color: white;
  overflow: auto;
`
const Nicknameinput = styled.input`
  width: 100%;
  vertical-align: middle;
  padding: 5px 10px;
`
const Fanletterinput = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
  vertical-align: middle;
  font-size: 1em;
  font-family: Arial, Helvetica, sans-serif;
  padding: 3px;
`
const FanSelectlabel = styled.label`
  width: 240px;
`
const ClickFanletter = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ContextContainer = styled.div`
  padding: 20px;
  background-color: black;
`
const ClickFanletterBT = styled.button`
  color: white;
  background-color: gray;
  width: 100px;
  height: 30px;
  &:hover {
    background-color: black;
  }
  &:active {
    background-color: black;
  }
`
