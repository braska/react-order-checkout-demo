import React, { Component } from 'react';
import StepTwo from '../components/StepTwo';

export default class StepTwoContainer extends Component {
  state = {
    name: '',
    email: '',
    address: '',
    addressComment: '',
  };

  render() {
    return (
      <StepTwo {...this.state} />
    );
  }
}
