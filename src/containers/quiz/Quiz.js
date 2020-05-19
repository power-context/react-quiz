import React, { Component } from "react"

import classes from "./quiz.module.css"
import ActiveQuiz from "../../components/activeQuiz/ActiveQuiz"
import FinishedQuiz from "../../components/finishedQuiz/finishedQuiz"
import Loader from "../../components/UI/Loader/Loader"
import {connect} from "react-redux"
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/actionCreator'

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillMount(){
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz React</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              answerState={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    loading: state.quizReducer.loading,
    results: state.quizReducer.results,
    isFinished: state.quizReducer.isFinished,
    activeQuestion: state.quizReducer.activeQuestion,
    answerState: state.quizReducer.answerState,
    quiz: state.quizReducer.quiz
  }
}

function mapDispatchToProps(dispatch){
  return{
    fetchQuizById: quizID => dispatch(fetchQuizById(quizID)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
