import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { primary } from 'constants/colors';
import Steps from '../Steps';

const Title = styled.h1`
  color: ${primary};
  font-weight: 300;
`;

const Form = props => (
  <div>
    <Steps step={props.step} />
    <Title>Shipping Info</Title>
  </div>
);

Form.propTypes = {
  step: PropTypes.number.isRequired,
};

export default Form;
