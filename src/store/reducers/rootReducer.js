import {combineReducers} from 'redux'
import quizReducer from '../reducers/quizReducer'
import createReducer from '../reducers/createReducer'

export default combineReducers({
    quizReducer, createReducer
})