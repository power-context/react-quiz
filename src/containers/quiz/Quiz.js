import React, { Component } from "react";

import classes from "./quiz.module.css";
import ActiveQuiz from "../../components/activeQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/finishedQuiz/finishedQuiz";
import axios from "../../axios/Axios-conf";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const results = this.state.results;
    const question = this.state.quiz[this.state.activeQuestion];

    //    if(this.key === 'success'){
    //        return
    //    }

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

  async componentDidMount() {
    const quizID = this.props.match.params.id;
    try {
      const responce = await axios.get(`/quizes/${quizID}.json`);
      const quiz = responce.data;
      this.setState({
        quiz,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
    console.log("This ID " + this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz React</h1>
          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.onRetryHandler}
            />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              answerState={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
