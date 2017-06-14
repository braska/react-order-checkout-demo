import React, { Component } from 'react';
import Form from '../components/Form';

export default class FormContainer extends Component {
  state = {
    step: 1,
  };

  handleGoToStep = (step) => {
    this.setState({ step });
  };

  render() {
    return (
      <Form
        {...this.state}
        handleGoToStep={this.handleGoToStep}
      />
    );
  }
}
