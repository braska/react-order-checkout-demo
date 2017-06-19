import {
  GO_TO_STEP,
  SAVE_STEP_DATA,
} from '../actions/form';

const initialState = {
  step: 1,
  shippingInfo: {
    name: '',
    phone: '',
    streetAddress: '',
    addressComment: '',
    city: '',
    country: '',
    zip: '',
  },
  billingInfo: {
    name: '',
    email: '',
    streetAddress: '',
    addressComment: '',
    city: '',
    country: '',
    zip: '',
  },
  paymentInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GO_TO_STEP:
      return {
        ...state,
        step: action.payload.step,
      };
    case SAVE_STEP_DATA:
      return {
        ...state,
        [action.payload.step]: action.payload.data,
        step: state.step + 1,
      };
    default:
      return state;
  }
};
