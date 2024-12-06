export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    };


    import { ReactNode } from "react";

    export interface User {
        id: number;
        name: string;
        email: string;
    }

    interface Auth {
    export     user: User;
        admin: object | null;
    }

    export declare interface Flash {
        type: "success" | "error";
        message?: string | null;
    }

    export interface InertiaProps {
        auth: Auth;
        flash: Flash;
        [key: string]: any;
    }

    export interface CardProps {
        icon: ReactNode;
        number: number | ReactNode;
        bg: string;
        label: ReactNode;
    }

    export declare interface IInvoice {
        id: number;
        invoice_date: string;
        inv_num: string;
        description: string;
        status: string;
        total: number;
    }

    export declare interface ICustomer {
        id: number;
        name: string;
        email: string;
        phone: string;
        cs_number: string;
        type: string;
        street: string;
        city: string;
        postcode: string;
        created_at: string;
        invoices?: IInvoice[];
    }
export declare interface IPrintableInvoice {
    id: number;
    inv_num: string;
    invoice_date: string; 
    description: string;
    customer_id: number;
    status: string;
    total: number;
    created_at: string; 
    updated_at: string; 
    customer: ICustomer; 
    items: {
        id: number;
        name: string;
        quantity: number;
        invoice_id: number;
        created_at: string; 
        updated_at: string; 
    }[];
}



declare type TChartData = {
    dtype: string;
    dname: string;
    total: number;
    fill: string;
};

export declare interface CustomerChartProp {
    chartConfig: ChartConfig;
    chartData: TChartData[];
    title: string;
    description?: string;
    footer?: string;
}

export interface IItem {
  id: string;
  name: string;
  description: string;
  created_at: string; 
  updated_at: string; 
}

export interface IExpenditure {
  id: string;
  item_id: string;
  description: string;
  amount: number;
  created_at: string; 
  updated_at: string; 
  item: IItem; 
}

