import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import letters from '../modules/letter.js'
import writeuser from '../modules/writeuser.js'

const rootReducer = combineReducers({ letters, writeuser })
const store = createStore(rootReducer, devToolsEnhancer())

export default store
