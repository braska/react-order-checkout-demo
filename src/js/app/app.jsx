import React from 'react';
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

const App = () => (
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
);

export default App;
