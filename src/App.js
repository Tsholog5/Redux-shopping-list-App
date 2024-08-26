import React from 'react';
import ShoppingList from './Components/ShoppingList';
import AddItem from './Components/AddItemForm'; 
import './App.css'; 

function App() {
  return (
    <div className="App">
      <h1>Shopping List</h1>
      <AddItem />
      <ShoppingList />
    </div>
  );
}

export default App;
