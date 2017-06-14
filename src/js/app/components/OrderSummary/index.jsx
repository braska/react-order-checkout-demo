import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from 'components/Title';
import HR from 'components/HR';
import { mutted, secondaryText2, text, primaryDark } from 'constants/colors';

const StyledTitle = styled(Title)`
  font-size: 20px;
  margin-top: 8px;
`;

const ItemRow = styled.div`
  display: flex;
`;

const ItemPicCol = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 2px;
  border: 1px solid ${mutted};
  margin-right: 8px;
  overflow: hidden;
`;

const ItemPic = styled.img`
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
`;

const ItemInfoCol = styled.div`
  margin: 0 auto 0 0;
`;

const ItemTitle = styled.h1`
  font-size: 15px;
  color: ${secondaryText2};
  margin: 0;
  margin-bottom: 6px;
  text-transform: capitalize;
  font-weight: 400;
`;

const ItemDescription = styled.p`
  margin: 0;
  margin-bottom: 2px;
  font-size: 13px;
  color: ${text};
`;

const ItemPriceCol = styled.div`
  font-size: 15px;
  color: ${secondaryText2};
`;

const ItemHR = styled(HR)`
  margin-left: -8px;
`;

const SummaryRow = styled.div`
  display: flex;
  font-size: 15px;
  color: ${secondaryText2};
  margin-bottom: 6px;
`;

const SummaryDescription = styled.div`
  margin: 0 auto 0 0;
`;

const SummaryPrice = styled.div``;

const TotalRow = styled(SummaryRow)`
  color: ${primaryDark};
  font-weight: bold;
  margin-top: 16px;
`;

const OrderSummary = props => (
  <div>
    <StyledTitle>Order Summary</StyledTitle>
    {props.items.map(item => (
      <div key={item.id}>
        <ItemRow>
          <ItemPicCol>
            <ItemPic src={item.img} />
          </ItemPicCol>
          <ItemInfoCol>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemDescription>{item.description}</ItemDescription>
            <ItemDescription>Quatity: {item.quatity}</ItemDescription>
          </ItemInfoCol>
          <ItemPriceCol>${item.price}</ItemPriceCol>
        </ItemRow>
        <ItemHR />
      </div>
    ))}
    <SummaryRow>
      <SummaryDescription>Subtotal</SummaryDescription>
      <SummaryPrice>${props.items.reduce((prev, item) => prev + item.price, 0)}</SummaryPrice>
    </SummaryRow>
    <SummaryRow>
      <SummaryDescription>Shipping</SummaryDescription>
      <SummaryPrice>Free</SummaryPrice>
    </SummaryRow>
    <SummaryRow>
      <SummaryDescription>Taxes</SummaryDescription>
      <SummaryPrice>
        ${props.items.reduce((prev, item) => prev + item.price, 0) * 0.18}
      </SummaryPrice>
    </SummaryRow>
    <HR />
    <TotalRow>
      <SummaryDescription>Total</SummaryDescription>
      <SummaryPrice>
        ${
          props.items.reduce((prev, item) => prev + item.price, 0)
          + (props.items.reduce((prev, item) => prev + item.price, 0) * 0.18)
        }
      </SummaryPrice>
    </TotalRow>
  </div>
);

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quatity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default OrderSummary;
