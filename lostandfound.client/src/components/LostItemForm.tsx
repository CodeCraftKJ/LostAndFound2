import React, { useState } from 'react';
import { addLostItem } from '../services/api';
import { LostItem } from '../types';

interface LostItemFormProps {
    refreshList: () => void;
}

const LostItemForm: React.FC<LostItemFormProps> = ({ refreshList }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmitLost = async (event: React.FormEvent) => {
        event.preventDefault();

        const lostItem: LostItem = {
            title,
            description,
            location,
            dateLost: new Date().toISOString(),
            user: {
                email,
                userName,
            },
        };

        try {
            const response = await addLostItem(lostItem);
            console.log('Added lost item:', response);
            clearForm();
            refreshList();
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
    };

    return (
        <div className="form-container">
            <h2>Report a Lost Item</h2>
            <form onSubmit={handleSubmitLost}>
                <div className="form-item">
                    <label htmlFor="lost-item-title">Title:</label>
                    <input type="text" id="title" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="lost-item-description"
                        placeholder="Enter description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="lost-item-location" placeholder="Enter location" value={location} onChange={e => setLocation(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label htmlFor="userName">User Name:</label>
                    <input type="text" id="lost-item-userName" placeholder="Enter user name" value={userName} onChange={e => setUserName(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="lost-item-email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <button type="submit">Report a Lost Item</button>
            </form>
        </div>
    );
};

export default LostItemForm;
