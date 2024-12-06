
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {FormEvent, useEffect, useState} from "react";
import { toast } from 'sonner';

export default function CustomerForm() {
       const { data, setData, post, processing, errors, reset } = useForm({
           name: "",
           email: "",
           phone: "",
           type: "",
           street: "",
           postcode: "",
           city: "",
       });


    const submit = (e: FormEvent) => {
        e.preventDefault();

        e.preventDefault();
        post("/customers", {
            preserveScroll: true,
            onSuccess: () => {
                    toast.success("Customer added successfully.");
                reset();
            },
            onError: (errors) => {
                    toast.error("Failed to add customer");
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
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="my-3">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 my-3 gap-3">
                        <div >
                            <InputLabel htmlFor="phone" value="Phone" />

                            <TextInput
                                id="phone"
                                name="phone"
                                value={data.phone}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>
                        <div >
                            <InputLabel htmlFor="type" value="Type" />
                            <select
                                className="mt-1 block w-full rounded"
                                id="type"
                                name="type"
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                            >
                                <option value=""> -- Select Type -- </option>
                                <option value="Private">Private</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                            <InputError
                                message={errors.type}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <p className="mt-3">Address</p>
                    <div className="grid grid-rows-3 gap-3">
                        <div>
                            <InputLabel htmlFor="street" value="Street" />
                            <TextInput
                                id="street"
                                name="street"
                                value={data.street}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("street", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.street}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="postcode" value="Postcode" />
                            <TextInput
                                id="postcode"
                                name="postcode"
                                value={data.postcode}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("postcode", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.postcode}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="city" value="City" />
                            <TextInput
                                id="city"
                                name="city"
                                value={data.city}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("city", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.city}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4 !bg-blue-600" disabled={processing}>
                            Add Customer
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
