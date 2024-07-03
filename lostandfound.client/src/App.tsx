import React from 'react';
import './App.css';
import LostItems from './components/LostItems';
import FoundItems from './components/FoundItems';
import ItemForm from './components/ItemForm';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Lost and Found Items</h1>
            <div className="section">
                <h2>Lost Items</h2>
                <LostItems />
            </div>
            <div className="section">
                <h2>Found Items</h2>
                <FoundItems />
            </div>
            <div className="section">
                <h2>Add New Item</h2>
                <ItemForm />
            </div>
        </div>
    );
};

export default App;
