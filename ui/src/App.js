import React, { Component } from 'react';

import './App.scss';
import Header from "./Components/Header/Header";
import ActionLogs from "./Components/ActionLogs/ActionLogs";
import Debugger from "./Components/Debugger/Debugger";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Debugger/>
        <ActionLogs/>
      </div>
    );
  }
}

export default App;
