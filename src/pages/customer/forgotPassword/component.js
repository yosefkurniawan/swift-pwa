import Typography from '@components/Typography';
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import SnackMessage from '@components/SnackMessage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useStyles from './style';

const ForgotPassword = ({ t }) => {
    const styles = useStyles();
    const [open, setOpen] = React.useState(false);
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
            setOpen(true);
        },
    });
    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <SnackMessage open={open} setOpen={setOpen} message={t('customer:forgotPassword:success')} />
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
