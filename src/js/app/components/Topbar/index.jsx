import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Container from 'components/Container';
import { gradient1, gradient2, gradient3, primary, accentText } from 'constants/colors';
import CodeIcon from 'icons/code';
import TopbarCartContainer from '../../containers/TopbarCartContainer';

const StyledTopbar = styled.header`
  width: 100%;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-image: linear-gradient(to right, ${gradient1} 0%, ${gradient2} 50%, ${gradient3} 100%) 0 0 1 0;
  box-sizing: border-box;
  margin-bottom: 40px;
`;

const StyledContainer = styled(Container)`
  padding: 16px 16px;
  box-sizing: border-box;
  text-align: center;

  ${breakpoint('tablet')`
    padding: 16px 0;
    text-align: left;
  `};
`;

const StyledCodeIcon = styled(CodeIcon)`
  width: 40px;
`;

const Title = styled.h1`
  display: inline;
  font-weight: 300;
  font-size: 20px;
  vertical-align: middle;
  margin-left: 8px;
  color: ${primary};
`;

const Cart = styled.div`
  margin-top: 8px;

  ${breakpoint('tablet')`
    float: right;
    margin-top: 0;
  `};
`;

const CartText = styled.span`
  vertical-align: middle;
  color: ${accentText};
`;

const StyledCartContainer = styled(TopbarCartContainer)`
  display: inline;
  margin-left: 8px;
`;

const Topbar = () => (
  <StyledTopbar>
    <StyledContainer>
      <StyledCodeIcon size={24} preserveAspectRatio="none" />
      <Title>React Order Checkout Demo</Title>
      <Cart>
        <CartText>cart</CartText>
        <StyledCartContainer />
      </Cart>
    </StyledContainer>
  </StyledTopbar>
);

export default Topbar;
