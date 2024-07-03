import { useState, useEffect } from 'react';
import { FoundItem } from '../types';
import { fetchFoundItems, deleteFoundItem } from '../services/api';

const FoundItems = () => {
    const [foundItems, setFoundItems] = useState<FoundItem[]>([]);

    useEffect(() => {
        const loadFoundItems = async () => {
            try {
                const items = await fetchFoundItems();
                setFoundItems(items);
            } catch (error) {
                console.error('Failed to fetch found items', error);
            }
        };
        loadFoundItems();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteFoundItem(id);
            setFoundItems(foundItems.filter(item => item.foundItemID !== id));
        } catch (error) {
            console.error('Failed to delete found item', error);
        }
    };

    return (
        <div>
            <h2>Found Items</h2>
            <ul>
                {foundItems.map(item => (
                    <li key={item.foundItemID}>
                        {item.title} - {item.description}
                        <button onClick={() => handleDelete(item.foundItemID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoundItems;
