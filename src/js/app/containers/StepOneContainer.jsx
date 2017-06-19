import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkit from 'checkit';
import geocoder from 'services/geocoder';
import { getSuggestions, getSuggestionValue, getByCode } from 'services/countries';
import StepOne from '../components/StepOne';
import { saveStepData } from '../actions/form';

@connect(state => state.form.shippingInfo, { saveStepData: data => saveStepData('shippingInfo', data) })
export default class StepOneContainer extends Component {
  static propTypes = {
    saveStepData: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    streetAddress: PropTypes.string.isRequired,
    addressComment: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.checkit = new Checkit({
      name: {
        rule: 'required',
        message: 'Please enter recipient full name',
      },
      phone: {
        rule: 'required',
        message: 'Please enter phone number',
      },
      streetAddress: {
        rule: 'required',
        message: 'Please enter street address',
      },
      city: {
        rule: 'required',
        message: 'Please enter city',
      },
      country: {
        rule: 'required',
        message: 'Please enter country',
      },
      zip: {
        rule: 'required',
        message: 'Please enter postal code',
      },
    });
    this.state = {
      name: this.props.name,
      phone: this.props.phone,
      streetAddress: this.props.streetAddress,
      addressComment: this.props.addressComment,
      city: this.props.city,
      country: this.props.country,
      zip: this.props.zip,
      allowedGeolocation: !!navigator.geolocation,
      loadingGeolocation: false,
      countrySuggestions: [],
      errors: {},
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
  }

  handleClick = () => {
    this.setState({
      errors: {},
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      phone: this.state.phone,
      streetAddress: this.state.streetAddress,
      addressComment: this.state.addressComment,
      city: this.state.city,
      country: this.state.country,
      zip: this.state.zip,
    };
    this.checkit
      .run(data)
      .then(() => {
        this.props.saveStepData(data);
      })
      .catch((err) => {
        if (!(err instanceof Checkit.Error)) {
          throw err;
        }
        this.setState({
          errors: err.toJSON(),
        });
      });
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
