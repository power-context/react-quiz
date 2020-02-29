import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout";
import Quiz from "./containers/quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/auth" component={Auth} />
          <Route path="/" component={QuizList} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
