import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../ReduxStore/ShoppingSlice';
import ShoppingList from './ShoppingList'; 

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Fruit and Vegetable');
  const [quantity, setQuantity] = useState('1');
  const [size, setSize] = useState('Small');
  const [note, setNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const shoppingList = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      dispatch(addItem({ itemName, category, quantity, size, note }));
      setItemName('');
      setCategory('Fruit and Vegetable');
      setQuantity('1');
      setSize('Small');
      setNote('');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredItems = shoppingList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-item-form">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item..."
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="Fruit and Vegetable">Fruit and Vegetable</option>
          <option value="Starch">Starch</option>
          <option value="Dairy">Dairy</option>
          <option value="Protein">Protein</option>
          <option value="Detergents">Detergents</option>
          <option value="Other">Other</option>
        </select>
        
        <select
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="form-select"
        >
          {[...Array(5).keys()].map(num => (
            <option key={num + 1} value={num + 1}>{num + 1}</option>
          ))}
          <option value="More">More</option>
        </select>
        
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="form-select"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Extra Large">Extra Large</option>
          <option value="N/A">N/A</option>
          
        </select>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note..."
          className="note-textarea"
        />
        
        <button type="submit" className="add-button">Add</button>
      </form>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search item..."
        className="search-input"
      />
      
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <ShoppingList /> 
    </div>
  );
};

export default AddItem;
