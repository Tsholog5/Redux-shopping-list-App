import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, toggleBought, editItem } from '../ReduxStore/ShoppingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

const ShoppingList = () => {
  const shoppingList = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(null);
  const [newItemName, setNewItemName] = useState('');

  const handleEdit = (item) => {
    setEditMode(item.id);
    setNewItemName(item.name);
  };

  const handleUpdate = (itemId) => {
    if (newItemName.trim()) {
      dispatch(editItem({ id: itemId, name: newItemName }));
      setEditMode(null);
    }
  };

  return (
    <ul>
      {shoppingList.map((item) => (
        <li key={item.id} style={{ textDecoration: item.bought ? 'line-through' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {editMode === item.id ? (
            <>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <button
                onClick={() => handleUpdate(item.id)}
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}>
                Update
              </button>
            </>
          ) : (
            <>
              <span>{item.name}</span>
              <div>
                <button
                  onClick={() => dispatch(toggleBought(item.id))}
                  style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    color={item.bought ? 'green' : 'gray'}
                    size="lg"
                  />
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    color="blue"
                    size="lg"
                  />
                </button>
              </div>
            </>
          )}
          <button
            onClick={() => dispatch(removeItem(item.id))}
            style={{
              marginLeft: '10px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              textDecoration: 'none',
            }}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ShoppingList;
