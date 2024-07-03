import { LostItem, FoundItem } from '../types';

const API_BASE_URL = 'https://localhost:7057/api';

export const fetchLostItems = async (): Promise<LostItem[]> => {
    const response = await fetch(`${API_BASE_URL}/LostItems`);
    if (!response.ok) throw new Error('Failed to fetch lost items');
    return response.json();
};

export const fetchFoundItems = async (): Promise<FoundItem[]> => {
    const response = await fetch(`${API_BASE_URL}/FoundItems`);
    if (!response.ok) throw new Error('Failed to fetch found items');
    return response.json();
};

export const addLostItem = async (lostItem: LostItem): Promise<LostItem> => {
    const response = await fetch(`${API_BASE_URL}/LostItems`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lostItem),
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to add lost item');
    }
    return await response.json();
};

export const addFoundItem = async (foundItem: FoundItem): Promise<FoundItem> => {
    const response = await fetch(`${API_BASE_URL}/FoundItems`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(foundItem),
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to add found item');
    }
    return await response.json();
};

export const deleteLostItem = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/LostItems/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete lost item');
};

export const deleteFoundItem = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/FoundItems/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete found item');
};
