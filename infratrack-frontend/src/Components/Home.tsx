import React, { useEffect, useState } from 'react'
import BuildingHome from './BuildingHome'
import { useUserContext } from '../Context/UserContext'
import ApiMiddleware from '../middleware/ApiMiddleware';
import LoaderSpinner from './UiComponents/LoaderSpinner';

function Home() {

    const { user } = useUserContext();
    const [loading, setLoading] = useState(true);
    const [totalOrders, setTotalOrders] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        if (user?.roleName === 'Engineer') {
            ApiMiddleware.get(`${user?.roleName.split(' ')[0].toLowerCase()}/orders/${user?.userId}`).
                then((res: any) => {
                    console.log(res.data);

                    if (res.data.data === null || res.data.data === undefined) {
                        setRows([]);
                    }
                    else {
                        setRows(res?.data?.data);
                        setTotalOrders(res?.data?.data?.length);
                        let count = 0;

                        for (let i = 0; i < res?.data?.data?.length; i++) {
                            if (res?.data?.data[i]?.status === 'Received and Closed') {
                                // setCompletedOrders(completedOrders + 1);
                                count++;
                            }
                        }

                        setPendingOrders(res?.data?.data?.length - count);
                        setCompletedOrders(count);
                    }
                    setLoading(false);
                }).catch((err: any) => {
                    console.log(err);
                    setLoading(false);
                })
        }
        else {
            ApiMiddleware.get(`${user?.roleName.split(' ')[0].toLowerCase()}/view-orders`).
                then((res: any) => {
                    console.log(res.data);

                    if (res.data.data === null || res.data.data === undefined) {
                        setRows([]);
                    }
                    else {
                        setRows(res?.data?.data);
                        setTotalOrders(res?.data?.data?.length);
                        let count = 0;

                        for (let i = 0; i < res?.data?.data?.length; i++) {
                            if (res?.data?.data[i]?.status === 'Received and Closed') {
                                // setCompletedOrders(completedOrders + 1);
                                count++;
                            }
                        }

                        setPendingOrders(res?.data?.data?.length - count);
                        setCompletedOrders(count);
                    }
                    setLoading(false);
                }).catch((err: any) => {
                    console.log(err);
                    setLoading(false);
                })
        }
    }, [])

    return (
        <div className=' h-[81vh]'>
            <div className=' h-full  pt-8 text-white bg-gradient-to-br from-[#0d1117] to-[#1f2937] p-6'>
                <p className=' text-5xl font-bold mb-10 animate-pulse text-cyan-300'>Welcome to InfraTrack,  {user?.firstName}</p>

                <p className=' text-gray-400 text-2xl font-medium mt-6'>Order & Track all your engineering needs at one place.</p>

                {!loading &&
                    <div className="flex flex-col items-center justify-center h-full ">
                        {/* <h1 className="text-4xl font-bold mb-10 animate-pulse text-cyan-300">
                    Welcome to InfraTrack
                </h1> */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
                            <div className="backdrop-blur-lg bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-400/50 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200">
                                <h2 className="text-lg font-semibold text-cyan-300">Total Orders</h2>
                                <p className="text-4xl font-bold mt-2 text-white animate-bounce">{totalOrders}</p>
                            </div>

                            <div className="backdrop-blur-lg bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-400/50 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
                                <h2 className="text-lg font-semibold text-indigo-300">Orders In Progress</h2>
                                <p className="text-4xl font-bold mt-2 text-white animate-bounce delay-150">{pendingOrders}</p>
                            </div>

                            <div className="backdrop-blur-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-400/50 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-400">
                                <h2 className="text-lg font-semibold text-purple-300">Delivered Items</h2>
                                <p className="text-4xl font-bold mt-2 text-white animate-bounce delay-300">{completedOrders}</p>
                            </div>                    </div>
                    </div>}

                {loading && <LoaderSpinner />}
            </div>
        </div>
    )
}

export default Home
