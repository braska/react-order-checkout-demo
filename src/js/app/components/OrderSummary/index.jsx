import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Title from 'components/Title';
import HR from 'components/HR';
import Link from 'components/Link';
import TrashIcon from 'icons/trash';
import { mutted, secondaryText2, text, primaryDark, accent, accentText } from 'constants/colors';

const StyledTitle = styled(Title)`
  font-size: 20px;
  margin: 0;
  float: left;
`;

const shake = keyframes`
  0% { transform: translate(1px, 0.5px) rotate(0deg); }
  10% { transform: translate(-0.5px, -1px) rotate(-1deg); }
  20% { transform: translate(-1.5px, 0px) rotate(1deg); }
  30% { transform: translate(0px, 1px) rotate(0deg); }
  40% { transform: translate(0.5px, -0.5px) rotate(1deg); }
  50% { transform: translate(-0.5px, 1px) rotate(-1deg); }
  60% { transform: translate(-1.5px, 0.5px) rotate(0deg); }
  70% { transform: translate(1px, 0.5px) rotate(-1deg); }
  80% { transform: translate(-0.5px, -0.5px) rotate(1deg); }
  90% { transform: translate(1px, 1px) rotate(0deg); }
  100% { transform: translate(0.5px, -1px) rotate(-1deg); }
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
  position: relative;

  animation: ${props => (props.edit ? `${shake} 0.8s linear infinite` : 'none')};
`;

const ItemPic = styled.img`
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
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

const TitleRow = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;

  &::after {
    content: '';
    clear: both;
    display: table;
  }
`;

const EditLink = Link.withComponent('div').extend`
  float: right;
  vertical-align: bottom;
  font-size: 14px;
  line-height: 23px;
  text-decoration: underline;
  border-bottom: none;
  margin-left: 8px;
`;

const ItemQuatitySetBtn = styled.button`
  background: none;
  background-color: ${props => (props.disabled ? mutted : accent)};
  border: none;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  font-size: 13px;
  font-weight: 700;
  color: white;
  outline: none;
  margin-left: 8px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  &:active {
    background-color: ${accentText};
  }
`;

const ItemQuatityMinus = ItemQuatitySetBtn.extend.attrs({
  children: '-',
})``;

const ItemQuatityPlus = ItemQuatitySetBtn.extend.attrs({
  children: '+',
})``;

const StyledTrashIcon = styled(TrashIcon)`
  fill: #ffffff;
`;

const DeleteWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(90, 16, 148, 0.2);
  cursor: pointer;
`;

const Message = styled.div`
  text-align: center;
  color: ${secondaryText2};
  margin: 40px 0;
`;

const OrderSummary = props => (
  <div>
    <TitleRow>
      <StyledTitle>Order Summary</StyledTitle>
      {(() => {
        if (props.items.length > 0) {
          return (
            <EditLink onClick={() => props.toggleEditMode(true)}>{props.editMode ? 'apply' : 'edit order'}</EditLink>
          );
        }
        return null;
      })()}
      {(() => {
        if (props.editMode) {
          return (
            <EditLink onClick={() => props.toggleEditMode(false)}>cancel</EditLink>
          );
        }
        return null;
      })()}
    </TitleRow>
    {(() => {
      if (props.items.length > 0) {
        return (
          <div>
            {(props.editMode ? props.itemsCopy : props.items).map((item, i) => (
              <div key={item.id}>
                <ItemRow>
                  <ItemPicCol edit={props.editMode}>
                    {(() => {
                      if (props.editMode) {
                        return (
                          <DeleteWrapper
                            onClick={() => props.handleDelete(i)}
                          >
                            <StyledTrashIcon size={32} />
                          </DeleteWrapper>
                        );
                      }
                      return null;
                    })()}
                    <ItemPic src={item.img} />
                  </ItemPicCol>
                  <ItemInfoCol>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemDescription>{item.description}</ItemDescription>
                    <ItemDescription>
                      Quatity: {item.quatity}
                      {(() => {
                        if (props.editMode) {
                          return (
                            <span>
                              <ItemQuatityMinus
                                onClick={() => (
                                  item.quatity > 1
                                  ? props.setQuantity(i, item.quatity - 1)
                                  : () => {}
                                )}
                                disabled={item.quatity <= 1}
                              />
                              <ItemQuatityPlus
                                onClick={() => props.setQuantity(i, item.quatity + 1)}
                              />
                            </span>
                          );
                        }
                        return null;
                      })()}
                    </ItemDescription>
                  </ItemInfoCol>
                  <ItemPriceCol>${item.price * item.quatity}</ItemPriceCol>
                </ItemRow>
                <ItemHR />
              </div>
            ))}
            {(() => {
              const subtotal = (props.editMode ? props.itemsCopy : props.items)
                .reduce((prev, item) => prev + (item.price * item.quatity), 0);
              const taxes = Math.round(subtotal * 0.18 * 100) / 100;

              return (
                <div>
                  <SummaryRow>
                    <SummaryDescription>Subtotal</SummaryDescription>
                    <SummaryPrice>
                      ${subtotal}
                    </SummaryPrice>
                  </SummaryRow>
                  <SummaryRow>
                    <SummaryDescription>Shipping</SummaryDescription>
                    <SummaryPrice>Free</SummaryPrice>
                  </SummaryRow>
                  <SummaryRow>
                    <SummaryDescription>Taxes</SummaryDescription>
                    <SummaryPrice>
                      ${taxes}
                    </SummaryPrice>
                  </SummaryRow>
                  <HR />
                  <TotalRow>
                    <SummaryDescription>Total</SummaryDescription>
                    <SummaryPrice>
                      ${Math.round((subtotal + taxes) * 100) / 100}
                    </SummaryPrice>
                  </TotalRow>
                </div>
              );
            })()}
          </div>
        );
      }
      return (
        <Message>
          There is no items!
        </Message>
      );
    })()}
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
