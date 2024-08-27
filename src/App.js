import React from 'react';
import { Route, Router, Routes } from 'react-router';
import ShoppingList from './Components/ShoppingList';
import AddItemForm from  './Components/AddItemForm';
import './App.css'; 
import Login from './Components/Login';
import Register from './Components/Register';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AddItemForm" element={<PrivateRoute element={<AddItemForm/>} />} />
    </Routes>
  );
};

export default App;
