import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"

import classes from "./QuizList.module.css"

export default class QuizList extends Component {
  renderQuizList() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={"/quiz/" + quiz}>Test {quiz}</NavLink>
        </li>
      );
    });
  }

  componentDidMount(){
    axios.get('https://react-quiz-62ba2.firebaseio.com/quizes.json').then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>QuizList</h1>
          <ul>{this.renderQuizList()}</ul>
        </div>
      </div>
    );
  }
}
