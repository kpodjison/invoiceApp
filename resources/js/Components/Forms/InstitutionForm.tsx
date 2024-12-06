import {FormEvent, useEffect, useState} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import axios from 'axios';
import { toast } from 'sonner';

export default function InstitutionForm () {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone_number:'',
        email: '',
        address: '',
        website: '',
        established_date:''
    });

    const[updatable,setUpdatable] =  useState(false);
    const[notEditable,setNotEditable] =  useState(true);


    useEffect(() => {
        axios
            .get("/institution")
            .then((res) => {
                setData(res.data.data);
                if (res.data.data == null || res.data.data == undefined) {
                    setNotEditable(false);
                } else {
                    setUpdatable(true);
                }
            })
            .catch((error) => {
                // console.log("Error", error);
            });
    }, []);



    const handleEdit = (e:FormEvent) => {
        axios.get('/institution')
            .then( res => {
                setData(res.data.data)
                setNotEditable(false)
            })
            .catch(error => {
                // console.log('Error',error)
            })
    };


    const submit = (e: FormEvent) => {
        e.preventDefault();

        e.preventDefault();
        post("/institution", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Company info added successfully.");
                setNotEditable(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000); 
            },
            onError: (errors) => {
                toast.error("Failed to add company info");
                // console.error("Error during submission:", errors);
            },
        });
    };

    return (
        <>
            {!data && (
                <p className="bg-red-300 p-2 rounded">
                    Please fill in your Company information
                </p>
            )}
            <div className="flex justify-end">
                {data && (
                    <button
                        className="px-4 py-2 bg-green-400 rounded"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                )}
            </div>

            <div className="px-5">
                <form onSubmit={submit} className="mt-7">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="my-2">
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data?.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                disabled={notEditable}
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="my-2">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data?.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                disabled={notEditable}
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="my-2">
                            <InputLabel
                                htmlFor="phone_number"
                                value="Phone Number"
                            />

                            <TextInput
                                id="phone_number"
                                name="phone_number"
                                value={data?.phone_number}
                                className="mt-1 block w-full"
                                autoComplete="phone_number"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                required
                                disabled={notEditable}
                            />

                            <InputError
                                message={errors.phone_number}
                                className="mt-2"
                            />
                        </div>
                        <div className="my-2">
                            <InputLabel htmlFor="address" value="Address" />

                            <TextInput
                                id="address"
                                name="address"
                                value={data?.address}
                                className="mt-1 block w-full"
                                autoComplete="address"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                                disabled={notEditable}
                            />

                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="my-2">
                            <InputLabel htmlFor="website" value="Website" />

                            <TextInput
                                id="website"
                                name="website"
                                value={data?.website}
                                className="mt-1 block w-full"
                                autoComplete="website"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("website", e.target.value)
                                }
                                required
                                disabled={notEditable}
                            />

                            <InputError
                                message={errors.website}
                                className="mt-2"
                            />
                        </div>
                        <div className="my-2">
                            <InputLabel
                                htmlFor="established_date"
                                value="Date of Est."
                            />

                            <TextInput
                                id="established_date"
                                name="established_date"
                                value={data?.established_date}
                                className="mt-1 block w-full"
                                autoComplete="established_date"
                                isFocused={true}
                                type="date"
                                onChange={(e) =>
                                    setData("established_date", e.target.value)
                                }
                                required
                                disabled={notEditable}
                            />

                            <InputError
                                message={errors.established_date}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    {!notEditable && (
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                {/* @ts-ignore */}
                                {data?.id ? "Update" : "Save"}
                            </PrimaryButton>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}
