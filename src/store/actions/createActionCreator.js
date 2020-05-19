import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "./actionTypes";
import axios from "../../axios/Axios-conf";

export function createQuizQuestion(item){
    return{
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreation(){
    return{
        type: RESET_QUIZ_CREATION
    }
}

export function finishCreateQuiz(){
    return async (dispatch, getState) => {
        const state = getState()
        await axios.post("/quizes.json", state.createReducer.quiz);
        dispatch(resetQuizCreation())
    }
}