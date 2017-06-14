import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AngleRightIcon from 'icons/angle-right';
import { primary, secondaryText, mutted } from 'constants/colors';

const Step = styled.div`
  display: inline;
  color: ${props => (props.active ? primary : secondaryText)};
  border-bottom: ${props => (props.complete ? `1px solid ${mutted}` : 'none')};
  font-size: 14px;
`;

const StyledAngleRightIcon = styled(AngleRightIcon)`
  fill: ${mutted};
  margin: 0 8px;
`;

const Steps = props => (
  <div>
    <Step active={props.step === 1} complete={props.step > 1}>Shipping</Step>
    <StyledAngleRightIcon size={32} preserveAspectRatio="none" />
    <Step active={props.step === 2} complete={props.step > 2}>Billing</Step>
    <StyledAngleRightIcon size={32} preserveAspectRatio="none" />
    <Step active={props.step === 3}>Payment</Step>
  </div>
);

Steps.propTypes = {
  step: PropTypes.number.isRequired,
};

export default Steps;
