import axios from '../../axios/Axios-conf'
import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS
} from './actionTypes';

export function fetchQuizes(){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
          const responce = await axios.get("quizes.json");
          const quizes = [];
          Object.keys(responce.data).forEach((key, index) => {
            quizes.push({
              id: key,
              name: `Test ${index + 1}`
            });
          });
          dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizID){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
          const responce = await axios.get(`/quizes/${quizID}.json`);
          const quiz = responce.data;
          dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz){
    return{
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart(){
    return{
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes){
    return{
        type: FETCH_QUIZES_SUCCESS,
        payload: quizes
    }
}

export function fetchQuizesError(e){
    return{
        type: FETCH_QUIZES_ERROR,
        payload: e
    }
}

