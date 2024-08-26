import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from './ShoppingSlice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
});

export default store;
