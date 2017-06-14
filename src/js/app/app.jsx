import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Container from 'components/Container';
import Card from 'components/Card';
import { backgroundLight } from 'constants/colors';
import Topbar from './components/Topbar';
import FormContainer from './containers/FormContainer';

const LeftPane = styled.div`
  padding: 16px 32px;
  box-sizing: border-box;

  ${breakpoint('desktop')`
    width: 60%;
  `};
`;

const RightPane = styled.div`
  padding: 16px 8px 8px;
  background-color: ${backgroundLight};
  box-sizing: border-box;

  ${breakpoint('desktop')`
    width: 40%;
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

const App = () => (
  <div>
    <Topbar />
    <main>
      <Container>
        <StyledCard>
          <LeftPane>
            <FormContainer />
          </LeftPane>
          <RightPane />
        </StyledCard>
      </Container>
    </main>
  </div>
);

export default App;
