export const GO_TO_STEP = 'GO_TO_STEP';
export const SAVE_STEP_DATA = 'SAVE_STEP_DATA';
export const PROCESS_ORDER = 'PROCESS_ORDER';
export const PROCESS_ORDER_SUCCESS = 'PROCESS_ORDER_SUCCESS';
export const PROCESS_ORDER_FAIL = 'PROCESS_ORDER_FAIL';

export function goToStep(step) {
  return {
    type: GO_TO_STEP,
    payload: { step },
  };
}

export function saveStepData(step, data) {
  return {
    type: SAVE_STEP_DATA,
    payload: { step, data },
  };
}

export function processOrder() {
  return {
    type: PROCESS_ORDER,
  };
}

export function processOrderSuccess(payload) {
  return {
    type: PROCESS_ORDER_SUCCESS,
    payload,
  };
}

export function processOrderFail() {
  return {
    type: PROCESS_ORDER_FAIL,
  };
}
