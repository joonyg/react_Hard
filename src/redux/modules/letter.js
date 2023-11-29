import { v4 as uuid } from 'uuid'
import FakeData from '../../shared/FakeData.json'

const DEL_LETTER = 'letter/DEL_LETTER'
const ADD_FAN_LETTER = 'letter/ADD_FAN_LETTER'
const UPDATE_LETTER = 'letter/UPDATE_LETTER'

export const deleteLetter = payload => ({
  type: DEL_LETTER,
  payload: payload,
})
export const updateletter = payload => ({
  type: UPDATE_LETTER,
  payload: payload,
})

export const addFanLetter = (Nickname, LetterInput, selectedPlayer) => ({
  type: ADD_FAN_LETTER,
  payload: { Nickname, LetterInput, selectedPlayer },
})

// Reducer
const letterState = FakeData

const letters = (state = letterState, action) => {
  switch (action.type) {
    case DEL_LETTER:
      const idToDelete = action.payload
      const newLetters = state.filter(letter => letter.id !== idToDelete)
      return newLetters

    case ADD_FAN_LETTER:
      const today = new Date()
      const updateDate = `${today.getFullYear()}년 ${
        today.getMonth() + 1
      }월 ${today.getDate()}일`
      const newFanLetter = {
        id: uuid(),
        nickname: action.payload.Nickname,
        creatAT: updateDate,
        content: action.payload.LetterInput,
        writeTo: action.payload.selectedPlayer,
        Avatar: '',
      }
      return [newFanLetter, ...state]

    case UPDATE_LETTER:
      const { id, updatedContent } = action.payload
      const updatedLetters = state.map(letter => {
        if (letter.id === id) {
          return { ...letter, content: updatedContent }
        } else {
          return letter
        }
      })
      return updatedLetters

    default:
      return state
  }
}

export default letters
