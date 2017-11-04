import React, { Component } from 'react';
import 'whatwg-fetch';
import CurrencyForm from './CurrencyForm'
import RecentlyEnteredList from './RecentlyEnteredList'

class CurrencyConverter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      base: '',
      rates: [],
      time: '',
      history: []
    }
    this.addCurrencyConversion = this.addCurrencyConversion.bind(this);
  }

  componentDidMount() {
    this.fetchEuroConversionRates();
    this.fetchConversionHistory();
  }

  fetchEuroConversionRates() {
    fetch('https://txf-ecb.glitch.me/rates').then((result) => {
      return result.json()
    }).then((parsedResult) => {
      const euroRate = {
        currency: "EUR",
        rate: "1"
      }
      parsedResult.rates.unshift(euroRate);
      this.setState({ ...parsedResult })
    })
  }

  fetchConversionHistory() {
    const history = localStorage.getItem('currencyConversionHistory');
    if (history) {
      this.setState({
        history: history.split(',')
      })
    }
  }

  addCurrencyConversion(conversion) {
    const history = [`${conversion} at ${this.state.time}`, ...this.state.history]
    this.setState({
      history
    });
    localStorage.setItem('currencyConversionHistory', history)
  }

  render() {
    return (
      <div className="currency-converter container">
        <h1>Currency Converter</h1>
        <CurrencyForm rates={this.state.rates} addCurrencyConversion={this.addCurrencyConversion} />
        <RecentlyEnteredList history={this.state.history} />
      </div>
    );
  }
}

export default CurrencyConverter;
