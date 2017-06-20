import React, { Component } from 'react';
import { connect } from 'react-redux';
import Result from '../components/Result';
import { goToStep, processOrder } from '../actions/form';

@connect(state => state.form.result, {
  back: () => goToStep(3),
  retry: processOrder,
})
export default class ResultContainer extends Component {
  handlePrintRecipe = () => {
    window.print();
  };

  render() {
    return (
      <Result
        {...this.props}
        printRecipe={this.handlePrintRecipe}
      />
    );
  }
}
