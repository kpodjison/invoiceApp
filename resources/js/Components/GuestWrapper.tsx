import {Head, router, useForm, usePage} from "@inertiajs/react";
import React, {FormEvent, Fragment, useEffect, useRef, useState} from 'react'
import axios from "axios";
import { InertiaProps } from "@/types";



export default function GuestWrapper({children}:Readonly<{children:React.ReactNode}>) {
    const [dashboardLink ,setDashboardLink] = useState('')
    const { auth } = usePage<InertiaProps>().props

  const userLogout = (e: FormEvent) =>{
        if(auth?.admin != null){
            axios.get('/admin/logout')
                .then( res => {
                    router.visit('/login/admin')
                })
                .catch(error => {
                    // console.log('Error',error)
                })
        }
  }
    return (
        <>
            <main className="font-inter">             
             
                    {children}
            </main>
        </>
    );
}


