import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Title from 'components/Title';
import { Fieldset, Legend, Button, Input, Help, SelectWithAutosuggest } from 'components/Form';
import GpsIcon from 'icons/gps';
import { primary } from 'constants/colors';

const Row = styled.div`
  ${breakpoint('tablet')`
    display: flex;
    align-items: center;
  `};
`;

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

const blinker = keyframes`
  50% { opacity: 0; }
`;

const StyledGpsIcon = styled(GpsIcon)`
  fill: ${primary};
  cursor: pointer;
  animation: ${props => (props.blink ? `${blinker}  1s linear infinite` : 'none')};
`;

const CountryCol = styled.div`
  ${breakpoint('tablet')`
    min-width: 230px;
  `};
`;

const ZipCol = styled.div`
  ${breakpoint('tablet')`
    margin-left: 8px;
  `};
`;

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
          onChange={props.handleFieldChange('name')}
        />
        <Row>
          <PhoneInputCol>
            <Input
              type="text"
              placeholder="Daytime Phone"
              value={props.phone}
              onChange={props.handleFieldChange('phone')}
            />
          </PhoneInputCol>
          <HelpCol>
            <Help>For delivery questions only</Help>
          </HelpCol>
        </Row>
      </Fieldset>
      <Fieldset>
        <Legend>Address</Legend>
        <Input
          type="text"
          placeholder="Street Address"
          value={props.streetAddress}
          onChange={props.handleFieldChange('streetAddress')}
        />
        <Input
          type="text"
          placeholder="Apt, Suite, Bldg, Gate Code. (optional)"
          value={props.addressComment}
          onChange={props.handleFieldChange('addressComment')}
        />
        <Input
          type="text"
          placeholder="City"
          value={props.city}
          onChange={props.handleFieldChange('city')}
          rightIcon={
            props.allowedGeolocation
            ? <StyledGpsIcon
              size={24}
              onClick={props.geoAutocomplete}
              blink={props.loadingGeolocation}
            />
            : undefined
          }
        />
        <Row>
          <CountryCol>
            <SelectWithAutosuggest
              shouldRenderSuggestions={() => true}
              suggestions={props.countrySuggestions}
              onSuggestionsFetchRequested={props.handleSuggestionsFetchRequest}
              onSuggestionsClearRequested={props.handleSuggestionsClearRequest}
              getSuggestionValue={props.getSuggestionValue}
              renderSuggestion={suggestion => (
                <div>
                  {suggestion.long_name}
                </div>
              )}
              inputProps={{
                value: props.country,
                onChange: props.handleCountryInputChange,
                placeholder: 'Country',
              }}
            />
          </CountryCol>
          <ZipCol>
            <Input
              type="text"
              placeholder="ZIP"
              value={props.zip}
              onChange={props.handleFieldChange('zip')}
            />
          </ZipCol>
        </Row>
      </Fieldset>
      <Button type="submit">Continue</Button>
    </form>
  </div>
);

StepOne.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  geoAutocomplete: PropTypes.func.isRequired,
  handleCountryInputChange: PropTypes.func.isRequired,
  handleSuggestionsFetchRequest: PropTypes.func.isRequired,
  handleSuggestionsClearRequest: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  streetAddress: PropTypes.string.isRequired,
  addressComment: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  allowedGeolocation: PropTypes.bool.isRequired,
  loadingGeolocation: PropTypes.bool.isRequired,
  countrySuggestions: PropTypes.arrayOf(PropTypes.shape({
    long_name: PropTypes.string.isRequired,
    short_name: PropTypes.string.isRequired,
  })).isRequired,
};

export default StepOne;
