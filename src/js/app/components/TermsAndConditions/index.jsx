import React from 'react';
import styled from 'styled-components';
import { secondaryText } from 'constants/colors';
import Link from 'components/Link';

const Wrapper = styled.div`
  text-align: center;
  color: ${secondaryText};
  font-size: 12px;
`;

const TermsAndConditions = () => (
  <Wrapper>
    All purchasesare subject to out <Link href="#" target="_blank">Terms and Conditions</Link>
  </Wrapper>
);

export default TermsAndConditions;
