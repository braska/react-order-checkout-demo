import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export default styled.div`
  width: 100%;
  margin: 0 auto;

  ${breakpoint('tablet')`
    width: 760px;
    max-width: 85%;
  `};

  ${breakpoint('desktop')`
    width: 1160px;
  `};
`;
