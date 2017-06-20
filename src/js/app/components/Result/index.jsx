import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { primary, secondaryText } from 'constants/colors';
import Title from 'components/Title';
import { Button } from 'components/Form';
import ThankYou from '../ThankYou';

const loading = keyframes`
0% {
  height: 0;
  width: 0;
  background-color: ${primary};
}
29% {
  background-color: ${primary};
}
30% {
  height: 50px;
  width: 50px;
  background-color: transparent;
  border-width: 1em;
  opacity: 1;
}
100% {
  height: 50px;
  width: 50px;
  border-width: 0;
  opacity: 0;
  background-color: transparent;
}
`;

const Loader = styled.div`
  height: 0;
  width: 0;
  box-sizing: border-box;
  border: 0 solid ${primary};
  border-radius: 50%;
  animation: ${loading} 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const LoaderWrapper = styled.div`
  position: relative;
`;

const LoaderText = styled.p`
  text-align: center;
  color: ${secondaryText};
  font-size: 15px;
  margin-top: 100px;
`;

const ErrorText = styled.p`
  text-align: center;
  color: ${secondaryText};
  font-size: 15px;
`;

const StyledButton = Button.extend`
  margin-bottom: 8px;
`;

const Result = (props) => {
  if (props.loading) {
    return (
      <Wrapper>
        <LoaderWrapper>
          <Loader />
          <LoaderText>
            Loading
          </LoaderText>
        </LoaderWrapper>
      </Wrapper>
    );
  }

  if (props.error) {
    return (
      <Wrapper>
        <Title>Oops, error!</Title>
        <ErrorText>
          This error is randomly invoked from src/js/app/shared/services/orders.js
          to demonstrate error handling.
        </ErrorText>
        <StyledButton
          onClick={props.back}
        >
          Back to payment info
        </StyledButton>
        <StyledButton
          onClick={props.retry}
        >
          Retry
        </StyledButton>
      </Wrapper>
    );
  }
  return <ThankYou {...props.data} printRecipe={props.printRecipe} />;
};

Result.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  back: PropTypes.func.isRequired,
  retry: PropTypes.func.isRequired,
  printRecipe: PropTypes.func.isRequired,
  data: PropTypes.shape(),
};

Result.defaultProps = {
  data: undefined,
};

export default Result;
