// src/components/AddItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../ReduxStore/ShoppingSlice';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      dispatch(addItem(itemName));
      setItemName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Add item..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItem;
