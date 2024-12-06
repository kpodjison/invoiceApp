import { CustomerTable } from "@/Components/Tables/CustomerTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Customers() {
    return (
        <AuthenticatedLayout>
            <div className="p-8 h-screen overflow-y-scroll mainContent">
                <CustomerTable />
            </div>
        </AuthenticatedLayout>
    );
}
