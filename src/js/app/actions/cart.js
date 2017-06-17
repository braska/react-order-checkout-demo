export const SET_QUANTITY = 'SET_QUANTITY';
export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';
export const DELETE_ITEM = 'DELETE_ITEM';

export function setQuantity(index, quatity) {
  return {
    type: SET_QUANTITY,
    payload: { index, quatity },
  };
}

export function toggleEditMode(save) {
  return {
    type: TOGGLE_EDIT_MODE,
    payload: { save },
  };
}

export function deleteItem(index) {
  return {
    type: DELETE_ITEM,
    payload: { index },
  };
}
