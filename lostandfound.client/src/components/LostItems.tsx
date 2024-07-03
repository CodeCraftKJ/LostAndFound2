import React from 'react';
import { LostItem } from '../types';

interface LostItemsProps {
    items: LostItem[];
}

const LostItems: React.FC<LostItemsProps> = ({ items }) => {
    return (
        <div>
            {items.map(item => (
                <div key={item.lostItemID} className="item-container">
                    <h3>{item.title}</h3>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Date Lost:</strong> {new Date(item.dateLost).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default LostItems;
