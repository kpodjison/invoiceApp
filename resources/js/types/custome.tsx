import { ReactNode } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface Auth {
    user: User; 
    admin: object | null; 
}

declare interface Flash {
    type: 'success' | 'error';
    message?: string |null;
}

interface InertiaProps {
    auth: Auth;
    flash: Flash;
    [key: string]: any;
}


interface CardProps {
    icon: string;
    number: number | ReactNode;
    bg: string;
    label: ReactNode;
}

declare interface Invoice {
    id: number; 
    date: string;
    description: string; 
    status: string; 
    total: string;
}

interface ICustomer {
    id: number;
    name: string;
    email: string;
    phone: string;
    cs_number: string;
    type: string;
    street: string;
    city: string;
    postcode: string;
    created_at: string; // ISO date string
}