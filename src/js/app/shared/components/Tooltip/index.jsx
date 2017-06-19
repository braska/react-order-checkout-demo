import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { error, mutted, shadow } from 'constants/colors';

const Root = styled.div`
  position: relative;
`;

const Label = styled.div`
  position: absolute;
  white-space: nowrap;
  font-size: 15px;
  padding: 8px;
  z-index: 1;
  user-select: none;
  top: 0;
  transform: translate(-16px, -40px);
  background-color: #ffffff;
  color: ${error};
  border: 1px solid ${mutted};
  border-radius: 6px;
  box-shadow: 0 0 16px -3px ${shadow};

  &::before {
    content: "";
    position: absolute;
    bottom: -11px;
    left: 22px;
    border-width: 11px 10px 0;
    border-style: solid;
    border-color: ${mutted} transparent;
    display: block;
    width: 0;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 24px;
    border-width: 10px 8px 0;
    border-style: solid;
    border-color: #fff transparent;
    display: block;
    width: 0;
  }
`;

const Tooltip = props => (
  <Root>
    <Label>
      {props.label}
    </Label>
    {props.children}
  </Root>
);

Tooltip.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Tooltip;
