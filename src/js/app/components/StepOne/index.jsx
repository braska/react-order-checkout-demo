import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Title from 'components/Title';
import { Fieldset, Legend, Button, Input, Help, Row } from 'components/Form';
import AddressFieldsetContainer from '../../containers/AddressFieldsetContainer';

const PhoneInputCol = styled.div`
  ${breakpoint('tablet')`
    min-width: 230px;
  `};
`;

const HelpCol = styled.div`
  ${breakpoint('tablet')`
    margin-left: 8px;
  `};
`;

const getError = (errors, field) => (errors[field] ? errors[field][0] : undefined);

const StepOne = props => (
  <div>
    <Title>Shipping Info</Title>
    <form onSubmit={props.handleSubmit}>
      <Fieldset>
        <Legend>Recipient</Legend>
        <Input
          type="text"
          placeholder="Full Name"
          value={props.name}
          error={getError(props.errors, 'name')}
          onChange={props.handleFieldChange('name')}
        />
        <Row>
          <PhoneInputCol>
            <Input
              type="text"
              placeholder="Daytime Phone"
              value={props.phone}
              error={getError(props.errors, 'phone')}
              onChange={props.handleFieldChange('phone')}
            />
          </PhoneInputCol>
          <HelpCol>
            <Help>For delivery questions only</Help>
          </HelpCol>
        </Row>
      </Fieldset>
      <AddressFieldsetContainer {...props} legend="Address" />
      <Button type="submit">Continue</Button>
    </form>
  </div>
);

StepOne.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default StepOne;
