import React from 'react';
import PropTypes from 'prop-types';
import Title from 'components/Title';
import { Fieldset, Legend, Button, Input } from 'components/Form';
import Link from 'components/Link';
import TitleRow from 'components/TitleRow';
import { primary } from 'constants/colors';
import AddressFieldsetContainer from '../../containers/AddressFieldsetContainer';

const FillAsShipping = Link.withComponent('div').extend`
  font-size: 14px;
  line-height: 23px;
  text-decoration: underline;
  border-bottom: none;
  margin-left: 8px;
  color: ${primary};
`;

const getError = (errors, field) => (errors[field] ? errors[field][0] : undefined);

const StepTwo = props => (
  <div>
    <TitleRow>
      <Title>Billing Info</Title>
      <FillAsShipping
        onClick={props.handleFillAsShipping}
      >
        Same as shipping
      </FillAsShipping>
    </TitleRow>
    <form onSubmit={props.handleSubmit}>
      <Fieldset>
        <Legend>Billing Contact</Legend>
        <Input
          type="text"
          placeholder="Full Name"
          value={props.name}
          error={getError(props.errors, 'name')}
          onChange={props.handleFieldChange('name')}
        />
        <Input
          type="email"
          placeholder="Email Address"
          value={props.email}
          error={getError(props.errors, 'email')}
          onChange={props.handleFieldChange('email')}
        />
      </Fieldset>
      <AddressFieldsetContainer {...props} legend="Billing Address" />
      <Button type="submit">Continue</Button>
    </form>
  </div>
);

StepTwo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleFillAsShipping: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default StepTwo;
