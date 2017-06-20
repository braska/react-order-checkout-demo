import React from 'react';
import PropTypes from 'prop-types';
import StepsNavigator from '../StepsNavigator';
import StepOneContainer from '../../containers/StepOneContainer';
import StepTwoContainer from '../../containers/StepTwoContainer';
import StepThreeContainer from '../../containers/StepThreeContainer';
import ResultContainer from '../../containers/ResultContainer';

const Form = (props) => {
  if (props.step === 1) {
    return (
      <div>
        <StepsNavigator step={props.step} handleGoToStep={props.handleGoToStep} />
        <StepOneContainer />
      </div>
    );
  } else if (props.step === 2) {
    return (
      <div>
        <StepsNavigator step={props.step} handleGoToStep={props.handleGoToStep} />
        <StepTwoContainer />
      </div>
    );
  } else if (props.step === 3) {
    return (
      <div>
        <StepsNavigator step={props.step} handleGoToStep={props.handleGoToStep} />
        <StepThreeContainer />
      </div>
    );
  }
  return (
    <ResultContainer />
  );
};

Form.propTypes = {
  step: PropTypes.number.isRequired,
  handleGoToStep: PropTypes.func.isRequired,
};

export default Form;
