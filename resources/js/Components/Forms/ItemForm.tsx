
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {FormEvent, useEffect, useState} from "react";
import { toast } from 'sonner';

export default function ItemForm() {
       const { data, setData, post, processing, errors, reset } = useForm({
           name: "",
           description: "",     
       });


    const submit = (e: FormEvent) => {
        e.preventDefault();

        e.preventDefault();
        post("/items", {
            preserveScroll: true,
            onSuccess: () => {
                    toast.success("Expenditure item added successfully.");
                reset();
            },
            onError: (errors) => {
                    toast.error("Failed to add expenditure item");
                // console.error("Error during submission:", errors);
            },
        });
    };

    return (
        <>
            <div className="p-5">
                <form onSubmit={submit} className="mt-7">
                    <div className="my-2">
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            placeholder="eg. Fuel"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
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
                            Add Item
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
