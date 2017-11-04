import React, { Component } from 'react';

class RecentlyEnteredList extends Component {
  render() {
    const listItems = this.props.history.map((entry, index) => {
      return <li key={index}>{entry}</li>
    });
    return (
      <div className="container currency-recent-list">
        <h2>Recent Conversions</h2>
        <ul className="currency-form">
          {listItems}
        </ul>
      </div>
    );
  }
}

export default RecentlyEnteredList;
