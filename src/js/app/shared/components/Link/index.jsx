import styled from 'styled-components';
import { secondaryText, mutted } from 'constants/colors';

export default styled.a`
  border-bottom: 1px solid ${mutted};
  cursor: pointer;
  color: ${secondaryText};
  text-decoration: none;
`;
