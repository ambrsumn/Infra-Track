import React, { useState } from 'react'
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import { isWhiteSpaceLike } from 'typescript';
import { useUserContext } from '../Context/UserContext';
import ApiMiddleware from '../middleware/ApiMiddleware';
import SnackBar from './UiComponents/SnackBar';
import LoaderSpinner from './UiComponents/LoaderSpinner';
import { useNavigate } from 'react-router-dom';

function PlaceOrderPage() {

    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const navigate = useNavigate();

    const placeOrderFormInterface = {
        productName: '',
        productQuantity: '',
        projectName: '',
        engineerComments: '',
        orderDate: '',
        orderedBy: 0
    }

    const [formData, setFormData] = useState(placeOrderFormInterface);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const isFormValid = () => {
        if (formData.productName.trim() === '' ||
            formData.productQuantity.trim() === '' ||
            formData.projectName.trim() === '') {
            alert('Please fill all the fields marked with *');
            return;
        }
        else {
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        // e.preventDefault();

        setLoading(true);

        formData.orderDate = new Date().toISOString().split('T')[0];
        formData.orderedBy = user?.userId;

        console.log(formData);

        await ApiMiddleware.post(`${user.roleName.toLowerCase()}/place-order`, formData).then((res: any) => {
            console.log(res);
            // setSnackBarMessage(res.data.message);
            // setShowSnackBar(true);
            alert('Order placed successfully');
            navigate('/Orders');
        }).catch((err: any) => {
            console.log(err);
            alert(err.response.data.message);
            // setShowSnackBar(true);
        }).finally(() => {
        })
    };

    return (
        <>
            {loading && <LoaderSpinner />}
            {showSnackBar && <SnackBar message={snackBarMessage} />}

            {!loading && !showSnackBar &&
                <Container maxWidth="md" sx={{ mt: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            bgcolor: 'transparent',
                            p: 4,
                            borderRadius: 2,
                            color: '#fff',
                        }}
                    >
                        <Typography variant="h4" gutterBottom sx={{ color: '#fff' }}>
                            PLACE ORDER
                        </Typography>

                        <Box >
                            <TextField
                                fullWidth
                                label="Product Name *"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{ style: { color: '#ffffff', fontSize: '1.2rem' } }}
                                InputProps={{
                                    style: { color: '#fff', fontSize: '1.2rem' },
                                    sx: { '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Quantity *"
                                name="productQuantity"
                                value={formData.productQuantity}
                                onChange={handleChange}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{ style: { color: '#ffffff', fontSize: '1.2rem' } }}
                                InputProps={{
                                    style: { color: '#fff', fontSize: '1.2rem' },
                                    sx: { '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Project *"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{ style: { color: '#ffffff', fontSize: '1.2rem' } }}
                                InputProps={{
                                    style: { color: '#fff', fontSize: '1.2rem' },
                                    sx: { '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Add Comments (optional)"
                                name="engineerComments"
                                value={formData.engineerComments}
                                onChange={handleChange}
                                margin="normal"
                                variant="outlined"
                                multiline
                                rows={3}
                                InputLabelProps={{ style: { color: '#ffffff', fontSize: '1.2rem' } }}
                                InputProps={{
                                    style: { color: '#fff', fontSize: '1.2rem', whiteSpace: 'pre-wrap' },
                                    sx: { '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, bgcolor: '#3b82f6', ':hover': { bgcolor: '#2563eb' } }}
                                onClick={() => { isFormValid() }}
                            >
                                Place Order
                            </Button>
                        </Box>
                    </Paper>
                </Container>}
        </>
    );
};


export default PlaceOrderPage
