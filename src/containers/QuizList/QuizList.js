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

  async componentDidMount(){
    try {
      const responce = await axios.get('https://react-quiz-62ba2.firebaseio.com/quizes.json')
      console.log(responce.data)
    } catch (e) {
      console.log(e)
    }
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
