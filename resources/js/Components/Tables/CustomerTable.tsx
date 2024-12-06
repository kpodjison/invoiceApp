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
import CustomSheet from "../CustomSheet";
import CustomerForm from "../Forms/CustomerForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import InvoiceForm from "../Forms/InvoiceForm";
import CustomerEditForm from "../Forms/CustomerEditForm";


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
    invoice?: [];
    created_at: string; // ISO date string
}


export function CustomerTable() {

    const [customers, setCustomers] = useState<ICustomer[]>([]);
      useEffect(() => {
          axios
              .get("/customers")
              .then((res) => {
                //   console.log(res.data.data);
                  setCustomers(res.data.data);
              })
              .catch((error) => {
                //   console.log("Error", error);
              });
      }, []);
    return (
        <>
            <h2 className="text-2xl font-semibold text-center text-blue-600 my-2 mar-regular">
                CUSTOMERS
            </h2>
            <CustomSheet children={<CustomerForm />} title="ADD CUSTOMER" />

            <Table>
                <TableHeader>
                    <TableRow className="uppercase">
                        <TableHead className="tableHeader">#</TableHead>
                        <TableHead className="tableHeader">Name</TableHead>
                        <TableHead className="tableHeader">Email</TableHead>
                        <TableHead className="tableHeader">Phone</TableHead>
                        <TableHead className="tableHeader">Type</TableHead>
                        <TableHead className="tableHeader">Address</TableHead>
                        <TableHead className="text-right tableHeader">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map((customer, index) => (
                        <TableRow key={customer.id} className="table_row">
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{customer.type}</TableCell>
                            <TableCell>{`${customer.city},${customer.postcode}`}</TableCell>
                            <TableCell className="grid grid-cols-1  space-x-2 space-y-2  w-[150px] bg-gray-200 table_actions float-end">
                                <CustomSheet
                                    children={
                                        <CustomerEditForm
                                            id={customer.id.toString()}
                                        />
                                    }
                                    title="Edit CUSTOMER"
                                    type="form"
                                    trigerBtnText="Edit"
                                    btnColor="bg-yellow-600"
                                />
                                <CustomSheet
                                    children={
                                        <InvoiceForm
                                            id={customer.id.toString()}
                                        />
                                    }
                                    title="ADD INVOICE"
                                    type="form"
                                    trigerBtnText="Add Invoice"
                                    btnColor="bg-cyan-600"
                                />
                                <Link
                                    className="font-medium bg-lime-600 text-white px-3 py-1 rounded text-center"
                                    name="view"
                                    href={`customers/${customer?.id}`}
                                >
                                    View
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    {customers.length > 0 && (
                        <TableRow className="text-xl ">
                            <TableCell
                                colSpan={1}
                                className="text-right font-bold text-blue-600"
                            >
                                Total:
                            </TableCell>
                            <TableCell className="font-bold text-blue-600">
                                &nbsp; {customers.length}
                            </TableCell>
                        </TableRow>
                    )}
                </TableFooter>
            </Table>
        </>
    );
}
