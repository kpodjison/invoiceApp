import { CustomerInvoice } from "@/Components/Tables/CustomerInvoice";
import { ExpenditureTable } from "@/Components/Tables/ExpenditureTable";
import { ItemsTable } from "@/Components/Tables/ItemsTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Expenditure() {
    return (
        <AuthenticatedLayout>
            <div className="p-8 h-screen  overflow-y-scroll mainContent">
                <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2 bg-[#d0d5d8] p-5 rounded">
                        <ExpenditureTable />
                    </div>
                    <div className="sm:col-span-1 shadow-lg bg-[#d0d5d8] p-5 rounded">
                        <ItemsTable />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
