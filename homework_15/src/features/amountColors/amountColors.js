import React from 'react';

export default class AmountColors extends React.Component {
  render() {
    return (
      <div className="amount-color">
        <span>Colors: </span>
        <span>{this.props.amount}</span>
      </div>
    );
  }
}