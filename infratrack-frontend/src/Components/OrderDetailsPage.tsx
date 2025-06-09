import React, { ChangeEvent, useEffect, useState } from 'react';
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
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [progressGraph, setProgressGraph] = useState<string[]>([]);
    const [searchMessage, setSearchMessage] = useState('');
    const [oldStatus, setOldStatus] = useState('');


    useEffect(() => {
        ApiMiddleware.get(`${user?.roleName.split(' ')[0].toLowerCase()}/view-order/${orderId}`)
            .then((res: any) => {
                if (res?.data?.data[0]?.quotations) {
                    setImagePreviewUrl(`data:image/jpeg;base64,${res?.data?.data[0]?.quotations}`);
                }
                if (res?.data?.data[0] === null || res?.data?.data[0] === undefined) {
                    setData(null);
                }
                else {
                    setData(res?.data?.data[0]);
                    setOldStatus(res?.data?.data[0]?.status);
                    let progress: string[] = res?.data?.data[0]?.tracker.split(',');
                    if (progress.length === 0) setProgressGraph([res?.data?.data[0]?.tracker]);
                    else setProgressGraph(progress);
                }
            })
            .catch((err: any) => console.error(err))
            .finally(() => { setLoading(false); console.log(progressGraph) });
    }, [user]);


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);

            setImagePreviewUrl(URL.createObjectURL(file));
            // reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreviewUrl(null);
        }
    };

    const Search = async () => {
        setSearchLoading(true);
        ApiMiddleware.get(`${user?.roleName.split(' ')[0].toLowerCase()}/check-in-store/${data.productName}`)
            .then((res: any) => {
                setAvailableStocks(res.data.data);
                if (res.data.data.length === 0) {
                    setSearchMessage('No available stocks found');
                }
            })
            .catch((err: any) => console.error(err))
            .finally(() => setSearchLoading(false));

    }

    const update = async () => {

        if (data.status !== oldStatus) {
            setLoading(true);

            let formData = new FormData();
            formData.append('id', data.id);
            formData.append('productName', data.productName);
            formData.append('requestedQuantity', data.requestedQuantity);
            formData.append('finalizedQuantity', data.finalizedQuantity);
            formData.append('orderedBy', data.orderedBy);
            formData.append('status', data.status);
            formData.append('storeRemarks', data.storeRemarks || '');
            formData.append('customerRemarks', data.customerRemarks || '');
            formData.append('purchaserRemarks', data.purchaserRemarks || '');
            formData.append('directorRemarks', data.directorRemarks || '');
            formData.append('projectName', data.projectName);
            formData.append('lastModifiedBy', user?.userId);
            formData.append('orderDate', data.orderDate);
            formData.append('customerName', data.customerName);

            if (imageFile !== null) {
                console.log("imageFile");
                formData.append('quotations', imageFile);
            }

            ApiMiddleware.put(`${user?.roleName.split(' ')[0].toLowerCase()}/update-order`, formData).
                then((res: any) => {
                    alert("Order Updated Successfully");
                    // window.location.reload();
                }).
                catch((err: any) => {
                    console.log(err);
                }).
                finally(() => {
                    setLoading(false);
                })
        }

        else {
            alert("Please Update Status");
            return;
        }

    }

    return (
        <>
            {loading && <LoaderSpinner />}

            {!loading && data !== null &&



                <div className=' flex flex-row'>

                    {
                        user?.roleName === 'Store Incharge' &&
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
                                    {searchMessage !== '' &&
                                        <p className=' text-green-500 font-medium text-lg mt-6'>No Matching Item Found In Store</p>
                                    }

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
                    }
                    <div className=" w-[60%] p-6 text-white bg-gray-900 h-[90vh] overflow-y-auto flex flex-col gap-6">

                        <div className=' flex flex-col gap-y-6 justify-center'>
                            <h1 className="text-4xl font-bold">Order Details</h1>

                            <div className=' flex flex-row gap-x-12 justify-center'>
                                <button
                                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 h-10"
                                    onClick={() => { update() }}
                                >
                                    Update Order
                                </button>

                                {imagePreviewUrl && (
                                    <a
                                        href={imagePreviewUrl}
                                        download={`quotation-${data.productName}-${data.projectName}`}
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10"
                                    >
                                        Download Quotation
                                    </a>
                                )}
                            </div>
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
                                    disabled={user?.roleName !== 'Engineer'}
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
                                    <option value="Updated By Store">Updated By Store</option>
                                    <option value="Order Placed">Order Placed</option>
                                    <option value="Updated By Purchase Dept.">Updated By Purchase Dept.</option>
                                    <option value="Quotation Shared">Quotation Shared</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Purchased">Purchased</option>
                                    <option value="Delivered To Store">Delivered To Store</option>
                                    <option value="Delivered To Site">Delivered To Site</option>
                                    <option value="Received and Closed">Received and Closed</option>
                                </select>
                            </div>

                            <div>


                                <label className="block text-red-500">Finalized Quantity</label>
                                <input
                                    disabled={user?.roleName !== 'Store Incharge' && user?.roleName !== 'Director'}
                                    type="text"
                                    className="bg-gray-800 border text-red-500 border-gray-700 rounded px-2 py-1 w-full"
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


                            {
                                user?.roleName === 'Purchaser' &&
                                <div className="flex flex-row items-center gap-6 mt-16">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="profile-image-upload"
                                        />
                                        <label
                                            htmlFor="profile-image-upload"
                                            className={`cursor-pointer flex items-center justify-center w-48 h-48 rounded-lg border-2 border-dashed border-white transition-all duration-300 ${!imagePreviewUrl ? 'hover:bg-gray-700' : ''}`}
                                        >
                                            {!imagePreviewUrl ? (
                                                <div className="text-center text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                    </svg>
                                                    <p>Click to upload Quotation</p>
                                                </div>
                                            ) : (
                                                <img
                                                    src={imagePreviewUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            )}
                                        </label>

                                    </div>
                                </div>
                            }


                        </div>


                    </div>


                    <div className=' w-[35%] px-4'>

                        <div >
                            <p className=' mt-4 text-center text-2xl mb-12 text-green-500 font-semibold'>Order Tracking</p>
                        </div>

                        <ul className=' text-center text-xl text-white'>
                            {
                                progressGraph.map((item, index) => {
                                    return (

                                        <li key={index} className=" mb-4 text-center">
                                            <span className=' text-red-500 font-semibold'>{index + 1}</span> .  {item}</li>

                                    )
                                })
                            }
                        </ul>
                    </div>

                </div>

            }
        </>
    );
}

export default OrderDetailsPage;
