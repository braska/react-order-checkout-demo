import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Container from 'components/Container';
import Card from 'components/Card';
import { backgroundLight } from 'constants/colors';
import Topbar from './components/Topbar';
import FormContainer from './containers/FormContainer';
import OrderSummaryContainer from './containers/OrderSummaryContainer';
import TermsAndConditions from './components/TermsAndConditions';

const LeftPane = styled.div`
  padding: 16px 32px;
  box-sizing: border-box;
  padding-bottom: 56px;

  ${breakpoint('desktop')`
    width: 55%;
  `};
`;

const RightPane = styled.div`
  padding: 16px;
  background-color: ${backgroundLight};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  ${breakpoint('desktop')`
    width: 45%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  `};
`;

const StyledCard = styled(Card)`
  ${breakpoint('desktop')`
    display: flex;
  `};

  &::after {
    clear: both;
    content: '';
  }
`;

const Push = styled.div`
  height: 16px;
  margin-bottom: auto;
`;

const App = props => (
  <Provider store={props.store}>
    <div>
      <Topbar />
      <main>
        <Container>
          <StyledCard>
            <LeftPane>
              <FormContainer />
            </LeftPane>
            <RightPane>
              <OrderSummaryContainer />
              <Push />
              <TermsAndConditions />
            </RightPane>
          </StyledCard>
        </Container>
      </main>
    </div>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
