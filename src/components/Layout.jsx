import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../redux/modules/authSlice'
function Layout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  const logouted = () => {
    dispatch(logout())
    localStorage.removeItem('accessToken')
    navigate('/')
  }
  const logined = () => {
    const confirmLogin = window.confirm('로그인 하시겠습니까?')
    if (confirmLogin) {
      navigate('/')
    }
  }
  return (
    <LogInBar>
      <NaviBT onClick={() => navigate(`/Home`)}>홈으로</NaviBT>
      <NaviBT2>내 프로필</NaviBT2>
      {isLoggedIn ? (
        <NaviBT3 onClick={logouted}>로그아웃</NaviBT3>
      ) : (
        <NaviBT2 onClick={logined}>로그인</NaviBT2>
      )}
    </LogInBar>
  )
}

const LogInBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: gray;
  margin: 0 auto;
  display: flex;
  align-items: center;
`

const NaviBT = styled.button`
  cursor: pointer;
  width: 120px;
  height: 30px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;
  &:active {
    background-color: #353b48;
    transition: background-color 0.5s;
  }
`

const NaviBT2 = styled.button`
  cursor: pointer;
  width: 120px;
  height: 30px;
  border: none;
  font-size: 15px;
  font-weight: bold;

  margin-left: 75%; /* 'auto'를 사용하여 오른쪽으로 붙입니다. */
  &:active {
    background-color: #353b48;
    transition: background-color 0.5s;
  }
`

const NaviBT3 = styled.button`
  cursor: pointer;
  width: 120px;
  height: 30px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
  margin-left: auto; /* 'auto'를 사용하여 오른쪽으로 붙입니다. */
  &:active {
    background-color: #353b48;
    transition: background-color 0.5s;
  }
`
export default Layout
