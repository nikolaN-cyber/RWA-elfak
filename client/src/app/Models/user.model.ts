export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    imagePath: string;
    role: string;
    access_token: string;
}

export interface UpdateUser {
    name: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    imagePath: string;
}

export interface RegisterUser {
    name: string;
    lastName: string;
    phone: string;
    address: string;
    email: string;
    password: string;
    imagePath: string;
}