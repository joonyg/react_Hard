import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import Footer from '../components/footer'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, checkTokenValidity } from '../redux/modules/authSlice'
import api from '../axios/api'

const Loginpage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [inputid, setInputid] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    dispatch(logout())
  }, [dispatch])
  const fetchLogin = async () => {
    try {
      const response = await api.post('/login?expiresIn=10m', {
        id: inputid,
        password: inputPassword,
      })

      const { accessToken, userId, nickname, Avatar } = response
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('userId', userId)
      localStorage.setItem('nickname', nickname)
      localStorage.setItem('Avatar', Avatar)
      // 로그인 성공 후에 홈으로 이동
      navigate(`/Home`)
      dispatch(login({ userId, nickname, Avatar }))
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    await fetchLogin()
  }
  const handleIdChange = event => {
    setInputid(event.target.value)
  }

  const handlePasswordChange = event => {
    setInputPassword(event.target.value)
  }

  return (
    <>
      <Header />
      <LoginBackGround>
        <LoginBox>
          <FormBox onSubmit={handleSubmit}>
            <IdInput
              type="id"
              placeholder="아이디를 입력하세요"
              value={inputid}
              onChange={handleIdChange}
            />
            <PasswordInput
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={inputPassword}
              onChange={handlePasswordChange}
            />
            <ButtonGroup>
              <LoginButton>로그인</LoginButton>

              <SignUpButton onClick={() => navigate(`/Membership`)}>
                회원가입
              </SignUpButton>
            </ButtonGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormBox>
        </LoginBox>
      </LoginBackGround>
      <Footer />
    </>
  )
}

const LoginBackGround = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginBox = styled.div`
  width: 700px;
  height: 500px;
`

const FormBox = styled.form`
  background-color: white;
  width: 500px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const IdInput = styled.input`
  border: none;
  border-bottom: 3px solid black;
  font-size: 20px;
  margin-bottom: 20px;
  padding: 10px;
  width: 80%;
`

const PasswordInput = styled.input`
  border: none;
  border-bottom: 3px solid black;
  font-size: 20px;
  margin-bottom: 20px;
  padding: 10px;
  width: 80%;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`

const LoginButton = styled.button`
  border: none;
  font-size: 20px;
  font-weight: bold;
  background-color: black;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  &:active {
    background-color: red;
    transition: background-color 0.5s;
  }
`

const SignUpButton = styled.button`
  border: none;
  font-size: 20px;
  font-weight: bold;

  padding: 10px 20px;
  cursor: pointer;
  &:active {
    background-color: #353b48;
    transition: background-color 0.5s;
  }
`
const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`
export default Loginpage
