
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {FormEvent, useEffect, useState} from "react";
import axios from 'axios';
import { toast } from 'sonner';
import { ICustomer } from '@/types';

interface IInvoiceFormProps{
    id: string;
}
export default function InvoiceForm({id}:IInvoiceFormProps) {
       const { data, setData, post, processing, errors, reset } = useForm({
           invoice_date: "",
           description: "",
           total: "",
           customer: "",
           fields: [{ name: "", quantity: "" }],
       });
    const [customer, setCustomer] = useState<ICustomer>();


    
    useEffect(() => {
        axios
            .get(`/customers/${id}`)
            .then((res) => {
                setCustomer(res.data.data[0]);
            })
            .catch((error) => {
                // console.log("Error", error);
            });
    }, []);



    

    const handleAddFields = () => {
        setData('fields',[...data.fields, { name: "", quantity: "" }]); 
    };

    const handleRemoveFields = (index:number) => {
        const updatedFields = data.fields.filter((_, i) => i !== index);
        setData('fields',updatedFields);
    };

    const handleChange = (index:number, fieldName:string, value:number) => {
        const updatedFields = data.fields.map((field, i) =>
            i === index ? { ...field, [fieldName]: value } : field
        );
        setData('fields',updatedFields);
    };


    const submit = (e:FormEvent) => {
        e.preventDefault();
       
        setData("customer", id);
        post("/invoices", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Invoice added successfully.");
                reset();
            },
            onError: (errors) => {
                toast.error("Failed to add invoice");
                // console.error("Error during submission:", errors);
            },
        });
    };



    return (
        <>
            <div className="p-5 overflow-y-scroll">
                <form onSubmit={submit} className="mt-7">
                    <div className="grid grid-cols-1 my-3 gap-3">
                        <div>
                            <InputLabel
                                htmlFor="customer"
                                value="Customer Name"
                            />

                            <TextInput
                                id="customer"
                                value={customer?.name}
                                className="mt-1 block w-full bg-gray-200"
                                disabled
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="Phone" value="Phone" />

                            <TextInput
                                id="customer"
                                value={customer?.phone}
                                className="mt-1 block w-full bg-gray-200"
                                disabled
                            />
                        </div>
                        <div className="">
                            <InputLabel
                                htmlFor="invoice_date"
                                value="Invoice Date"
                            />

                            <TextInput
                                id="invoice_date"
                                name="invoice_date"
                                value={data.invoice_date}
                                className="mt-1 block w-full"
                                autoComplete="invoice_date"
                                type="date"
                                onChange={(e) =>
                                    setData("invoice_date", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.invoice_date}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="my-3">
                        <InputLabel htmlFor="description" value="Description" />

                        <TextInput
                            id="description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div className="grid grid-cols-1 my-7 gap-3">
                        <div className="">
                            {data.fields.map((field, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-5 mb-3"
                                >
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={field.name}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "name",
                                                // @ts-ignore
                                                e?.target?.value
                                            )
                                        }
                                        className="mr-4 p-2 rounded col-span-2"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        min="0"
                                        value={field.quantity}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "quantity",
                                                // @ts-ignore
                                                e.target.value
                                            )
                                        }
                                        className="mr-4 p-2 rounded col-span-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveFields(index)
                                        }
                                        className="bg-red-700 text-white px-4 cursor-pointer font-bold text-xl w-"
                                    >
                                        -
                                    </button>
                                </div>
                            ))}
                            <InputError
                                // @ts-ignore
                                message={errors?.items}
                                className="mt-2"
                            />
                            <button
                                type="button"
                                onClick={handleAddFields}
                                className="bg-green-600 text-white p-2 mb-10 cursor-pointer rounded"
                            >
                                + Add Item
                            </button>
                        </div>

                        <div className="">
                            <InputLabel htmlFor="total" value="Total" />

                            <TextInput
                                id="total"
                                name="total"
                                type="text"
                                value={data.total}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("total", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.total}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Add Invoice
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
