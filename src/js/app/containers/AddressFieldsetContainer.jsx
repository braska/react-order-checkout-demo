import React, { Component } from 'react';
import PropTypes from 'prop-types';
import geocoder from 'services/geocoder';
import { getSuggestions, getSuggestionValue, getByCode } from 'services/countries';
import AddressFieldset from '../components/AddressFieldset';

export default class AddressFieldsetContainer extends Component {
  static propTypes = {
    setValues: PropTypes.func.isRequired,
    allowedGeolocation: PropTypes.bool.isRequired,
  };

  handleFieldChange = field => (event) => {
    this.props.setValues({
      [field]: event.target.value,
    });
  };

  handleCountryInputChange = (event, { newValue }) => {
    this.props.setValues({
      country: newValue,
    });
  };

  handleSuggestionsFetchRequest = ({ value }) => {
    this.props.setValues({
      countrySuggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequest = () => {
    this.props.setValues({
      countrySuggestions: [],
    });
  };

  handlePosition = (pos) => {
    geocoder(pos.coords.latitude, pos.coords.longitude, {
      language: 'en',
      result_type: 'country|postal_code',
    })
      .then((response) => {
        const country = getByCode(response.data.results[1].address_components[0].short_name)
          .long_name;
        const zip = response.data.results[0].address_components[0].long_name;
        const city = response.data.results[0].address_components[1].long_name;
        this.props.setValues({
          country,
          zip,
          city,
          loadingGeolocation: false,
        });
      })
      .catch(() => {
        this.handleGeolocationError({ code: 'GEOCODER_ERROR' });
      });
  };

  handleGeolocationError = (error) => {
    /* eslint-disable no-alert */
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('Permission was denied');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Position is currently unavailable.');
        break;
      case error.PERMISSION_DENIED_TIMEOUT:
        alert('You took to long to grant/deny permission.');
        break;
      case error.UNKNOWN_ERROR:
      default:
        alert('An unknown error occurred.');
        break;
    }
    /* eslint-enable no-alert */
    this.props.setValues({ loadingGeolocation: false });
  };

  geoAutocomplete = () => {
    if (this.props.allowedGeolocation) {
      this.props.setValues({ loadingGeolocation: true }, () => {
        navigator.geolocation.getCurrentPosition(this.handlePosition, this.handleGeolocationError);
      });
    }
  };

  render() {
    return (
      <AddressFieldset
        {...this.props}
        getSuggestionValue={getSuggestionValue}
        handleFieldChange={this.handleFieldChange}
        geoAutocomplete={this.geoAutocomplete}
        handleCountryInputChange={this.handleCountryInputChange}
        handleSuggestionsFetchRequest={this.handleSuggestionsFetchRequest}
        handleSuggestionsClearRequest={this.handleSuggestionsClearRequest}
      />
    );
  }
}
