export interface User {
    //userID: number;
    email: string;
    passwordHash: string;
    userName: string;
}

export interface LostItem {
    lostItemID: number;
    title: string;
    description: string;
    location: string;
    dateLost: string;
    userID: number;
    user: User;
}

export interface FoundItem {
    foundItemID: number;
    title: string;
    description: string;
    location: string;
    dateFound: string;
    userID: number;
    user: User;
}
