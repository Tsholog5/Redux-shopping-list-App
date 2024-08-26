import ShoppingList from './Components/ShoppingList';
import AddItem from './Components/AddItemForm';
import CSS from './App.css';

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
