export const GO_TO_STEP = 'GO_TO_STEP';
export const SAVE_STEP_DATA = 'SAVE_STEP_DATA';

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
