import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CartIcon from 'icons/cart';
import { accent, accentText } from 'constants/colors';

const Wrapper = styled.div`
  position: relative;
`;

const Counter = styled.div`
  position: absolute;
  top: -5px;
  right: -8px;
  border-radius: 50%;
  background-color: ${accent};
  color: #fff;
  padding: 3px;
  text-align: center;
  font-size: 11px;
  min-width: 16px;
  max-height: 16px;
  box-sizing: border-box;
`;

const StyledCartIcon = styled(CartIcon)`
  fill: ${accentText};
`;

const Cart = props => (
  <Wrapper {...props}>
    <Counter>{props.counter}</Counter>
    <StyledCartIcon size={24} />
  </Wrapper>
);

Cart.propTypes = {
  counter: PropTypes.string.isRequired,
};

export default Cart;
