
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@components/Forms/TextField';
import DropFile from '@components/DropFile';
import Button from '@components/Button';
import Typography from '@components/Typography';
import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateDayJs from '@date-io/dayjs';
import useStyles from './style';
import Loader from './Loader';

const ConfirmPayment = (props) => {
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
            tranferDate: Date.now(),
            file: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },

    });
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);
    if (loading) return <Loader />;

    const handleChangeDate = (date) => {
        formik.setFieldValue('tranferDate', date);
    };
    const handleDropFile = (param) => {
        formik.setFieldValue('file', param[0].name);
    };
    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    name="orderNumber"
                    label={t('payment:confirmPayment:form:orderNumber')}
                    value={formik.values.orderNumber}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.orderNumber && formik.touched.orderNumber)}
                    errorMessage={formik.errors.orderNumber || null}
                />
                <TextField
                    name="bankName"
                    label={t('payment:confirmPayment:form:bankName')}
                    value={formik.values.bankName}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.bankName && formik.touched.bankName)}
                    errorMessage={formik.errors.bankName || null}
                />
                <TextField
                    name="bankAccountNumber"
                    label={t('payment:confirmPayment:form:bankAccountNumber')}
                    value={formik.values.bankAccountNumber}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.bankAccountNumber && formik.touched.bankAccountNumber)}
                    errorMessage={formik.errors.bankAccountNumber || null}
                />
                <TextField
                    name="bankAccountName"
                    label={t('payment:confirmPayment:form:bankAccountName')}
                    value={formik.values.bankAccountName}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.bankAccountName && formik.touched.bankAccountName)}
                    errorMessage={formik.errors.bankAccountName || null}
                />
                <TextField
                    name="amountTranfer"
                    label={t('payment:confirmPayment:form:amountTranfer')}
                    value={formik.values.amountTranfer}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.amountTranfer && formik.touched.amountTranfer)}
                    errorMessage={formik.errors.amountTranfer || null}
                />
                <DatePicker
                    label={t('payment:confirmPayment:form:tranferDate')}
                    name="tranferDate"
                    onChange={handleChangeDate}
                    value={formik.values.tranferDate}
                    error={!!(formik.errors.tranferDate && formik.touched.tranferDate)}
                    fullWidth
                    format="MMMM D, YYYY"
                    className={styles.datePicker}
                />
                <DropFile
                    title={t('payment:confirmPayment:form:file')}
                    label={t('payment:confirmPayment:form:labelFile')}
                    acceptedFile=".jpg,.jpeg,.png,.pdf,.gif"
                    multiple={false}
                    error={!!(formik.errors.file && formik.touched.file)}
                    handleDrop={handleDropFile}
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

export default (props) => (
    <MuiPickersUtilsProvider utils={DateDayJs}>
        <ConfirmPayment {...props} />
    </MuiPickersUtilsProvider>
);
