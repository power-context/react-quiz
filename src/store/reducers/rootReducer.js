import {combineReducers} from 'redux'
import quizReducer from '../reducers/quizReducer'
import createReducer from '../reducers/createReducer'
import authReducer from '../reducers/authReducer'

export default combineReducers({
    quizReducer, createReducer, authReducer
})