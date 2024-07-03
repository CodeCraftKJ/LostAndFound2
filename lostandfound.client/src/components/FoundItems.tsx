import React from 'react';
import { FoundItem } from '../types';

interface FoundItemsProps {
    items: FoundItem[];
}

const FoundItems: React.FC<FoundItemsProps> = ({ items }) => {
    return (
        <div>
            {items.map(item => (
                <div key={item.foundItemID} className="item-container">
                    <h3>{item.title}</h3>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Date Found:</strong> {new Date(item.dateFound).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default FoundItems;
