import React, { Component } from 'react';

import './App.scss';
import Header from "./Components/Header/Header";
import ActionLogs from "./Components/ActionLogs/ActionLogs";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <ActionLogs/>
      </div>
    );
  }
}

export default App;
