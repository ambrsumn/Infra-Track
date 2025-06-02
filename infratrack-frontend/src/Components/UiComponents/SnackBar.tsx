import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

function SnackBar({ message }: { message: string }) {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message || 'hihhih'}
            />
        </div>
    );
}

export default SnackBar
