import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IPrintableInvoice } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

interface ISingleInvoiceProps {
    target: string;
}

export default function SingleInvoice({ target }: ISingleInvoiceProps) {
    const [invoice, setInvoice] = useState<IPrintableInvoice | null>(null);
    const [showFooter, setShowFooter] = useState(false);
    const [targetFlag, setTargetFlag] = useState("");

    const contentToPrint = useRef<HTMLDivElement>(null); 
    const { url } = usePage();
    const id = url.split("/").pop();

    const parsedUrl = new URL(window.location.href);
    const printParam = parsedUrl.searchParams.get("print");

    const handlePrint = useReactToPrint({
        contentRef: contentToPrint, 
        documentTitle: "vista_cleaning_servive_" + id,
        onAfterPrint: () => setShowFooter(false),
    });

    const printInvoice = () => {
        setShowFooter(true);
        if (invoice && showFooter)
            handlePrint();
    };

    useEffect(() => {
        axios
            .get(`/invoices/${id}`)
            .then((res) => {
             
                setInvoice(res.data.data[0]);
                if (target !== "") {
                    setTargetFlag(target);
                }
            })
            .catch((error) => {
                // console.error("Error", error);
            });
    }, [id]);


    useEffect(() => {
        if (printParam && invoice) {
            setShowFooter(true);
            handlePrint(); 
            setTargetFlag("");
            router.visit("/admin/invoices");
        }
    }, [printParam, invoice]);

    return (
        <AuthenticatedLayout>
            <div className="p-8 h-screen overflow-y-scroll mainContent">
                <div className="p-5 w-full">
                    <div className="flex justify-end">
                        <button
                            onClick={printInvoice}
                            className="bg-teal-700 p-2 text-white rounded"
                        >
                            PRINT
                        </button>
                    </div>
                    <div
                        className="min-h-screen relative"
                        id="invoice_sec"
                        ref={contentToPrint} 
                    >
                        {/* Invoice Content */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-[3.5rem] font-bold">
                                    Invoice
                                </h3>
                                <p className="font-bold text-xl">
                                    Vista Cleaning Services
                                </p>
                                <p>24 Bliss Road,</p>
                                <p>Berlin, LU4 8NA</p>
                                <p>Tel: 0711234539616</p>
                                <p>Email: info@vistacleanings.co</p>
                            </div>
                            <div>
                                <img
                                    src="/storage/ivapp-logo.png"
                                    width="200"
                                    height="200"
                                    className="rounded"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end items-center mt-5">
                            <div className="grid grid-cols-3 gap-3">
                                <h3 className="font-bold text-xl">Recipient</h3>
                                <div className="col-span-2">
                                    <p className="font-bold text-xl">
                                        {invoice?.customer?.name}
                                    </p>
                                    <p>{invoice?.customer?.street}</p>
                                    <p>{invoice?.customer?.postcode}</p>
                                    <p>{invoice?.customer?.city}</p>
                                    <p>Tel: {invoice?.customer?.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-5">
                            <div className="grid grid-cols-2 gap-9">
                                <div>
                                    <h3 className="font-bold text-xl">
                                        Invoice Number
                                    </h3>
                                    <p>{invoice?.inv_num}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">
                                        Invoice Date
                                    </h3>
                                    <p>{invoice?.invoice_date}</p>
                                </div>
                            </div>
                        </div>

                        <div className="my-8">
                            <table className="w-full text-sm text-left rtl:text-right">
                                <thead className="text-xs text-white uppercase sp-bbg">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Item / Quantity
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price / Hour
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-2 py-3">
                                            {invoice?.description}
                                        </td>
                                        <td className="px-2 border py-3">
                                            {invoice?.items?.map(
                                                (item, index) => (
                                                    <p key={index}>
                                                        {item?.name} /{" "}
                                                        {item?.quantity}
                                                    </p>
                                                )
                                            )}
                                        </td>
                                        <td className="px-2 border py-3"></td>
                                        <td className="px-2 border py-3">
                                            {invoice?.total}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-end items-center mt-2 gap-8 font-bold text-xl">
                                <p>Total Due:</p>
                                <p>£ {invoice?.total}</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div
                            className={`absolute bottom-0 right-0 left-0 grid grid-cols-3 text-sm px-5 ${
                                !showFooter && "hidden"
                            }`}
                            id="invoice-footer"
                        >
                            <div>
                                <p className="font-bold">Registered Address</p>
                                <p>24 Bliss Road,</p>
                                <p>Berlin, LU4 8NA</p>
                            </div>
                            <div>
                                <p className="font-bold">Contact Information</p>
                                <p>Vista Cleaning Services</p>
                                <p>Tel: 0711234539616</p>
                                <p>Email: info@vistacleanings.co</p>
                            </div>
                            <div>
                                <p className="font-bold">Payment Details</p>
                                <div className="grid grid-cols-2">
                                    <div>
                                        <p>Bank Name</p>
                                        <p>IBAN</p>
                                    </div>
                                    <div>
                                        <p>Bliss Bank</p>
                                        <p>23305862443434</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
