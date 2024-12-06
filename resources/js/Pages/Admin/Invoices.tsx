import { CustomerInvoice } from "@/Components/Tables/CustomerInvoice";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Invoices() {
    return (
        <AuthenticatedLayout>
            <div className="p-8 h-screen  overflow-y-scroll mainContent">
                <div className="my-10">
                    <CustomerInvoice />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
