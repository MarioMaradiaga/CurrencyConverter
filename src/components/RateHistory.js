import React, { Component } from 'react';

class RateHistory extends Component {
  render() {
    let headerItems, listItems;
    if (this.props.rateHistory.length) {
      headerItems = this.props.rateHistory[0].rates.map((rate, index) => {
        return <th key={index}>{rate.currency}</th>
      })
      listItems = this.props.rateHistory.map((entry, index) => {
        return <tr key={index}>
          <td>{entry.time}</td>
          {entry.rates.map((individualRate) => {
            return <td key={individualRate.currency}>{Math.round(parseFloat(individualRate.rate) * 100) / 100}</td>
          })}
        </tr>
      });
    }
    return (
      <div className="container currency-recent-list">
        <h2>Rate History (Base: EUR)</h2>
        <div className="currency-rate-history">
          <table className="table">
            <tbody>
              <tr>
                <th>Date</th>
                {headerItems}
              </tr>
              {listItems}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default RateHistory;
