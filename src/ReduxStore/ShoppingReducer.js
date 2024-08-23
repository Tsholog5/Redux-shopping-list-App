import { ADD_ITEM, REMOVE_ITEM, TOGGLE_ITEM } from '../actions/types';

const initialState = {
  items: [],
};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: Date.now(), bought: false }],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case TOGGLE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, bought: !item.bought } : item
        ),
      };
    default:
      return state;
  }
};

export default shoppingListReducer;
