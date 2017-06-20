import {
  GO_TO_STEP,
  SAVE_STEP_DATA,
  PROCESS_ORDER,
  PROCESS_ORDER_SUCCESS,
  PROCESS_ORDER_FAIL,
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
  paymentInfo: {
    name: '',
    number: '',
    expireDate: '',
    code: '',
  },
  result: {
    loading: true,
    error: false,
  },
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
    case PROCESS_ORDER:
      return {
        ...state,
        result: initialState.result,
      };
    case PROCESS_ORDER_SUCCESS:
      return {
        ...state,
        result: {
          loading: false,
          error: false,
          data: action.payload,
        },
      };
    case PROCESS_ORDER_FAIL:
      return {
        ...state,
        result: {
          loading: false,
          error: true,
        },
      };
    default:
      return state;
  }
};
