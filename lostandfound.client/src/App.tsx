import React, { useState, useEffect } from 'react';
import LostItems from './components/LostItems';
import FoundItems from './components/FoundItems';
import LostItemForm from './components/LostItemForm';
import FoundItemForm from './components/FoundItemForm';
import { fetchLostItems, fetchFoundItems } from './services/api';
import { LostItem, FoundItem } from './types';

const App: React.FC = () => {
    const [lostItems, setLostItems] = useState<LostItem[]>([]);
    const [foundItems, setFoundItems] = useState<FoundItem[]>([]);

    const refreshLostItems = async () => {
        try {
            const items = await fetchLostItems();
            setLostItems(items);
        } catch (error) {
            console.error('Failed to fetch lost items:', error);
        }
    };

    const refreshFoundItems = async () => {
        try {
            const items = await fetchFoundItems();
            setFoundItems(items);
        } catch (error) {
            console.error('Failed to fetch found items:', error);
        }
    };

    useEffect(() => {
        refreshLostItems();
        refreshFoundItems();
    }, []);

    return (
        <div className="App">
            <div className="section">
                <h1>Lost/Found something valuable?</h1>
                <p>Register your lost item, report a found item, and let us assist you!</p>
            </div>
            <div className="section">
                <h2>Lost Items - Have you seen any of these?</h2>
                <LostItems items={lostItems} />
            </div>
            <div className="section">
                <p>If someone finds your item, you will be informed via email</p>
                <LostItemForm refreshList={refreshLostItems} />
            </div>
            <div className="section">
                <h2>Found Items - Thanks to you, we've already located so many!</h2>
                <FoundItems items={foundItems} />
            </div>
            <div className="section">
                <p>If you found any of lost items, post info here!!</p>
                <FoundItemForm refreshList={refreshFoundItems} />
            </div>
        </div>
    );
};

export default App;
