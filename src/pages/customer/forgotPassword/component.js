import Typography from '@components/Typography';
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useStyles from './style';

const ForgotPassword = ({ t }) => {
    const styles = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email(t('validate:email:wrong'))
                .required(t('validate:email:required')),
        }),
        onSubmit: () => {
            setOpen(!open);
        },
    });
    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={t('customer:forgotPassword:success')}
                action={(
                    <>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                )}
            />
            <Typography variant="span" align="left">
                {t('customer:forgotPassword:content')}
            </Typography>
            <TextField
                label="Email"
                className={styles.email}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                errorMessage={formik.errors.email || null}
            />
            <Button className={styles.btn} fullWidth type="submit">
                {t('common:button:send')}
            </Button>
        </form>
    );
};

export default ForgotPassword;
