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

function PlaceOrderPage() {
    const [formData, setFormData] = useState({
        product: '',
        quantity: '',
        project: '',
        addComments: '',
        createdOn: new Date().toISOString().split('T')[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Order Submitted:', formData);
        // handle your submit logic here (e.g., API call)
    };

    return (
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

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        label="Product"
                        name="product"
                        value={formData.product}
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
                        label="Quantity"
                        name="quantity"
                        value={formData.quantity}
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
                        label="Project"
                        name="project"
                        value={formData.project}
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
                        name="addComments"
                        value={formData.addComments}
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
                    >
                        Place Order
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};


export default PlaceOrderPage
