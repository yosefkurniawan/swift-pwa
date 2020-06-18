import { Snackbar, makeStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    container: {
        margin: 10,
        maxWidth: '90%',
        padding: 10,
        overflow: 'hidden',
        wordWrap: 'break-word',
    },
    message: {
        wordWrap: 'break-word',
        display: 'flex',
        flexWrap: 'wrap',
    },
});

function Alert(props) {
    const styles = useStyles();
    return <MuiAlert elevation={6} classes={{ root: styles.container, message: styles.message }} variant="standard" {...props} />;
}

export default ({
    open, message, setOpen, variant = 'info', autoHideDuration = 3000,
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
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={variant}>
                {message}
            </Alert>
        </Snackbar>
    );
};
