import React, { useState } from 'react';
import { addFoundItem } from '../services/api';
import { FoundItem } from '../types';

interface FoundItemFormProps {
    refreshList: () => void;
}

const FoundItemForm: React.FC<FoundItemFormProps> = ({ refreshList }) => {
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
            dateFound: new Date().toISOString(),
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
            refreshList();
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
        <div className="form-container">
            <h2>Report a Found Item</h2>
            <form onSubmit={handleSubmitFound}>
                <div className="form-item">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        placeholder="Enter description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" placeholder="Enter location" value={location} onChange={e => setLocation(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label htmlFor="userName">User Name:</label>
                    <input type="text" id="userName" placeholder="Enter user name" value={userName} onChange={e => setUserName(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Report a Found Item</button>
            </form>
        </div>
    );
};

export default FoundItemForm;
