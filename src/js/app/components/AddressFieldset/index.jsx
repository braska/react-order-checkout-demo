import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Row, Fieldset, Legend, Input, SelectWithAutosuggest } from 'components/Form';
import GpsIcon from 'icons/gps';
import { primary } from 'constants/colors';


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

const getError = (errors, field) => (errors[field] ? errors[field][0] : undefined);

const AddressFieldset = props => (
  <Fieldset>
    <Legend>{props.legend}</Legend>
    <Input
      type="text"
      placeholder="Street Address"
      value={props.streetAddress}
      error={getError(props.errors, 'streetAddress')}
      onChange={props.handleFieldChange('streetAddress')}
    />
    <Input
      type="text"
      placeholder="Apt, Suite, Bldg, Gate Code. (optional)"
      value={props.addressComment}
      error={getError(props.errors, 'addressComment')}
      onChange={props.handleFieldChange('addressComment')}
    />
    <Input
      type="text"
      placeholder="City"
      value={props.city}
      error={getError(props.errors, 'city')}
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
          error={getError(props.errors, 'country')}
        />
      </CountryCol>
      <ZipCol>
        <Input
          type="text"
          placeholder="ZIP"
          value={props.zip}
          error={getError(props.errors, 'zip')}
          onChange={props.handleFieldChange('zip')}
        />
      </ZipCol>
    </Row>
  </Fieldset>
);

AddressFieldset.propTypes = {
  handleFieldChange: PropTypes.func.isRequired,
  geoAutocomplete: PropTypes.func.isRequired,
  handleCountryInputChange: PropTypes.func.isRequired,
  handleSuggestionsFetchRequest: PropTypes.func.isRequired,
  handleSuggestionsClearRequest: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  streetAddress: PropTypes.string.isRequired,
  addressComment: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  allowedGeolocation: PropTypes.bool.isRequired,
  loadingGeolocation: PropTypes.bool.isRequired,
  countrySuggestions: PropTypes.arrayOf(PropTypes.shape({
    long_name: PropTypes.string.isRequired,
    short_name: PropTypes.string.isRequired,
  })).isRequired,
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  legend: PropTypes.string.isRequired,
};

export default AddressFieldset;
