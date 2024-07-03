import React, { useState } from 'react';
import { addFoundItem } from '../services/api';
import { FoundItem } from '../types';

const FoundItemForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitFound = async (event: React.FormEvent) => {
        event.preventDefault();

        const foundItem: FoundItem = {
            title,
            description,
            location,
            dateFound: new Date().toISOString(), // Automatycznie generowana data
            user: {
                email,
                userName,
                passwordHash: password,
            },
        };

        try {
            const response = await addFoundItem(foundItem);
            console.log('Added found item:', response);
            clearForm();
        } catch (error) {
            console.error('Failed to add found item', error);
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
            <h2>Add Found Item</h2>
            <form onSubmit={handleSubmitFound}>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
                <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
                <input type="text" placeholder="User Name" value={userName} onChange={e => setUserName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Add Found Item</button>
            </form>
        </div>
    );
};

export default FoundItemForm;
