import React from 'react';
import styled from 'styled-components';
import Title from 'components/Title';

const StyledTitle = styled(Title)`
  font-size: 20px;
  margin-top: 8px;
`;

const OrderSummary = () => (
  <div>
    <StyledTitle>Order Summary</StyledTitle>
  </div>
);

export default OrderSummary;
