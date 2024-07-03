import React, { useState } from 'react';
import { addLostItem } from '../services/api';
import { LostItem } from '../types';

const LostItemForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitLost = async (event: React.FormEvent) => {
        event.preventDefault();

        const lostItem: LostItem = {
            title,
            description,
            location,
            dateLost: new Date().toISOString(), // Automatycznie generowana data
            user: {
                email,
                userName,
                passwordHash: password,
            },
        };

        try {
            const response = await addLostItem(lostItem);
            console.log('Added lost item:', response);
            clearForm();
        } catch (error) {
            console.error('Failed to add lost item', error);
        }
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setLocation('');
        setUserName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <h2>Add Lost Item</h2>
            <form onSubmit={handleSubmitLost}>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
                <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
                <input type="text" placeholder="User Name" value={userName} onChange={e => setUserName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Add Lost Item</button>
            </form>
        </div>
    );
};

export default LostItemForm;
