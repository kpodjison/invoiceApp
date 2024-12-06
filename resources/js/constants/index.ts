import { ChartConfig } from "@/Components/ui/chart";

export const sidebarLinks = [
    {
        imgUrl: "/storage/icons/customers.svg",
        route: "/admin/customers",
        label: "Customers",
    },
    {
        imgUrl: "/storage/icons/dollar-circle.svg",
        route: "/admin/invoices",
        label: "Invoices",
    },
    {
        imgUrl: "/storage/icons/expenditure.svg",
        route: "/admin/expenditure",
        label: "Expenditure",
    },
    {
        imgUrl: "/storage/icons/company.svg",
        route: "/admin/company",
        label: "Company",
    },

];

export const invoices = [
    {
        id: 1, 
        date: "2023-11-01", 
        description: "Invoice INV001 - Credit Card Payment",
        status: "Paid", 
        total: "$250.00", 
    },
    {
        id: 2,
        date: "2023-11-02",
        description: "Invoice INV002 - PayPal Payment",
        status: "Pending",
        total: "$150.00",
    },
    {
        id: 3,
        date: "2023-11-03",
        description: "Invoice INV003 - Bank Transfer Payment",
        status: "Unpaid",
        total: "$350.00",
    },
    {
        id: 4,
        date: "2023-11-04",
        description: "Invoice INV004 - Credit Card Payment",
        status: "Paid",
        total: "$450.00",
    },
    {
        id: 5,
        date: "2023-11-05",
        description: "Invoice INV005 - PayPal Payment",
        status: "Paid",
        total: "$550.00",
    },
    {
        id: 6,
        date: "2023-11-06",
        description: "Invoice INV006 - Bank Transfer Payment",
        status: "Pending",
        total: "$200.00",
    },
    {
        id: 7,
        date: "2023-11-07",
        description: "Invoice INV007 - Credit Card Payment",
        status: "Unpaid",
        total: "$300.00",
    },
];


export const customers = [
    {
        id: 1, 
        name: "John Doe", 
        email: "john.doe@example.com", 
        phone: "123-456-7890", 
        type: "Regular", 
        address: "123 Main Street, Springfield", 
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
        type: "Premium",
        address: "456 Elm Street, Metropolis",
    },
    {
        id: 3,
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        phone: "555-123-4567",
        type: "Regular",
        address: "789 Oak Street, Gotham",
    },
    {
        id: 4,
        name: "Michael Brown",
        email: "michael.brown@example.com",
        phone: "444-555-6666",
        type: "VIP",
        address: "321 Pine Street, Star City",
    },
    {
        id: 5,
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        phone: "222-333-4444",
        type: "Regular",
        address: "654 Maple Street, Central City",
    },
];

export const chartData = [
    { dtype:"Customers",dname: "commercial", total: 175, fill: "var(--color-commercial)" },
    { dtype:"Customers", dname: "privatecus", total: 110, fill: "var(--color-privatecus)" },
];
export const incomeChartData = [
    {
        dtype: "Income",
        dname: "expenditure",
        total: 100,
        fill: "#ca8a04",
    },
    {
        dtype: "Income",
        dname: "earnings",
        total: 500,
        fill: "#65a30d",
    },
];

export const customerChartConfig = {
    commercial: {
        label: "commercial",
        color: "hsl(var(--chart-1))",
    },
    privatecus: {
        label: "private",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export const incomeChartConfig = {
    earnings: {
        label: "earnings",
        color: "#65a30d",
    },
    expenditure: {
        label: "expenditure",
        color: "#ca8a04",
    },
} satisfies ChartConfig;