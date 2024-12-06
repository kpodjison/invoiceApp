import MobileNav from '@/Components/MobileNav';
import SideBar from '@/Components/SideBar';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { Toaster } from 'sonner';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <main className="flex h-screen w-full ">
            <SideBar />
            <div className="flex size-full flex-col">
                <div className="mobile-header">
                    <Link href="/admin">
                        <img
                            src="/storage/ivapp-logo.png"
                            width={40}
                            height={40}
                            className="rounded"
                        />
                    </Link>
                    <div>
                        <MobileNav />
                    </div>
                </div>
                <section className="">{children}</section>
            </div>
            <Toaster position="top-right" richColors />
        </main>
    );
}
