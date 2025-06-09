import { faMagnifyingGlass, faPen, faRotateLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import ApiMiddleware from '../middleware/ApiMiddleware'
import LoaderSpinner from './UiComponents/LoaderSpinner'

function StorePage() {
    const [products, setProducts] = useState<any[]>([])
    const [allproducts, setAllProducts] = useState<any[]>([])
    const [editingId, setEditingId] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    const [editedProduct, setEditedProduct] = useState<{
        id: number;
        productName: string;
        productQuantity: string;
    }>({
        id: 0,
        productName: '',
        productQuantity: '',
    })

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        ApiMiddleware.get(`/store/view-stocks`).
            then((res: any) => {
                setProducts(res.data.data);
                setAllProducts(res.data.data);
                // setLoading(false)
            }).
            catch((err: any) => {
                alert("something went wrong, pelase comeback later");
            }).
            finally(
                () => {
                    setEditingId(null)
                    setSearchTerm('')
                    setLoading(false)
                });
    }

    const deleteStock = async (id: number) => {

        const res = window.confirm("Are you sure you want to delete this stock?");

        if (res) {
            setLoading(true);
            await ApiMiddleware.delete(`/store/delete-stock/${id}`).
                then((res: any) => {
                    alert(res.data.message);
                    // getProducts();
                }).
                catch((err: any) => {
                    alert("something went wrong, pelase comeback later");
                }).
                finally(
                    () => {
                        getProducts();
                    });
        }

    }

    const handleEdit = (id: number) => {
        setEditingId(id)

        let product = products.find((product) => product.id === id);
        console.log(product);
        setEditedProduct(product);
    }

    const handleSave = async (id: number) => {
        setLoading(true)
        console.log(editedProduct);
        await ApiMiddleware.post(`/store/add-stock`, editedProduct).
            then((res: any) => {
                alert(res.data.message);
            }).
            catch((err: any) => {
                alert("something went wrong, pelase comeback later");
            }).
            finally(
                () => {
                    getProducts();
                });

    }

    const addNewStock = () => {
        setProducts([{ id: 0, name: '', quantity: 0 }, ...products])
        setEditingId(0)
    }

    function search() {

        console.log(searchTerm)
        let filteredProducts = allproducts.filter((product: any) => {
            return product?.productName?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });

        console.log(filteredProducts)

        setProducts(filteredProducts);
    }

    function reset() {
        setSearchTerm('');
        setProducts(allproducts);
    }

    return (
        <>
            {loading && <LoaderSpinner />}

            {!loading &&
                <div>
                    <p className='text-center text-5xl font-medium text-white mt-4'>Store Database</p>

                    <div className="w-full flex items-center justify-center mt-6 gap-2">
                        <input
                            type="text"
                            placeholder="Search product"
                            className="px-4 py-2 w-[60%] rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }}
                        />
                        <button onClick={() => { search() }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <span>Search</span>
                        </button>
                        <button onClick={() => { reset() }} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all">
                            <FontAwesomeIcon icon={faRotateLeft} />
                            <span>Reset</span>
                        </button>
                    </div>

                    <div className="mt-6 px-4">
                        <button
                            onClick={addNewStock}
                            className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                        >
                            Add New Stock
                        </button>
                        <div className="h-[60vh] overflow-y-auto">
                            <table className="w-[80%]  mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">ID</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Product Name</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Available Quantity</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Action</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700 transition-all">
                                            <td className="px-6 py-4 text-gray-300 text-left">{product.id}</td>
                                            <td className="px-6 py-4 text-gray-300 text-left">
                                                {editingId === product.id ? (
                                                    <input
                                                        type="text"
                                                        defaultValue={product.productName}
                                                        className="px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={(e) => {
                                                            setEditedProduct({ ...editedProduct, productName: e.target.value, id: product.id })
                                                        }} />
                                                ) : (
                                                    product.productName
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 text-left">
                                                {editingId === product.id ? (
                                                    <input
                                                        type="text"
                                                        defaultValue={product.productQuantity}
                                                        className="px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={(e) => {
                                                            setEditedProduct({ ...editedProduct, productQuantity: e.target.value, id: product.id })
                                                        }} />
                                                ) : (
                                                    product.productQuantity
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingId === product.id ? (
                                                    <button
                                                        onClick={() => handleSave(product.id)}
                                                        className="text-green-400 hover:text-green-300 transition-all font-medium"
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEdit(product.id)}
                                                        className="text-blue-400 hover:text-blue-300 transition-all font-medium flex items-center gap-2"
                                                    >
                                                        <FontAwesomeIcon icon={faPen} /> Edit
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => deleteStock(product.id)}
                                                    className="text-red-400 hover:text-red-300 transition-all font-medium flex items-center gap-2"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>                    </div>
                </div>
            }
        </>
    )
}

export default StorePage
