import React, { Component } from "react"

import classes from "./quiz.module.css"
import ActiveQuiz from "../../components/activeQuiz/ActiveQuiz"
import FinishedQuiz from "../../components/finishedQuiz/finishedQuiz"
import Loader from "../../components/UI/Loader/Loader"
import {connect} from "react-redux"
import {fetchQuizById} from '../../store/actions/actionCreator'

class Quiz extends Component {

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const results = this.state.results;
    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      this.setState({
        answerState: { [answerId]: "success" },
        results
      });

      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results
      });
    }
  };

  isQuizFinished() {
    return this.state.quiz.length === this.state.activeQuestion + 1;
  }

  onRetryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null
    });
  };

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  render() {
    console.log('Props ' + this.props)
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
              onRetry={this.onRetryHandler}
            />
          ) : (
            <ActiveQuiz
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
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
    fetchQuizById: quizID => dispatch(fetchQuizById(quizID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
