import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cart from '../components/Cart';

export default class TopbarCartContainer extends Component {
  static propTypes = {
    counter: PropTypes.number,
  };

  static defaultProps = {
    counter: 5,
  };

  render() {
    return (
      <Cart {...this.props} counter={this.props.counter > 99 ? '99+' : `${this.props.counter}`} />
    );
  }
}
