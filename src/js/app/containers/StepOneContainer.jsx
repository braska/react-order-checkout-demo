import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkit from 'checkit';
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

  setValues = (values, callback) => this.setState(values, callback);

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

  render() {
    return (
      <StepOne
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleFieldChange={this.handleFieldChange}
        setValues={this.setValues}
      />
    );
  }
}
