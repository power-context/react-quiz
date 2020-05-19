import axios from '../../axios/Axios-conf'
import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISHED_QUIZ,
    QUIZ_NEXT_QUESTION,
    RETRY_QUIZ
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

export function retryQuiz(){
    return{
        type: RETRY_QUIZ
    }
}

export function quizSetState(answerState, results){
    return{
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function finishedQuiz(){
    return{
        type: FINISHED_QUIZ
    }
}

export function activeQuizQuestion(questionNumber){
    return{
        type: QUIZ_NEXT_QUESTION,
        questionNumber
    }
}

export function quizAnswerClick(answerId){
    return (dispatch, getState) => {
        const state = getState().quizReducer
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === "success") {
              return;
            }
          }
          const results = state.results;
          const question = state.quiz[state.activeQuestion];
      
          if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
              results[question.id] = "success";
            }
            dispatch(quizSetState({ [answerId]: "success" }, results))
      
            const timeout = setTimeout(() => {
              if (isQuizFinished(state)) {
                  dispatch(finishedQuiz())

              } else {
                  dispatch(activeQuizQuestion(state.activeQuestion + 1))
              }
              clearTimeout(timeout);
            }, 1000);
          } else {
            results[question.id] = "error";
            dispatch(quizSetState({ [answerId]: "error" }, results))
          }
    }
}

function isQuizFinished(state) {
    return state.quiz.length === state.activeQuestion + 1;
  }