import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkit from 'checkit';
import StepTwo from '../components/StepTwo';
import { saveStepData } from '../actions/form';

@connect(state => ({
  ...state.form.billingInfo,
  shippingInfo: state.form.shippingInfo,
}), { saveStepData: data => saveStepData('billingInfo', data) })
export default class StepTwoContainer extends Component {
  static propTypes = {
    saveStepData: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    streetAddress: PropTypes.string.isRequired,
    addressComment: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    shippingInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      streetAddress: PropTypes.string.isRequired,
      addressComment: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.checkit = new Checkit({
      name: {
        rule: 'required',
        message: 'Please enter recipient full name',
      },
      email: [{
        rule: 'required',
        message: 'Please enter email address',
      }, 'email'],
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
      email: this.props.email,
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
      email: this.state.email,
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

  handleFillAsShipping = () => {
    this.setState({
      name: this.props.shippingInfo.name,
      streetAddress: this.props.shippingInfo.streetAddress,
      addressComment: this.props.shippingInfo.addressComment,
      city: this.props.shippingInfo.city,
      country: this.props.shippingInfo.country,
      zip: this.props.shippingInfo.zip,
    });
  };

  render() {
    return (
      <StepTwo
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleFieldChange={this.handleFieldChange}
        setValues={this.setValues}
        handleFillAsShipping={this.handleFillAsShipping}
      />
    );
  }
}
