import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/header'
import Footer from '../components/footer'
import styled from 'styled-components'
import Normalimg from '../assets/imgs/normalimage.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import letter, { deleteLetter, updateLetter } from '../redux/modules/letter'
import { selectCurrentUser } from '../redux/modules/authSlice'

export default function Faker() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const letters = useSelector(state => state.letters.letters)
  const storedUserId = localStorage.getItem('userId')
  console.log(letters)
  const selectedLetter = letters.find(
    letter => letter.userId === storedUserId && letter.id === id
  )
  const currentUser = useSelector(selectCurrentUser)
  const [isEdit, setIsEdit] = useState(false)
  const [updatedContent, setUpdatedContent] = useState(
    selectedLetter ? selectedLetter.content : ''
  )
  useEffect(() => {
    dispatch(updateLetter)
  }, [updatedContent])
  const deleteBTN = () => {
    const answer = window.confirm('삭제하시겠습니까?')

    if (!answer) return

    if (currentUser && currentUser.userId === selectedLetter.userId) {
      dispatch(deleteLetter(id))
      navigate(`/Home`)
    } else {
      alert('해당 게시물을 삭제할 권한이 없습니다.')
    }
  }

  const updateBTN = () => {
    setIsEdit(!isEdit)
  }

  const setupdateBTN = () => {
    setIsEdit(false)
  }

  const UpadateContentChange = event => {
    const content = event.target.value
    setUpdatedContent(content)
  }

  const saveUpdatedContent = () => {
    if (updatedContent === selectedLetter.content) {
      alert('수정사항이 없습니다.')
      return
    }

    dispatch(updateLetter({ id, updatedContent }))
    setIsEdit(false)
  }

  return (
    <div>
      <Header />
      {selectedLetter && (
        <InfanletterContainer>
          <GoHomeBt onClick={() => navigate(`/Home`)}>홈으로</GoHomeBt>
          <Fanletterdiv key={id}>
            <div>
              <header>
                <figure>
                  <AvatarImg src={Normalimg}></AvatarImg>
                </figure>
                <span>{selectedLetter.nickname}</span>
                <time>{selectedLetter.creatAT}</time>
              </header>
              <WirteTo>To:{selectedLetter.writeTo}</WirteTo>
              {isEdit ? (
                <>
                  <UpdateText
                    maxLength="100"
                    value={updatedContent}
                    onChange={UpadateContentChange}
                  />
                </>
              ) : (
                <>
                  <ContentBox>{selectedLetter.content}</ContentBox>
                </>
              )}
              <section>
                {isEdit ? (
                  <>
                    <button onClick={saveUpdatedContent}>저장</button>
                    <button onClick={setupdateBTN}>취소</button>
                  </>
                ) : (
                  <>
                    <button onClick={updateBTN}>수정</button>
                    <button onClick={deleteBTN}>삭제</button>
                  </>
                )}
              </section>
            </div>
          </Fanletterdiv>
        </InfanletterContainer>
      )}

      <Footer />
    </div>
  )
}

const AvatarImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`

const InfanletterContainer = styled.div`
  height: 80vh;
  background-color: gainsboro;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Fanletterdiv = styled.div`
  background: black;
  width: 800px;
  height: 600px;
  color: white;
  padding: 15px;
  header {
    display: flex;
    align-items: center;
  }
  figure {
    margin-right: 20px;
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }
  span {
    text-align: left;
    margin: 20px;
    font-size: 40px;
  }
  button {
    margin: 15px;
    width: 80px;
    height: 50px;
    color: white;
    background-color: gray;
    cursor: pointer;
    &:hover {
      background-color: red;
    }
  }
  section {
    display: flex;
    justify-content: flex-end;
  }
`

const WirteTo = styled.p`
  font-size: 24px;
  padding-top: 10px;
  padding-left: 40px;
  font-weight: 500;
`

const ContentBox = styled.p`
  background-color: gray;
  height: 275px;
  padding: 16px;
  line-height: 48px;
  margin: 24px;
  border-radius: 10px;
  font-size: 44px;
  word-break: break-all;
  overflow: auto;
`

const GoHomeBt = styled.button`
  position: absolute;
  width: 100px;
  height: 50px;
  top: 900px;
  left: 150px;
  color: white;
  background-color: black;
  box-shadow: black 7px 5px 5px 5px;
  cursor: pointer;
`

const UpdateText = styled.textarea`
  background-color: gray;
  height: 275px;
  padding: 16px;
  line-height: 48px;
  margin: 24px;
  border-radius: 10px;
  font-size: 44px;
  word-break: break-all;
  overflow: auto;
  width: 722px;
  color: white;
`
