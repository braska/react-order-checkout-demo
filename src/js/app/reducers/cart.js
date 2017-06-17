import Pic1 from '../components/OrderSummary/assets/1.png';
import Pic2 from '../components/OrderSummary/assets/2.png';
import Pic3 from '../components/OrderSummary/assets/3.png';
import {
  SET_QUANTITY,
  DELETE_ITEM,
  TOGGLE_EDIT_MODE,
} from '../actions/cart';

const initialState = {
  items: [
    {
      id: 1,
      title: 'The chelsea boot',
      price: 235,
      description: 'Black',
      quatity: 1,
      img: Pic1,
    },
    {
      id: 2,
      title: 'The twill snap backpack',
      price: 65,
      description: 'Reverse denim + Broken leather',
      quatity: 1,
      img: Pic2,
    },
    {
      id: 3,
      title: 'The twill zip tone',
      price: 48,
      description: 'Reverse denim + Black leather',
      quatity: 1,
      img: Pic3,
    },
  ],
  editMode: false,
  itemsCopy: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUANTITY: {
      const itemsCopy = state.itemsCopy.map(item => ({ ...item }));
      itemsCopy[action.payload.index].quatity = action.payload.quatity;
      return { ...state, itemsCopy };
    }
    case TOGGLE_EDIT_MODE: {
      return {
        ...state,
        editMode: !state.editMode,
        itemsCopy: state.editMode ? [] : state.items.map(item => ({ ...item })),
        items: state.editMode && action.payload.save
          ? state.itemsCopy.map(item => ({ ...item }))
          : state.items.map(item => ({ ...item })),
      };
    }
    case DELETE_ITEM: {
      const itemsCopy = state.itemsCopy.map(item => ({ ...item }));
      itemsCopy.splice(action.payload.index, 1);
      return {
        ...state,
        itemsCopy,
      };
    }
    default:
      return state;
  }
};
