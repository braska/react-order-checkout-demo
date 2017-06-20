import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import { process } from 'services/orders';
import {
  SAVE_STEP_DATA,
  PROCESS_ORDER,
  processOrder,
  processOrderSuccess,
  processOrderFail,
} from '../actions/form';

function* onSaveStepData(action) {
  if (action.payload.step === 'paymentInfo') {
    yield put(processOrder());
  }
}

function* handleProcessOrder() {
  const wholeState = yield select(state => state);
  const data = {
    cart: wholeState.cart,
    shippingInfo: wholeState.form.shippingInfo,
    billingInfo: wholeState.form.billingInfo,
    paymentInfo: wholeState.form.paymentInfo,
  };
  try {
    const { data: response } = yield call(process, data);
    yield put(processOrderSuccess(response));
  } catch (error) {
    yield put(processOrderFail());
  }
}

export default function* () {
  yield all([
    yield takeEvery(SAVE_STEP_DATA, onSaveStepData),
    yield takeEvery(PROCESS_ORDER, handleProcessOrder),
  ]);
}
