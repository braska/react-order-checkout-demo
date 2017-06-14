import React from 'react';
import styled from 'styled-components';
import { secondaryText, mutted } from 'constants/colors';

const Wrapper = styled.div`
  text-align: center;
  color: ${secondaryText};
  font-size: 12px;
`;

const Link = styled.a`
  border-bottom: 1px solid ${mutted};
  cursor: pointer;
  color: ${secondaryText};
  text-decoration: none;
`;

const TermsAndConditions = () => (
  <Wrapper>
    All purchasesare subject to out <Link href="#" target="_blank">Terms and Conditions</Link>
  </Wrapper>
);

export default TermsAndConditions;
