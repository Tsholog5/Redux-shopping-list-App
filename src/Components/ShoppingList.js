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
  const [newNote, setNewNote] = useState('');

  const handleEdit = (item) => {
    setEditMode(item.id);
    setNewItemName(item.name);
    setNewNote(item.note);
  };

  const handleUpdate = (itemId) => {
    if (newItemName.trim()) {
      dispatch(editItem({ id: itemId, name: newItemName, note: newNote }));
      setEditMode(null);
    }
  };

  return (
    <table className="shopping-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Size</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {shoppingList.map((item) => (
          <tr key={item.id} className={item.bought ? 'bought' : ''}>
            {editMode === item.id ? (
              <>
                <td colSpan={4}>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleUpdate(item.id)}
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}>
                    Update
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.size}</td>
                <td>{item.note}</td>
                <td className="item-actions">
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
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}>
                    Remove
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShoppingList;
