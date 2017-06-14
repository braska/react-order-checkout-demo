import React, { Component } from 'react';
import StepOne from '../components/StepOne';

export default class StepOneContainer extends Component {
  state = {
    name: '',
    phone: '',
    address: '',
    addressComment: '',
  };

  render() {
    return (
      <StepOne {...this.state} />
    );
  }
}
