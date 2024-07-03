import React from 'react';
import './App.css';
import LostItems from './components/LostItems';
import FoundItems from './components/FoundItems';
import LostItemForm from './components/LostItemForm';
import FoundItemForm from './components/FoundItemForm';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Lost and Found Items</h1>

            <div className="section">
                <LostItems />
            </div>

            <div className="section">
                <LostItemForm />
            </div>

            <div className="section">
                <FoundItems />
            </div>

            <div className="section">
                <FoundItemForm />
            </div>
        </div>
    );
};

export default App;
