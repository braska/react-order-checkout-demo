import React, { Component } from 'react';
import geocoder from 'services/geocoder';
import { getSuggestions, getSuggestionValue, getByCode } from 'services/countries';
import StepOne from '../components/StepOne';

export default class StepOneContainer extends Component {
  state = {
    name: '',
    phone: '',
    streetAddress: '',
    addressComment: '',
    city: '',
    country: '',
    zip: '',
    allowedGeolocation: !!navigator.geolocation,
    loadingGeolocation: false,
    countrySuggestions: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleFieldChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleCountryInputChange = (event, { newValue }) => {
    this.setState({
      country: newValue,
    });
  };

  handleSuggestionsFetchRequest = ({ value }) => {
    this.setState({
      countrySuggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequest = () => {
    this.setState({
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
        this.setState({
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
    this.setState({ loadingGeolocation: false });
  };

  geoAutocomplete = () => {
    if (this.state.allowedGeolocation) {
      this.setState({ loadingGeolocation: true }, () => {
        navigator.geolocation.getCurrentPosition(this.handlePosition, this.handleGeolocationError);
      });
    }
  };

  render() {
    return (
      <StepOne
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleFieldChange={this.handleFieldChange}
        geoAutocomplete={this.geoAutocomplete}
        handleCountryInputChange={this.handleCountryInputChange}
        handleSuggestionsFetchRequest={this.handleSuggestionsFetchRequest}
        handleSuggestionsClearRequest={this.handleSuggestionsClearRequest}
        getSuggestionValue={getSuggestionValue}
      />
    );
  }
}
