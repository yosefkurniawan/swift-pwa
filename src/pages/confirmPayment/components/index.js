import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@components/Forms/TextField';
import DropFile from '@components/DropFile';
import Button from '@components/Button';
import Typography from '@components/Typography';
import useStyles from './style';
import Loader from './Loader';

export default (props) => {
    const { t } = props;
    const styles = useStyles();
    const validationSchema = Yup.object().shape({
        orderNumber: Yup.string().required(t('payment:confirmPayment:form:validation')),
        bankName: Yup.string().required(t('payment:confirmPayment:form:validation')),
        bankAccountNumber: Yup.string().required(t('payment:confirmPayment:form:validation')),
        bankAccountName: Yup.string().required(t('payment:confirmPayment:form:validation')),
        amountTranfer: Yup.string().required(t('payment:confirmPayment:form:validation')),
        tranferDate: Yup.string().required(t('payment:confirmPayment:form:validation')),
        file: Yup.string().required(t('payment:confirmPayment:form:validation')),
    });
    const formik = useFormik({
        initialValues: {
            orderNumber: '',
            bankName: '',
            bankAccountNumber: '',
            bankAccountName: '',
            amountTranfer: '',
            tranferDate: '',
            file: '',
        },
        validationSchema,
        onSubmit: () => {
            console.log('submit');
        },

    });
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);
    if (loading) return <Loader />;
    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    name="orderNumber"
                    label={t('payment:confirmPayment:form:orderNumber')}
                    value={formik.values.orderNumber}
                    onChange={formik.handleChange}
                    error={!!formik.errors.orderNumber}
                    errorMessage={formik.errors.orderNumber || null}
                />
                <TextField
                    name="bankName"
                    label={t('payment:confirmPayment:form:bankName')}
                    value={formik.values.bankName}
                    onChange={formik.handleChange}
                    error={!!formik.errors.bankName}
                    errorMessage={formik.errors.bankName || null}
                />
                <TextField
                    name="bankAccountNumber"
                    label={t('payment:confirmPayment:form:bankAccountNumber')}
                    value={formik.values.bankAccountNumber}
                    onChange={formik.handleChange}
                    error={!!formik.errors.bankAccountNumber}
                    errorMessage={formik.errors.bankAccountNumber || null}
                />
                <TextField
                    name="bankAccountName"
                    label={t('payment:confirmPayment:form:bankAccountName')}
                    value={formik.values.bankAccountName}
                    onChange={formik.handleChange}
                    error={!!formik.errors.bankAccountName}
                    errorMessage={formik.errors.bankAccountName || null}
                />
                <TextField
                    name="amountTranfer"
                    label={t('payment:confirmPayment:form:amountTranfer')}
                    value={formik.values.amountTranfer}
                    onChange={formik.handleChange}
                    error={!!formik.errors.amountTranfer}
                    errorMessage={formik.errors.amountTranfer || null}
                />
                <TextField
                    name="tranferDate"
                    label={t('payment:confirmPayment:form:tranferDate')}
                    value={formik.values.tranferDate}
                    onChange={formik.handleChange}
                    error={!!formik.errors.tranferDate}
                    errorMessage={formik.errors.tranferDate || null}
                />
                <DropFile
                    title={t('payment:confirmPayment:form:file')}
                    label={t('payment:confirmPayment:form:labelFile')}
                    acceptedFile=".jpg,.jpeg,.png,.pdf,.gif"
                    multiple={false}
                />
                <div className={styles.footer}>
                    <Button fullWidth className={styles.button} type="submit">
                        <Typography color="white" variant="label" type="semiBold">
                            {t('payment:confirmPayment:form:button')}
                        </Typography>
                    </Button>
                </div>
            </form>
        </div>
    );
};
