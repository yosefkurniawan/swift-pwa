import Button from '@common_button';
import TextField from '@common_textfield';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useStyles from './style';
import Result from './modal';

const FormCom = (props) => {
    const { t, email } = props;
    const [openDialog, setOpenDialog] = React.useState(false);
    const [orderField, setOrderField] = React.useState({});

    const styles = useStyles();
    const TrackingSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('validate:email:wrong'))
            .required(t('validate:email:required')),
        order_id: Yup.string()
            .required(`${t('order:orderId')} ${t('validate:required')}`),
    });
    const formik = useFormik({
        initialValues: {
            email: email || '',
            order_id: '',
        },
        validationSchema: TrackingSchema,
        onSubmit: async (values) => {
            setOrderField(values);
            setOpenDialog(true);
        },
    });

    const handleOpenDialog = (val) => {
        setOpenDialog(val);
    };
    return (
        <>
            <Result open={openDialog} handleOpenDialog={handleOpenDialog} orderField={orderField} {...props} />
            <form className={styles.container} onSubmit={formik.handleSubmit}>
                <TextField
                    label={t('contact:email')}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={
                        !!(formik.touched.email && formik.errors.email)
                    }
                    errorMessage={
                        (formik.touched.email && formik.errors.email)
                    || null
                    }
                />
                <TextField
                    label={t('order:orderId')}
                    name="order_id"
                    value={formik.values.order_id}
                    onChange={formik.handleChange}
                    error={
                        !!(formik.touched.order_id && formik.errors.order_id)
                    }
                    errorMessage={
                        (formik.touched.order_id && formik.errors.order_id) || null
                    }
                />
                <div className={styles.bottomButtons}>
                    <Button
                        fullWidth
                        type="submit"
                    >
                        {t('common:search:title')}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default FormCom;
