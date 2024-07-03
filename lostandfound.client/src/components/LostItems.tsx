import { useState, useEffect } from 'react';
import { LostItem } from '../types';
import { fetchLostItems, deleteLostItem } from '../services/api';

const LostItems = () => {
    const [lostItems, setLostItems] = useState<LostItem[]>([]);

    useEffect(() => {
        const loadLostItems = async () => {
            try {
                const items = await fetchLostItems();
                setLostItems(items);
            } catch (error) {
                console.error('Failed to fetch lost items', error);
            }
        };
        loadLostItems();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteLostItem(id);
            setLostItems(lostItems.filter(item => item.lostItemID !== id));
        } catch (error) {
            console.error('Failed to delete lost item', error);
        }
    };

    return (
        <div>
            <h2>Lost Items</h2>
            <ul>
                {lostItems.map(item => (
                    <li key={item.lostItemID}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <strong>{item.title}</strong> - {item.description}
                            </div>
                            <div>
                                <button onClick={() => handleDelete(item.lostItemID)}>Delete</button>
                            </div>
                        </div>
                        <div>
                            <p>Location: {item.location}</p>
                            <p>Date Lost: {new Date(item.dateLost).toLocaleDateString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LostItems;
