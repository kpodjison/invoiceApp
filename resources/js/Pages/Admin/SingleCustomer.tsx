import { CustomerInvoice } from "@/Components/Tables/CustomerInvoice";
import { CustomerTable } from "@/Components/Tables/CustomerTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ICustomer } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";


export default function SingleCustomer() {
    const [customer, setCustomer] = useState<ICustomer | null>(null);
    const { props, url } = usePage(); 
    const id = url.split("/").pop();

        useEffect(() => {
            axios
                .get(`/customers/${id}`)
                .then((res) => {
                    // console.log(res.data.data[0]);
                    setCustomer(res.data.data[0]);
                })
                .catch((error) => {
                    // console.log("Error", error);
                });
        }, []);
    
    return (
        <AuthenticatedLayout>
            <div className="p-8 h-screen overflow-y-scroll mainContent">
                <div className="w-full">
                    <h2 className="text-2xl font-semibold text-center text-blue-600 my-2">
                        CUSTOMER INFO
                    </h2>
                    <div className="border rounded shadow-md bg-blue-300 p-4">
                        {customer?.type == "Commercial" ? (
                            <span className="bg-orange-400 px-2 py-1 rounded-md float-right ">
                                Commercial
                            </span>
                        ) : (
                            <span className="bg-yellow-400 px-2 py-1 rounded-md float-right">
                                Private
                            </span>
                        )}
                        <p className="font-semibold text-lg">
                            Full Name:{" "}
                            <small className="font-normal">
                                {customer?.name}
                            </small>
                        </p>
                        <p className="font-semibold text-lg">
                            Email:{" "}
                            <span className="font-normal">
                                {customer?.email}
                            </span>
                        </p>
                        <p className="font-semibold text-lg">
                            Phone:{" "}
                            <span className="font-normal">
                                {customer?.phone}
                            </span>
                        </p>
                        <p className="font-semibold text-lg">
                            Address:{" "}
                            <span className="font-normal">
                                {customer?.street} &nbsp; | &nbsp;{" "}
                                {customer?.postcode} &nbsp; |&nbsp;
                                {customer?.city}
                            </span>
                        </p>
                    </div>

                    <div>
                        {customer?.invoices && (
                            <CustomerInvoice
                                customerInvoice={customer?.invoices}
                                type="view"
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
