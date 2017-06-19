import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from 'components/Title';
import TitleRow from 'components/TitleRow';
import LockIcon from 'icons/lock';
import { secondaryText } from 'constants/colors';
import { Input, Button } from 'components/Form';

const StyledLockIcon = styled(LockIcon)`
  width: 32px;
  height: 32px;
`;

const Info = styled.span`
  color: ${secondaryText};
  font-size: 15px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const ExpireDateCol = styled.div`
  input {
    width: 100px;
  }
`;

const CodeCol = styled.div`
  margin-left: 24px;

  input {
    width: 100px;
  }
`;

const getError = (errors, field) => (errors[field] ? errors[field][0] : undefined);

const StepThree = props => (
  <div>
    <TitleRow>
      <Title>Payment</Title>
    </TitleRow>
    <p>
      <StyledLockIcon preserveAspectRatio="none" />
      <Info>This is secure 128-bit SSL encrypted payment</Info>
    </p>
    <form onSubmit={props.handleSubmit}>
      <Input
        type="text"
        label="Cardholder name"
        placeholder="Name as it appears on your card"
        value={props.name}
        error={getError(props.errors, 'name')}
        onChange={props.handleNameChange}
      />
      <Input
        type="text"
        label="Card Number"
        placeholder="XXXX XXXX XXXX XXXX"
        value={props.number}
        error={getError(props.errors, 'number')}
        onChange={props.handleNumberChange}
      />
      <Row>
        <ExpireDateCol>
          <Input
            type="text"
            label="Expire Date"
            placeholder="MM / YY"
            value={props.expireDate}
            error={getError(props.errors, 'expireDate')}
            onChange={props.handleExpireDateChange}
          />
        </ExpireDateCol>
        <CodeCol>
          <Input
            type="text"
            label="Security Code"
            value={props.code}
            error={getError(props.errors, 'code')}
            onChange={props.handleCodeChange}
          />
        </CodeCol>
      </Row>
      <Button type="submit">Pay Securely</Button>
    </form>
  </div>
);

/* eslint-disable */
StepThree.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleExpireDateChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
  handleCodeChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  expireDate: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default StepThree;
