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
import axios from "axios";
import { useEffect, useState } from "react";
import CustomSheet from "../CustomSheet";
import ItemForm from "../Forms/ItemForm";
import ItemEditForm from "../Forms/ItemEditForm";


interface IItems {
    id: number;
    name:string;
    description: string;
 
}
interface CustomerInvoiceProps{
    customerInvoice?: IItems[];
    type?: string;
}


export function ItemsTable({customerInvoice,type}:CustomerInvoiceProps) {
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
  
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-center text-blue-600 my-2 mar-regular">
              ITEMS
            </h2>
                <CustomSheet children={<ItemForm />} title="ADD ITEM" trigerBtnText="Item"  btnColor="bg-cyan-600"/>
            <Table>
                <TableHeader>
                    <TableRow className="uppercase !text-blue-600 ">
                        <TableHead className="tableHeader">#</TableHead>
                        <TableHead className="tableHeader">Name</TableHead>
                        <TableHead className="tableHeader">
                            Description
                        </TableHead>
                     
                        <TableHead className="text-right tableHeader">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={item.id} className="table_row">
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell className="text-center grid grid-cols-1  space-x-2 space-y-2 w-[100px] bg-gray-200 float-right table_actions ">
                             
                                <CustomSheet
                                    children={
                                        <ItemEditForm
                                            id={item.id.toString()}
                                        />
                                    }
                                    title="EDIT ITEM"
                                    type="form"
                                    trigerBtnText="Edit"
                                    btnColor="bg-yellow-600"
                                />
                         
                            </TableCell>
                        </TableRow>
                    ))}
                    {items.length < 1 && (
                        <TableRow className="text-center">
                            <TableCell colSpan={10}>
                                NO ITEMS FOUND
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    {items.length > 0 &&  (
                        <TableRow className="text-xl ">
                            <TableCell
                                colSpan={4}
                                className="text-left font-bold text-blue-600"
                            >
                                Total:&nbsp;{items.length}
                            </TableCell>
                        </TableRow>
                    )}
                </TableFooter>
            </Table>
        </div>
    );
}
