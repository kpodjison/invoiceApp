import { IInvoice } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getTotal(invoices:IInvoice[]) {
  return invoices.reduce((acc, invoice) => acc + invoice.total, 0);
}

export function handleRefresh() {
          setTimeout(() => {
              window.location.reload();
          }, 2000); 
}