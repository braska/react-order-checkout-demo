import React, { Component } from 'react';
import StepThree from '../components/StepThree';

export default class StepThreeContainer extends Component {
  state = {
    name: '',
    number: '',
    expireMonth: '',
    expireYear: '',
    code: '',
  };

  render() {
    return (
      <StepThree {...this.state} />
    );
  }
}
