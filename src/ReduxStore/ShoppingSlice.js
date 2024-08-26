import { createSlice } from '@reduxjs/toolkit';

export const shoppingSlice = createSlice({
  name: 'shoppingList',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      
      state.push({ 
        id: Date.now(), 
        name: action.payload.itemName, 
        category: action.payload.category,
        quantity: action.payload.quantity,
        size: action.payload.size,
        note: action.payload.note || '', 
        bought: false 
      });
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    toggleBought: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.bought = !item.bought;
      }
    },
    editItem: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.name = action.payload.name;
        item.note = action.payload.note || ''; 
      }
    },
  },
});

export const { addItem, removeItem, toggleBought, editItem } = shoppingSlice.actions;
export default shoppingSlice.reducer;
