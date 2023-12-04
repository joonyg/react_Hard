import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import Footer from '../components/footer'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../redux/modules/authSlice'
import api from '../axios/api'
const Membershippage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.auth.isLoggedIn)

  const [formData, setFormData] = useState({
    userid: '',
    password: '',
    nickname: '',
  })

  const [error, setError] = useState({
    userid: '',
    password: '',
    nickname: '',
  })

  const handleSubmit = async event => {
    event.preventDefault()
    const isValidate = validateForm()

    if (isValidate) {
      try {
        const response = await api.post('/register', {
          id: formData.userid,
          password: formData.password,
          nickname: formData.nickname,
        })

        const { password, ...userWithoutPassword } = response

        dispatch(login(userWithoutPassword))

        localStorage.setItem('accessToken', JSON.stringify(userWithoutPassword))
        navigate(`/Home`)
      } catch (error) {
        console.error('회원가입 실패:', error)
      }
    }
  }
  const validateForm = () => {
    let isvalid = true

    if (formData.userid.length < 4 || formData.userid.length > 10) {
      setError(prevState => ({
        ...prevState,
        userid: '아이디는 4 ~ 10 이내로 입력하시오',
      }))
      isvalid = false
    } else {
      setError(prevState => ({ ...prevState, userid: '' }))
    }
    if (formData.password.length < 4 || formData.password.length > 15) {
      setError(prevState => ({
        ...prevState,
        password: '패스워드는 4 ~ 15 이내로 입력하시오',
      }))
      isvalid = false
    } else {
      setError(prevState => ({ ...prevState, password: '' }))
    }
    if (formData.nickname.length < 1 || formData.nickname.length > 10) {
      setError(prevState => ({
        ...prevState,
        nickname: '닉네임은 1 ~ 10 이내로 입력하시오',
      }))
      isvalid = false
    } else {
      setError(prevState => ({ ...prevState, nickname: '' }))
    }
    return isvalid
  }
  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <>
      <Header />
      <LoginBackGround>
        <LoginBox>
          <FormBox onSubmit={handleSubmit}>
            <IdInput
              name="userid"
              placeholder="아이디를 입력하세요"
              value={formData.userid}
              onChange={handleInputChange}
            />
            <PasswordInput
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              type="password"
              onChange={handleInputChange}
            />
            <IdInput
              name="nickname"
              placeholder="닉네임을 입력하세요"
              value={formData.nickname}
              onChange={handleInputChange}
            />
            <ButtonGroup>
              <LoginButton onClick={() => navigate(`/`)}>뒤로가기</LoginButton>
              <SignUpButton onClick={handleSubmit}>회원가입</SignUpButton>
            </ButtonGroup>
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

export default Membershippage
