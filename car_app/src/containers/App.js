import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import TestRecord from '../components/TestRecord';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TestRecord/>
      </div>
    );
  }
}

export default App;
