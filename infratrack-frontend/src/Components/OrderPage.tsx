
import LoaderSpinner from './UiComponents/LoaderSpinner'
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/UserContext';
import ApiMiddleware from '../middleware/ApiMiddleware';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function OrderPage() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (user?.roleName !== 'Store Incharge') {
      ApiMiddleware.get(`${user?.roleName.split(' ')[0].toLowerCase()}/orders/${user?.userId}`).
        then((res: any) => {
          console.log(res.data);
          setRows(res.data.data);
          setLoading(false);
        }).catch((err: any) => {
          console.log(err);
          setLoading(false);
        })
    }
  }, [])

  const deleteOrder = async (orderId: number) => {
    // alert('Are you sure you want to delete this order?');
    const result = window.confirm('Are you sure you want to delete this order?');
    console.log(result);

    if (result) {
      setLoading(true);
      await ApiMiddleware.delete(`${user.roleName.split(' ')[0].toLowerCase()}/delete-order/${orderId}`).then((res: any) => {
        console.log(res);
        rows.splice(rows.findIndex((row: any) => row.orderId === orderId), 1);
        alert('Order deleted successfully');
        setRows(rows.filter((row: any) => row.orderId !== orderId));
      }).catch((err: any) => {
        console.log(err);
        alert('Error deleting order, Try again later');
      }).finally(() => {
        setLoading(false);
      })
    }

  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const placeOrder = () => {
    navigate('/place-order');
  }

  return (
    <>
      {loading && <LoaderSpinner />}
      {!loading &&
        <div className='w-[85%] mx-auto py-4 text-white'>
          <div className='flex flex-row justify-between mb-4'>
            <p className='text-5xl font-semibold text-white'>ORDERS</p>
            <button onClick={placeOrder} className='text-2xl rounded-lg shadow-md bg-[#2e4fd2] text-white font-medium px-4 py-2'>+ New Order</button>
          </div>

          {rows.length > 0 ?
            <Paper sx={{ width: '100%', overflow: 'scrool', bgcolor: '#1e293b', marginTop: '5rem' }}>
              <div className="overflow-y-auto">
                <TableContainer className='overflow-y-auto' sx={{ maxHeight: '70vh' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {['ID', 'Product', 'Quantity', 'Project', 'Ordered On', 'Status', 'Action'].map((head) => (
                          <TableCell
                            key={head}
                            sx={{ color: '#cbd5e1', backgroundColor: '#334155', fontWeight: 'bold', fontSize: '1.5rem' }}
                          >
                            {head}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.id} hover sx={{ backgroundColor: '#0f172a' }}>
                          <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row.id}</TableCell>
                          <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row?.productName}</TableCell>
                          <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row.requestedQuantity}</TableCell>

                          <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row.projectName}</TableCell>
                          <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row.orderDate}</TableCell>
                          <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row.status || 'Pending'}</TableCell>
                          <TableCell onClick={() => { deleteOrder(row.id) }} sx={{ backgroundColor: '#0f172a', '&:hover': { color: 'red', cursor: 'pointer' }, color: '#E55050', fontSize: '1.3rem', textAlign: 'left' }}><FontAwesomeIcon icon={faTrash} /></TableCell>                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 15, 20]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ color: '#cbd5e1', bgcolor: '#1e293b' }}
              />
            </Paper> :
            <p className=' text-4xl font-medium mt-32 text-center align-middle text-red-500'>No Orders Available To Show...</p>
          }


        </div>}
    </>
  );
}

export default OrderPage
