import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from 'components/Title';
import { primary } from 'constants/colors';

const StyledTitle = Title.extend`
  margin-top: 40px;
`;

const StyledLink = styled.span`
  color: ${primary};
  text-decoration: underline;
`;

const PrintRecipe = StyledLink.extend`
  cursor: pointer;
`;

const ThankYou = props => (
  <div>
    <StyledTitle>Thank you for your order!</StyledTitle>
    <p><strong>Order number is: {props.id}</strong></p>
    <p>You will recieve an email confirmation shortly to <StyledLink>{props.email}</StyledLink></p>
    <p>
      Estimated delivery date is <strong>{new Date(props.estimated_date).toDateString()}</strong>
    </p>
    <p>
      <PrintRecipe onClick={props.printRecipe}>
        Print Recipe
      </PrintRecipe>
    </p>
  </div>
);

ThankYou.propTypes = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  estimated_date: PropTypes.string.isRequired,
  printRecipe: PropTypes.func.isRequired,
};

export default ThankYou;
