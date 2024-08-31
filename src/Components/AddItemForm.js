import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem, selectItems } from '../ReduxStore/ShoppingSlice';
import ShoppingList from './ShoppingList';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Fruit and Vegetable');
  const [quantity, setQuantity] = useState('1');
  const [size, setSize] = useState('Small');
  const [note, setNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    cellNumber: '',
    email: '',
    Age: '', // Updated to correct key from 'phoneNumbers' to 'Age'
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectItems);

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

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/');
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    setShowProfileForm(false);
    setIsEditing(false); // Reset edit mode after saving
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setShowProfileForm(true); // Show the profile form in edit mode
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>SHOPPING LIST</h1>

        <div>
          <button
            onClick={() => setShowProfileForm(!showProfileForm)}
            style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </div>

      {showProfileForm && (
        <form onSubmit={handleProfileSubmit} className="profile-form" style={{ marginTop: '20px', padding: '20px', gap: '3px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Profile</h2>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Name"
            style={{ padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            name="surname"
            value={profile.surname}
            onChange={handleProfileChange}
            placeholder="Surname"
            style={{ padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            name="cellNumber"
            value={profile.cellNumber}
            onChange={handleProfileChange}
            placeholder="Cell Number"
            style={{ padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Email"
            style={{ padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            name="Age"
            value={profile.Age}
            onChange={handleProfileChange}
            placeholder="Age"
            style={{ padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
            Save Profile
          </button>
          <button
            type="button"
            onClick={handleEditProfile}
            style={{ padding: '10px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Edit Profile
          </button>
        </form>
      )}

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

      {items.length > 0 && (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search item..."
            className="search-input"
          />

          <ShoppingList searchTerm={searchTerm} />
        </>
      )}
    </div>
  );
};

export default AddItem;
