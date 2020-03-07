import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import axios from "../../axios/Axios-conf";
import classes from "./QuizList.module.css";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true
  };
  renderQuizList() {
    return this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const responce = await axios.get("quizes.json");
      const quizes = [];
      Object.keys(responce.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test ${index + 1}`
        });
      });

      this.setState({
        quizes,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>QuizList</h1>
          {this.state.loading ? <Loader /> : <ul>{this.renderQuizList()}</ul>}
        </div>
      </div>
    );
  }
}
