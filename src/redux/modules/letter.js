import { v4 as uuid } from 'uuid'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const localletter = axios.create({
  baseURL: 'http://localhost:4000',
})

export const fetchLetters = createAsyncThunk(
  'letters/fetchLetters',
  async () => {
    try {
      const response = await localletter.get('/letters')
      return response
    } catch (error) {
      console.error('편지를 불러오는 동안 오류 발생:', error)
      throw error
    }
  }
)

const letterSlice = createSlice({
  name: 'letters',
  initialState: {
    letters: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    deleteLetter: (state, action) => {
      const idToDelete = action.payload
      return {
        ...state,
        letters: state.letters.filter(letter => letter.id !== idToDelete),
      }
    },
    addFanLetter: (state, action) => {
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
      return {
        ...state,
        letters: [newFanLetter, ...state.letters],
      }
    },
    updateLetter: async (state, action) => {
      const { id, updatedContent } = action.payload

      try {
        // 서버에 업데이트 요청
        await localletter.patch(`/letters/${id}`, { content: updatedContent })

        // 서버에서 업데이트된 데이터 가져오기
        const response = await localletter.get('/letters')
        const sortedLetters = response.data.reverse((a, b) => {
          return new Date(b.creatAT) - new Date(a.creatAT)
        })

        // 상태 업데이트
        state.letters = sortedLetters
        state.status = 'succeeded'
      } catch (error) {
        console.error(`Error updating letter with id ${id}:`, error)
        state.status = 'failed'
        state.error = error.message
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLetters.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchLetters.fulfilled, (state, action) => {
        console.log('action.payload:', action.payload.data)
        state.status = 'succeeded'
        const sortedLetters = action.payload.data.reverse((a, b) => {
          return new Date(b.creatAT) - new Date(a.creatAT)
        })

        state.letters = sortedLetters
      })
      .addCase(fetchLetters.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { deleteLetter, addFanLetter, updateLetter } = letterSlice.actions

export default letterSlice.reducer
