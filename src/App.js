import React, { Component } from 'react';
import CurrencyConverter from './components/CurrencyConverter'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurrencyConverter />
      </div>
    );
  }
}

export default App;
