import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFanLetter } from '../redux/modules/letter' // 툴킷에서 생성한 액션 및 셀렉터 가져오기
import Header from '../components/header'
import Btlist from '../components/btList'
import Footer from '../components/footer'
import styled from 'styled-components'
import Fanletter from '../components/Fanletter'
import { login, logout, selectCurrentUser } from '../redux/modules/authSlice'
import { fetchLetters } from '../redux/modules/letter'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Letter = useSelector(state => state.letters.letters)

  const storedNickname = localStorage.getItem('nickname')
  const storedUserId = localStorage.getItem('userId')
  const [LetterInput, setLetterInput] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState('Zeus')
  const [nickname, setNickname] = useState(storedNickname || '')
  const currentUser = useSelector(selectCurrentUser)
  console.log(currentUser)
  useEffect(() => {
    dispatch(fetchLetters())
  }, [LetterInput])
  useEffect(() => {
    dispatch(login())
  }, [dispatch])

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      // 로컬 스토리지에 사용자 정보가 있으면 Redux store에 로그인 상태로 업데이트
      dispatch(login({ userId: storedUserId }))
    }
  }, [dispatch])

  const newLetter = async event => {
    event.preventDefault()

    try {
      const currentDate = new Date()
      const dateUpdate = `${currentDate.getFullYear()}년 ${
        currentDate.getMonth() + 1
      }월 ${currentDate.getDate()}일`

      const localletter = axios.create({
        baseURL: 'http://localhost:4000',
      })

      await localletter.post(`/letters`, {
        nickname: nickname,
        content: LetterInput,
        Avatar: '',
        writeTo: selectedPlayer,
        creatAT: dateUpdate,
        userId: storedUserId,
      })

      setLetterInput('')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout())
        navigate(`/`)
      } else {
        console.error(error)
      }
    }
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
        <FanletterBox>
          <section>
            <label>닉네임 : </label>
            {nickname}
          </section>
          <section>
            <label>내용 :</label>
            <Fanletterinput
              placeholder="최대 100자 까지 작성가능"
              maxLength="100"
              value={LetterInput}
              onChange={event => InputLetterInput(event)}
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
  margin: 0 auto;
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
