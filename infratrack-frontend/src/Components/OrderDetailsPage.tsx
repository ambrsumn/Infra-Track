import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiMiddleware from '../middleware/ApiMiddleware';
import { useUserContext } from '../Context/UserContext';
import LoaderSpinner from './UiComponents/LoaderSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function OrderDetailsPage() {
    const [data, setData] = useState<any>(null);
    const { user } = useUserContext();
    const { orderId } = useParams();
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [availableStocks, setAvailableStocks] = useState<any[]>([]);

    useEffect(() => {
        ApiMiddleware.get(`${user?.roleName.split(' ')[0].toLowerCase()}/view-order/${orderId}`)
            .then((res: any) => {
                setData(res.data.data[0]);
            })
            .catch((err: any) => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    const Search = async () => {
        setSearchLoading(true);
        ApiMiddleware.get(`${user?.roleName.split(' ')[0].toLowerCase()}/check-in-store/${data.productName}`)
            .then((res: any) => {
                setAvailableStocks(res.data.data);
            })
            .catch((err: any) => console.error(err))
            .finally(() => setSearchLoading(false));

    }

    const update = () => {

    }

    return (
        <>
            {loading && <LoaderSpinner />}

            {!loading &&

                <div className=' flex flex-row'>
                    <div className=" min-w-[80%] p-6 text-white bg-gray-900 h-[92vh] overflow-y-auto flex flex-col gap-6">

                        <div className=' flex flex-row gap-x-12 justify-center'>
                            <h1 className="text-4xl font-bold">Order Details</h1>


                            <button
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
                                onClick={() => { update() }}
                            >
                                Update Order
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xl">
                            <div>
                                <label className="block text-gray-400">Product Name</label>
                                <p className="font-medium">{data.productName}  </p>
                            </div>

                            <div>
                                <label className="block text-gray-400">Requested Quantity</label>
                                <p className="font-medium">{data.requestedQuantity}</p>
                            </div>

                            <div>
                                <label className="block text-gray-400">Project Name</label>
                                <p className="font-medium">{data.projectName}</p>
                            </div>

                            <div>
                                <label className="block text-gray-400">Ordered By</label>
                                <p className="font-medium">{data.customerName}</p>
                            </div>


                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-1 gap-4 text-xl w-[60%] mx-auto'>

                            <div>
                                <label className="block text-gray-400">Customer Remarks</label>
                                <textarea
                                    title={user?.roleName !== 'Engineer' ? "You are not authorized to edit this field" : ""}
                                    rows={3}
                                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full"
                                    value={data.customerRemarks || ''}
                                    disabled
                                    onChange={(e) => setData({ ...data, customerRemarks: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400">Status</label>
                                <select
                                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full"
                                    value={data.status || ''}
                                    onChange={(e) => setData({ ...data, status: e.target.value || data.status })}
                                >
                                    <option value="">Select</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Delivered">Updated By Store</option>
                                    <option value="Delivered">Updated By Purchase Dept.</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>

                            <div>


                                <label className="block text-gray-400">Finalized Quantity</label>
                                <input
                                    disabled={user?.roleName !== 'Store Incharge' && user?.roleName !== 'Director'}
                                    type="text"
                                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full"
                                    value={data.finalizedQuantity || ''}
                                    onChange={(e) => setData({ ...data, finalizedQuantity: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400">Store Remarks</label>
                                <textarea
                                    disabled={user?.roleName !== 'Store Incharge'}
                                    title={user?.roleName !== 'Store Incharge' ? "You are not authorized to edit this field" : ""}
                                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full whitespace-pre-wrap"
                                    value={data.storeRemarks || ''}
                                    onChange={(e) => setData({ ...data, storeRemarks: e.target.value })}
                                    rows={3}
                                />
                            </div>



                            <div>
                                <label className="block text-gray-400">Purchaser Remarks</label>
                                <textarea
                                    disabled={user?.roleName !== 'Purchaser'}
                                    title={user?.roleName !== 'Purchaser' ? "You are not authorized to edit this field" : ""}
                                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full whitespace-pre-wrap"
                                    value={data.purchaserRemarks || ''}
                                    onChange={(e) => setData({ ...data, purchaserRemarks: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400">Director Remarks</label>
                                <textarea
                                    disabled={user?.roleName !== 'Director'}
                                    title={user?.roleName !== 'Director' ? "You are not authorized to edit this field" : ""}
                                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full whitespace-pre-wrap"
                                    value={data.directorRemarks || ''}
                                    onChange={(e) => setData({ ...data, directorRemarks: e.target.value })}
                                    rows={3}
                                />
                            </div>
                        </div>


                    </div>

                    <div className='  w-[20%]'>
                        {searchLoading && <LoaderSpinner />}

                        {!searchLoading &&

                            <div>
                                <div className='flex flex-row justify-center mt-4'>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2" onClick={() => { Search() }}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        Search in Store
                                    </button>
                                </div>

                                {availableStocks.length > 0 && (
                                    <div className=" p-4 rounded-lg shadow-md mt-4">
                                        <h3 className="text-xl font-semibold text-green-500 mb-3">Products Available in Store</h3>

                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-800">
                                                    <th className="px-4 py-2 text-left text-2xl font-semibold text-gray-300">Name</th>
                                                    <th className="px-4 py-2 text-left text-2xl font-semibold text-gray-300">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {availableStocks.map((item, index) => (
                                                    <tr key={index} className="border-t border-gray-700 hover:bg-gray-800 transition-colors">
                                                        <td className="px-4 py-2 text-white font-semibold text-xl text-left">{item.productName}</td>
                                                        <td className="px-4 py-2 text-left font-semibold text-xl text-green-400">{item.productQuantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                        }
                    </div>
                </div>

            }
        </>
    );
}

export default OrderDetailsPage;
