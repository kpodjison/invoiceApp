import AnimatedCounter from "@/Components/AnimatedCounter";
import Card from "@/Components/Card";
import { CustomBarChart } from "@/Components/CustomBarChart";
import { PieChartCard } from "@/Components/PieChartCard";
import { CustomerInvoice } from "@/Components/Tables/CustomerInvoice";
import {  chartData, customerChartConfig, incomeChartConfig, incomeChartData } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { InertiaProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";

export default function Dashboard() {
       const [dashData, setDashData] = useState({});
        const { auth, flash } = usePage<InertiaProps>().props;
       useEffect(() => {
           axios
               .get("/dash/data")
               .then((res) => {
                   setDashData(res.data.data);
               })
               .catch((error) => {
                //    console.log("Error", error);
               });
       }, []);
    // console.log(auth.user)
    return (
        <AuthenticatedLayout>
            <section className="p-6 h-screen overflow-y-scroll mainContent">
                <div className="text-lg sm:text-2xl font-semibold w-[95%] mx-auto bai-regular">
                    Welcome{" "}
                    <span className="text-blue-600 capitalize">
                        {(auth?.user?.name).split(" ")[0]}
                    </span>
                </div>
                <div className="dash-data">
                    <div className="">
                        <PieChartCard
                            chartConfig={customerChartConfig}
                            // @ts-ignore
                            chartData={dashData?.customerChartData}
                            title="CUSTOMERS"
                            description="January - June 2024"
                            footer="Showing total customers"
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <Card
                                label="Invoices "
                                // @ts-ignore
                                number={dashData?.invoices}
                                bg="bg-teal-800"
                                icon={
                                    <GiReceiveMoney className="text-[2.2rem] text-white" />
                                }
                            />
                        </div>
                        <div>
                            {" "}
                            <Card
                                label="Total "
                                number={
                                    // @ts-ignore
                                    <AnimatedCounter amount={dashData?.total} />
                                }
                                bg="bg-lime-600"
                                icon={
                                    <GiTakeMyMoney className="text-[2.2rem] text-white" />
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="dash-data">
                    {/* <CustomBarChart /> */}
                    <PieChartCard
                        chartConfig={incomeChartConfig}
                        // @ts-ignore
                        chartData={dashData?.incomeChartData}
                        title="INCOME ANALYSIS"
                        description="January - June 2024"
                        footer="Showing total Expenditure - Earnings"
                    />
                </div>

                <div className="my-10">
                    <CustomerInvoice type="latest" />
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
