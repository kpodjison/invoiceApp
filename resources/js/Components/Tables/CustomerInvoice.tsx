import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { getTotal } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomSheet from "../CustomSheet";
import EditInvoiceForm from "../Forms/EditInvoiceForm";


interface IInvoice {
    id: number;
    invoice_date: string;
    inv_num:string;
    description: string;
    status: string;
    total: number;
}
interface CustomerInvoiceProps{
    customerInvoice?: IInvoice[];
    type?: string;
}


export function CustomerInvoice({customerInvoice,type}:CustomerInvoiceProps) {
 const [invoices, setInvoices] = useState<IInvoice[]>([]);

         useEffect(() => {
             axios
                 .get("/invoices")
                 .then((res) => {
                    //  console.log(res.data);
                     if (type === 'view') {
                         
                         if (customerInvoice?.length > 0) {
                             
                             setInvoices(customerInvoice);
                         } else {
                             setInvoices([]);
                         }
                     } else if (type === 'latest') {
                          setInvoices(res.data.data.slice(0,10));   
                     }
                     else {
                         setInvoices(res.data.data);                         
                     }
                 })
                 .catch((error) => {
                    //  console.log("Error", error);
                 });
         }, []);

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-center text-blue-600 my-2 mar-regular">
                {type === "latest" && "LATEST"}
                {type === "view" ? "INVOICES" : " CUSTOMER INVOICES"}
            </h2>
            <Table>
                <TableHeader>
                    <TableRow className="uppercase !text-blue-600 ">
                        <TableHead className="tableHeader">#</TableHead>
                        <TableHead className="tableHeader">Date</TableHead>
                        <TableHead className="tableHeader">
                            Description
                        </TableHead>
                        <TableHead className="tableHeader">Status</TableHead>
                        <TableHead className="tableHeader">Total</TableHead>
                        <TableHead className="text-right tableHeader">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice, index) => (
                        <TableRow key={invoice.id} className="table_row">
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>{invoice.invoice_date}</TableCell>
                            <TableCell>{invoice.description}</TableCell>
                            <TableCell>{invoice.status}</TableCell>
                            <TableCell>{invoice.total}</TableCell>
                            <TableCell className="text-center grid grid-cols-1  space-x-2 space-y-2 w-[100px] bg-gray-200 float-right table_actions ">
                                <Link
                                    className="font-medium bg-lime-600 text-white px-3 py-1 rounded"
                                    name="view"
                                    href={`/admin/invoices/${invoice?.id}`}
                                >
                                    View
                                </Link>
                                <CustomSheet
                                    children={
                                        <EditInvoiceForm
                                            id={invoice.id.toString()}
                                        />
                                    }
                                    title="EDIT INVOICE"
                                    type="form"
                                    trigerBtnText="Edit"
                                    btnColor="bg-yellow-600"
                                />
                                <Link
                                    className="font-medium bg-blue-600 text-white px-3 py-1 rounded"
                                    name="view"
                                    href={`/admin/invoices/${invoice?.id}/?print=true`}
                                >
                                    Print
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                    {invoices.length < 1 && (
                        <TableRow className="text-center">
                            <TableCell colSpan={10}>
                                NO INVOICES FOUND
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    {invoices.length > 0 && getTotal(invoices) > 0 && (
                        <TableRow className="text-xl ">
                            <TableCell
                                colSpan={10}
                                className="text-left font-bold text-blue-600"
                            >
                                Total: £&nbsp;{getTotal(invoices).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    )}
                </TableFooter>
            </Table>
        </div>
    );
}
