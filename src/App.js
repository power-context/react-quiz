import React, {Component} from 'react';
import Layout from './hoc/Layout';
import Quiz from './containers/quiz/Quiz';

class App extends Component {
  render(){
    return (
      <Layout>
        <Quiz />
      </Layout>
    )
  }
}

export default App;
