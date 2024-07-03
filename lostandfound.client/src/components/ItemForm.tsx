import React, { useState } from 'react';
import { LostItem, FoundItem } from '../types';
import { addLostItem, addFoundItem } from '../services/api';

const ItemForm = () => {
    const [type, setType] = useState<'lost' | 'found'>('lost');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === 'lost') {
            const newLostItem: LostItem = {
                lostItemID: 0,
                title,
                description,
                location,
                dateLost: new Date().toISOString(),
                userID: 1,
                user: { userID: 1, email: 'user@example.com', userName: 'User' },
            };
            try {
                await addLostItem(newLostItem);
                setTitle('');
                setDescription('');
                setLocation('');
            } catch (error) {
                console.error('Failed to add lost item', error);
            }
        } else {
            const newFoundItem: FoundItem = {
                foundItemID: 0,
                title,
                description,
                location,
                dateFound: new Date().toISOString(),
                userID: 1,
                user: { userID: 1, email: 'user@example.com', userName: 'User' },
            };
            try {
                await addFoundItem(newFoundItem);
                setTitle('');
                setDescription('');
                setLocation('');
            } catch (error) {
                console.error('Failed to add found item', error);
            }
        }
    };

    return (
        <div>
            <h2>Add {type === 'lost' ? 'Lost' : 'Found'} Item</h2>
            <form onSubmit={handleSubmit}>
                <select value={type} onChange={(e) => setType(e.target.value as 'lost' | 'found')}>
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                </select>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default ItemForm;
