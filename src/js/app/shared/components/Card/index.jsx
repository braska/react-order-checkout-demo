import styled from 'styled-components';
import { shadow } from 'constants/colors';

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 0 24px ${shadow};
`;

export default Card;
