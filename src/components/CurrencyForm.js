import React, { Component } from 'react';

class CurrencyForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      currencyAIndex: -1,
      currencyBIndex: -1,
      error: null,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      error: null,
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.amount === 0) {
      this.setState({
        error: 'Invalid amount to convert!'
      })
    } else if (this.state.currencyAIndex === -1) {
      this.setState({
        error: 'Select a currency A!'
      })
    } else if (this.state.currencyBIndex === -1) {
      this.setState({
        error: 'Select a currency B!'
      })
    } else {
      const amount = parseFloat(this.state.amount)
      const currencyA = this.props.rates[this.state.currencyAIndex];
      const currencyB = this.props.rates[this.state.currencyBIndex];
      const convertedValue = Math.round(amount / parseFloat(currencyA.rate) * parseFloat(currencyB.rate) * 100) / 100;      
      const currencyConversion = `${amount} ${currencyA.currency} equals ${convertedValue} ${currencyB.currency}`
      this.props.addCurrencyConversion(currencyConversion)
    }
  }

  render() {
    const initialOption = <option key={-1} value={-1}>Select a Currency</option>
    const currencyRates = [initialOption, ...this.props.rates.map((rate, index) => {
      return <option key={rate.rate} value={index}>{rate.currency}</option>
    })]
    return (
      <form className="currency-form" onChange={this.onChange} onSubmit={this.onSubmit}>
        {this.state.error ? (<div className="alert alert-danger">
          <strong>Error!</strong> {this.state.error}
        </div>) : null}
        <div className="form-group">
          <label htmlFor="Amount">Amount</label>
          <input className="form-control" id="amount" type="number" placeholder="Amount to Convert" name="amount" />
        </div>
        <div className="form-group">
          <label htmlFor="currencyAIndex">Currency A:</label>
          <select name="currencyAIndex" className="form-control">
            {currencyRates}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="currencyBIndex">Currency B:</label>
          <select name="currencyBIndex" className="form-control">
            {currencyRates}
          </select>
        </div>
        <button className="btn btn-primary">Convert Currency</button>
      </form>
    );
  }
}

export default CurrencyForm;
