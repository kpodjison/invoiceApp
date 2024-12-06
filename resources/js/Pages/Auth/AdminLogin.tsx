import { FormEvent, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, router, useForm, usePage} from '@inertiajs/react';
import GuestWrapper from "@/Components/GuestWrapper.jsx";
import { InertiaProps } from '@/types';

export default function AdminLogin() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const { auth, flash } = usePage<InertiaProps>().props;



    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // useEffect(() => {
    //     if (auth?.admin != null) {
    //         router.visit("/admin");
    //     }
    // }, []);

    const submit = (e:FormEvent) => {
        e.preventDefault();

        post(route('admin-login'));
    };

    return (
    <GuestWrapper>
            <Head title="Admin Login" />
        <div className="min-h-screen flex flex-row sm:justify-center items-center pt-2 sm:pt-0 admin-authbg">
            <div className="w-full sm:max-w-xl mt-2 px-6 py-4 bg-[#1f6161f8] shadow-md overflow-hidden rounded-lg mx-2">         
                <form onSubmit={submit}>
                    <h3 className="text-center text-white">WELCOME TO INVOICE APP LOGIN</h3>
                    <div>
                        <InputLabel htmlFor="email" value="Email" className='text-white' />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" className='text-white' />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>



                    <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4 !bg-blue-600" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </GuestWrapper>
    );
}
