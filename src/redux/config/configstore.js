// import { createStore } from 'redux'
// import { combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import letterReducer, { fetchLetters } from '../modules/letter.js'
import authSlice from '../modules/authSlice.js'
import { configureStore } from '@reduxjs/toolkit'

// const rootReducer = combineReducers({ letters })
// const store = createStore(rootReducer, devToolsEnhancer())

const store = configureStore({
  reducer: {
    letters: letterReducer,
    auth: authSlice,
  },
})
store.dispatch(fetchLetters())

export default store
