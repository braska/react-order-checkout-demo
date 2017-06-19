import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkit from 'checkit';
import { connect } from 'react-redux';
import cardValidator from 'card-validator';
import { saveStepData } from '../actions/form';
import StepThree from '../components/StepThree';

@connect(state => state.form.paymentInfo, { saveStepData: data => saveStepData('paymentInfo', data) })
export default class StepThreeContainer extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    expireDate: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    saveStepData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.checkit = new Checkit({
      name: {
        rule: 'required',
        message: 'Please enter cardholder name',
      },
      number: [{
        rule: 'required',
        message: 'Please enter card number',
      }, (input) => {
        const isValid = cardValidator.number(input).isValid;
        if (!isValid) {
          throw new Error('Card number is invalid');
        }
      }],
      expireDate: [{
        rule: 'required',
        message: 'Please enter expire date',
      }, (input) => {
        const isValid = cardValidator.expirationDate(input).isValid;
        if (!isValid) {
          throw new Error('Expire date is invalid');
        }
      }],
      code: [{
        rule: 'required',
        message: 'Please enter security code',
      }, (input) => {
        const isValid = cardValidator.cvv(input, [3, 4]).isValid;
        if (!isValid) {
          throw new Error('Security code is invalid');
        }
      }],
    });
    this.state = {
      name: this.props.name,
      number: this.props.number,
      expireDate: this.props.expireDate,
      code: this.props.code,
      errors: {},
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value.toUpperCase(),
    });
  };

  handleNumberChange = (event) => {
    this.setState({
      number: cardValidator.number(event.target.value).isPotentiallyValid
        ? event.target.value
        : this.state.number,
    });
  };

  handleExpireDateChange = (event) => {
    let value = event.target.value;
    if (value.length > this.state.expireDate.length && value.length === 2) {
      value += ' / ';
    }
    this.setState({
      expireDate: cardValidator.expirationDate(value).isPotentiallyValid
        ? value
        : this.state.expireDate,
    });
  };

  handleCodeChange = (event) => {
    this.setState({
      code: cardValidator.cvv(event.target.value, [3, 4]).isPotentiallyValid
        ? event.target.value
        : this.state.code,
    });
  };

  handleClick = () => {
    this.setState({
      errors: {},
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      number: this.state.number,
      expireDate: this.state.expireDate,
      code: this.state.code,
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

  render() {
    return (
      <StepThree
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleNameChange={this.handleNameChange}
        handleExpireDateChange={this.handleExpireDateChange}
        handleNumberChange={this.handleNumberChange}
        handleCodeChange={this.handleCodeChange}
      />
    );
  }
}
