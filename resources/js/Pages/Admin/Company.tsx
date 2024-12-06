import InstitutionForm from "@/Components/Forms/InstitutionForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Company() {
    return (
        <AuthenticatedLayout>
            <div className="p-8 bg-red-600 h-screen mainContent">
                <InstitutionForm />
            </div>
        </AuthenticatedLayout>
    );
}
