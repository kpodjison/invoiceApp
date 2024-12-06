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
import ExpenditureForm from "../Forms/ExpenditureForm";
import { IExpenditure } from "@/types";
import EditExpenditureForm from "../Forms/EditExpenditureForm";




export function ExpenditureTable() {
    
    const [expenditure, setExpenditure] = useState<IExpenditure[]>([]);
      useEffect(() => {
          axios
              .get("/expenditure")
              .then((res) => {
                //   console.log(res.data.data);
                  setExpenditure(res.data.data);
              })
              .catch((error) => {
                //   console.log("Error", error);
              });
      }, []);

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-center text-blue-600 my-2 mar-regular">
                EXPENDITURE
            </h2>
            <div className="flex justify-between">
                <CustomSheet
                    children={<ExpenditureForm />}
                    title="EXPENDITURE"
                    trigerBtnText="Expenditure"
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="uppercase !text-blue-600 ">
                        <TableHead className="tableHeader">#</TableHead>
                        <TableHead className="tableHeader">Name</TableHead>
                        <TableHead className="tableHeader">
                            Description
                        </TableHead>
                        <TableHead className="tableHeader">Amount</TableHead>
                        <TableHead className="text-right tableHeader">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenditure.map((ep, index) => (
                        <TableRow key={ep.id} className="table_row">
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>{ep?.item?.name}</TableCell>
                            <TableCell>{ep.description}</TableCell>
                            <TableCell>{ep.amount}</TableCell>
                            <TableCell className="text-center grid grid-cols-1  space-x-2 space-y-2 w-[100px] bg-gray-200 float-right table_actions ">
                                <CustomSheet
                                    children={<EditExpenditureForm id={ep?.id}  />}
                                    title="EDIT EXPENDITURE"
                                    type="form"
                                    trigerBtnText="Edit"
                                    btnColor="bg-yellow-600"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                    {expenditure.length < 1 && (
                        <TableRow className="text-center">
                            <TableCell colSpan={10}>
                                NO EXPENDITURE FOUND
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    {expenditure.length > 0 && (
                        <TableRow className="text-xl ">
                            <TableCell
                                colSpan={5}
                                className="text-leftfont-bold text-blue-600"
                            >
                                Total: £&nbsp;
                                {expenditure.reduce(
                                    (acc, ep) => acc + ep.amount,
                                    0
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                </TableFooter>
            </Table>
        </div>
    );
}
