import React, { Component } from "react";
import classes from "./quiz.module.css";
import ActiveQuiz from "../../components/activeQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/finishedQuiz/finishedQuiz";

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: "What's your likest color?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "Red", id: 1 },
          { text: "Green", id: 2 },
          { text: "Blue", id: 3 },
          { text: "I don't like colors", id: 4 }
        ]
      },
      {
        question: "What's your likest music?",
        rightAnswerId: 2,
        id: 2,
        answers: [
          { text: "Rock", id: 1 },
          { text: "Metall", id: 2 },
          { text: "Rap", id: 3 },
          { text: "I don't know", id: 4 }
        ]
      },
      {
        question: "What's your likest car's model?",
        rightAnswerId: 1,
        id: 3,
        answers: [
          { text: "BMW X5", id: 1 },
          { text: "Lamborgini Mercurilago", id: 2 },
          { text: "Audi A3", id: 3 },
          { text: "I don't like cars", id: 4 }
        ]
      }
    ]
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

  componentDidMount() {
    console.log("This ID " + this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz React</h1>
          {this.state.isFinished ? (
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
