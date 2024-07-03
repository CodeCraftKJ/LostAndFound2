import React, { useState } from 'react';
import { addLostItem, addFoundItem } from '../services/api';
import { LostItem, FoundItem } from '../types';

const ItemForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
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
                passwordHash: password, // Przyjêcie has³a, jeœli to wymagane
            },
        };

        try {
            const response = await addLostItem(lostItem);
            console.log('Added lost item:', response);
            // Mo¿na dodaæ tutaj dalsz¹ logikê, np. wyczyszczenie formularza
            clearForm();
        } catch (error) {
            console.error('Failed to add lost item', error);
        }
    };

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
                passwordHash: password, // Przyjêcie has³a, jeœli to wymagane
            },
        };

        try {
            const response = await addFoundItem(foundItem);
            console.log('Added found item:', response);
            // Mo¿na dodaæ tutaj dalsz¹ logikê, np. wyczyszczenie formularza
            clearForm();
        } catch (error) {
            console.error('Failed to add found item', error);
        }
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setLocation('');
        setDate('');
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
                <input type="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} required />
                <input type="text" placeholder="User Name" value={userName} onChange={e => setUserName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Add Lost Item</button>
            </form>

            {/* Dodatkowo, mo¿na dodaæ formularz dla found items, np.: */}
            {/* <h2>Add Found Item</h2>
            <form onSubmit={handleSubmitFound}>
                ... input fields for found items ...
                <button type="submit">Add Found Item</button>
            </form> */}
        </div>
    );
};

export default ItemForm;
