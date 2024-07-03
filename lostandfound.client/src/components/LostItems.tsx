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
                        {item.title} - {item.description}
                        <button onClick={() => handleDelete(item.lostItemID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LostItems;
