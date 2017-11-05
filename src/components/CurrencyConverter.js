import React, { Component } from 'react';
import 'whatwg-fetch';
import CurrencyForm from './CurrencyForm'
import RecentlyEnteredList from './RecentlyEnteredList'
import RateHistory from './RateHistory'

class CurrencyConverter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      base: '',
      rates: [],
      time: '',
      history: [],
      rateHistory: []
    }
    this.addCurrencyConversion = this.addCurrencyConversion.bind(this);
  }

  componentDidMount() {
    this.fetchConversionHistory();
    this.fetchEuroConversionRates();
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
      let rateHistory = [parsedResult];
      if (this.state.rateHistory.length !== 0) {
        rateHistory = [...this.state.rateHistory];
        if (this.state.rateHistory[this.state.rateHistory.length - 1].time < parsedResult.time) {
          rateHistory.push(parsedResult);
        }
      } 
      this.setState({ ...parsedResult, rateHistory })
      localStorage.setItem('currencyConversionRateHistory', JSON.stringify(rateHistory))
    })
  }

  fetchConversionHistory() {
    const history = localStorage.getItem('currencyConversionHistory');
    if (history) {
      this.setState({
        history: history.split(',')
      })
    }
    const rateHistory = localStorage.getItem('currencyConversionRateHistory');
    if (rateHistory) {
      this.setState({
        rateHistory: JSON.parse(rateHistory)
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
        <RateHistory rateHistory={this.state.rateHistory} />
      </div>
    );
  }
}

export default CurrencyConverter;
