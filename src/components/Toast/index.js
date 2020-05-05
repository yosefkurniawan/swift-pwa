import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="standard" {...props} />;
}

export default ({
    open, message, setOpen, variant = 'info',
}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={variant}>
                {message}
            </Alert>
        </Snackbar>
    );
};
