
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {FormEvent, useEffect, useState} from "react";
import { toast } from 'sonner';
import axios from 'axios';
import { handleRefresh } from '@/lib/utils';

    interface IItems {
        id: number;
        name: string;
        description: string;
    }
export default function ExpenditureForm() {
       const { data, setData, post, processing, errors, reset } = useForm({
           name: "",
           description: "",  
           amount:""
       });

    const [items, setItems] = useState<IItems[]>([]);

     useEffect(() => {
         axios
             .get("/items")
             .then((res) => {
                //  console.log(res.data);
                 setItems(res.data.data);
             })
             .catch((error) => {
                //  console.log("Error", error);
             });
     }, []);


    const submit = (e: FormEvent) => {
        e.preventDefault();

        e.preventDefault();
        post("/expenditure", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Expenditure  added successfully.");
                handleRefresh();
                reset();
            },
            onError: (errors) => {
                    toast.error("Failed to add expenditure");
                // console.error("Error during submission:", errors);
            },
        });
    };

    return (
        <>
            <div className="p-5">
                <form onSubmit={submit} className="mt-7">
              
                    <div className="my-2">
                        <InputLabel htmlFor="status" value="Item" />
                        <select
                            className="mt-1 block w-full rounded"
                            id="name"
                            name="name"
                            onChange={(e) => setData("name", e.target.value)}
                        >
                            <option className='text-center'> -- select item -- </option>
                            {items.map((item) => 
                                 <option value={item.id} key={item.id}>{item.name}</option>
                            )}
                        </select>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="my-2">
                        <InputLabel htmlFor="amount" value="Amount" />

                        <TextInput
                            id="amount"
                            name="amount"
                            type="number"
                            value={data.amount}
                            min={0}
                            step={0.1}
                            placeholder="eg. 25.00"
                            className="mt-1 block w-full"
                            onChange={(e) => setData("amount", e.target.value)}
                        />

                        <InputError message={errors.amount} className="mt-2" />
                    </div>
                    <div className="my-2">
                        <InputLabel htmlFor="description" value="Description" />

                        <TextInput
                            id="description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            placeholder="eg. Fuel for vehicle operations"
                            isFocused={true}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className="ms-4 !bg-blue-600"
                            disabled={processing}
                        >
                            Add Expenditure
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
