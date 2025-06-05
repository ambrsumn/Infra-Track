
import LoaderSpinner from './UiComponents/LoaderSpinner'
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


function OrderPage() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

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

  const rows = [
    { id: 1, product: 'Cement', quantity: '100 bags', status: 'Delivered', project: 'Skyline Towers', createdOn: '15-07-2023' },
    { id: 2, product: 'Steel Rods', quantity: '500 kg', status: 'Pending', project: 'Highway Bridge', createdOn: '16-07-2023' },
    { id: 3, product: 'Bricks', quantity: '5000 units', status: 'Delivered', project: 'Green Residency', createdOn: '17-07-2023' },
    { id: 4, product: 'Sand', quantity: '10 tons', status: 'In Transit', project: 'Mall Complex', createdOn: '18-07-2023' },
    { id: 5, product: 'Gravel', quantity: '15 tons', status: 'Delivered', project: 'City Center', createdOn: '19-07-2023' },
    { id: 6, product: 'Tiles', quantity: '2000 units', status: 'Pending', project: 'Urban Villa', createdOn: '20-07-2023' },
    { id: 7, product: 'Paint', quantity: '400 liters', status: 'Delivered', project: 'Skyline Towers', createdOn: '21-07-2023' },
    { id: 8, product: 'PVC Pipes', quantity: '300 meters', status: 'In Transit', project: 'Water Plant', createdOn: '22-07-2023' },
    { id: 9, product: 'Glass Panels', quantity: '100 units', status: 'Delivered', project: 'Corporate Park', createdOn: '23-07-2023' },
    { id: 10, product: 'Doors', quantity: '60 units', status: 'Pending', project: 'Lakeview Apartments', createdOn: '24-07-2023' },
    { id: 11, product: 'Windows', quantity: '80 units', status: 'Delivered', project: 'Green Residency', createdOn: '25-07-2023' },
    { id: 12, product: 'Concrete Mix', quantity: '5 tons', status: 'In Transit', project: 'Flyover Project', createdOn: '26-07-2023' },
    { id: 13, product: 'Roof Sheets', quantity: '120 units', status: 'Delivered', project: 'Factory Shed', createdOn: '27-07-2023' },
    { id: 14, product: 'Wires', quantity: '1000 meters', status: 'Pending', project: 'Smart Homes', createdOn: '28-07-2023' },
    { id: 15, product: 'Switches', quantity: '200 units', status: 'Delivered', project: 'Mall Complex', createdOn: '29-07-2023' },
    { id: 16, product: 'Light Fixtures', quantity: '150 units', status: 'Delivered', project: 'Skyline Towers', createdOn: '30-07-2023' },
    { id: 17, product: 'Nails', quantity: '50 boxes', status: 'Pending', project: 'Lakeview Apartments', createdOn: '31-07-2023' },
    { id: 18, product: 'Plumbing Fixtures', quantity: '75 sets', status: 'In Transit', project: 'Smart Homes', createdOn: '01-08-2023' },
    { id: 19, product: 'Paint Brushes', quantity: '100 units', status: 'Delivered', project: 'Urban Villa', createdOn: '02-08-2023' },
    { id: 20, product: 'Adhesive', quantity: '30 cans', status: 'Pending', project: 'Highway Bridge', createdOn: '03-08-2023' },
    { id: 21, product: 'Cement Blocks', quantity: '2000 units', status: 'Delivered', project: 'City Center', createdOn: '04-08-2023' },
    { id: 22, product: 'Sealant', quantity: '100 tubes', status: 'In Transit', project: 'Water Plant', createdOn: '05-08-2023' },
    { id: 23, product: 'Ladders', quantity: '10 units', status: 'Delivered', project: 'Flyover Project', createdOn: '06-08-2023' },
    { id: 24, product: 'Drills', quantity: '15 units', status: 'Pending', project: 'Urban Villa', createdOn: '07-08-2023' },
    { id: 25, product: 'Screws', quantity: '5000 pcs', status: 'Delivered', project: 'Smart Homes', createdOn: '08-08-2023' },
    { id: 26, product: 'Insulation Sheets', quantity: '300 units', status: 'Pending', project: 'Green Residency', createdOn: '09-08-2023' },
    { id: 27, product: 'Bitumen', quantity: '2 tons', status: 'In Transit', project: 'Highway Bridge', createdOn: '10-08-2023' },
    { id: 28, product: 'Concrete Slabs', quantity: '50 units', status: 'Delivered', project: 'Corporate Park', createdOn: '11-08-2023' },
    { id: 29, product: 'Generators', quantity: '5 units', status: 'Delivered', project: 'Mall Complex', createdOn: '12-08-2023' },
    { id: 30, product: 'Safety Helmets', quantity: '100 pcs', status: 'Pending', project: 'Factory Shed', createdOn: '13-08-2023' },
  ];

  return (
    <div className='w-[85%] mx-auto py-4 text-white'>
      <div className='flex flex-row justify-between mb-4'>
        <p className='text-5xl font-semibold text-white'>ORDERS</p>
        <button onClick={placeOrder} className='text-2xl rounded-lg shadow-md bg-[#2e4fd2] text-white font-medium px-4 py-2'>+ New Order</button>
      </div>

      <Paper sx={{ width: '100%', overflow: 'scrool', bgcolor: '#1e293b', marginTop: '5rem' }}>
        <div className="overflow-y-auto">
          <TableContainer className='overflow-y-auto' sx={{ maxHeight: '70vh' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['ID', 'Product', 'Quantity', 'Status', 'Project', 'Ordered On'].map((head) => (
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
                    <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row.product}</TableCell>
                    <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row.quantity}</TableCell>
                    <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row.status}</TableCell>
                    <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row.project}</TableCell>
                    <TableCell sx={{ color: '#e2e8f0', fontSize: '1.3rem' }}>{row.createdOn}</TableCell>
                  </TableRow>
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
      </Paper>
    </div>
  );
}

export default OrderPage
