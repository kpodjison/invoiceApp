import {HiUserGroup} from "react-icons/hi";
import {MdRefresh} from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { FaPeopleGroup } from "react-icons/fa6";
import { CardProps } from "@/types";


export default function Card({icon,number, bg, label}:CardProps) {
    return(
        <>
                <div className={`rounded-md border border-stroke ${bg} py-3 px-3 w-full`}>
                    <div className="flex h-6 w-11 rounded-full">
                        {icon}
                    </div>

                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h4 className="text-title-md font-bold text-white mt-2">
                                {number}
                            </h4>
                        </div>
                </div>
                <hr className="border border-white"/>
                    <div className="flex items-end justify-between">
                        <p className="text-md text-white font-bold">{label}</p>
                    </div>


            </div>

        </>
    )
}
