import React, { Component } from 'react';
import Form from '../components/Form';

export default class FormContainer extends Component {
  state = {
    step: 2,
  };

  render() {
    return (
      <Form {...this.state} />
    );
  }
}
