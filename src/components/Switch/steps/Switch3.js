import React, { PropTypes } from 'react';

const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';

class Switch extends React.Component {
  state = {
    payMethod: BTC,
  };

  select = (choice) => {
    // select is actually called during render, and it’s the return value of select that gets called onClick.
    return (evt) => {
      // <-- handler starts here
      this.setState({
        payMethod: choice,
      });
    };
  };

  // Since the setState method triggers a refresh, we want to be careful about how often we call it.
  // Modifying the actual-DOM is slow so we don’t want to cause a cascade of setStates to be called, as that could result it poor performance for our user.
  
  render() {
    return (
      <div className='switch'>
        <div
          className='choice'
          onClick={this.select(CREDITCARD)} // add this
        >Creditcard</div>
        <div
          className='choice'
          onClick={this.select(BTC)} // ... and this
        >Bitcoin</div>
        Pay with: {this.state.payMethod}
      </div>
    );
  }
}

module.exports = Switch;
