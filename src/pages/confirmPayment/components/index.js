import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@common_textfield';
import DropFile from '@common_dropfile';
import Button from '@common_button';
import Typography from '@common_typography';
import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateDayJs from '@date-io/dayjs';
import useStyles from './style';
import { confirmPayment } from '../service/graphql';
import formatDate from '../../../helpers/date';

const ConfirmPayment = (props) => {
    const { t } = props;
    const styles = useStyles();
    const [postConfirmPayment] = confirmPayment();
    const validationSchema = Yup.object().shape({
        order_number: Yup.number().typeError(t('payment:confirmPayment:form:validNumber'))
            .positive(t('payment:confirmPayment:form:validNumber')).required(t('payment:confirmPayment:form:validation')),
        payment: Yup.string().required(t('payment:confirmPayment:form:validation')),
        account_number: Yup.number().typeError(t('payment:confirmPayment:form:validNumber'))
            .positive(t('payment:confirmPayment:form:validNumber')).required(t('payment:confirmPayment:form:validation')),
        account_name: Yup.string().required(t('payment:confirmPayment:form:validation')),
        amount: Yup.number().typeError(t('payment:confirmPayment:form:validNumber'))
            .positive(t('payment:confirmPayment:form:validNumber')).required(t('payment:confirmPayment:form:validation')),
        date: Yup.string().required(t('payment:confirmPayment:form:validation')),
        filename: Yup.string().required(t('payment:confirmPayment:form:validation')),
        image_base64: Yup.string().required(t('payment:confirmPayment:form:validation')),
    });
    const formik = useFormik({
        initialValues: {
            order_number: '',
            payment: '',
            account_number: '',
            account_name: '',
            amount: '',
            date: Date.now(),
            filename: '',
            image_base64: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            window.backdropLoader(true);
            postConfirmPayment({
                variables: {
                    ...values,
                    amount: parseFloat(values.amount),
                    date: formatDate(values.date, 'YYYY-MM-03 HH:mm:ss'),
                },
            }).then(() => {
                window.backdropLoader(true);
                window.toastMessage({
                    open: true,
                    text: t('payment:confirmPayment:confirmSuccess'),
                    variant: 'success',
                });
                resetForm({});
            }).catch((e) => {
                window.backdropLoader(true);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('payment:confirmPayment:confirmFailed'),
                    variant: 'error',
                });
            });
        },

    });

    const handleChangeDate = (date) => {
        formik.setFieldValue('date', date);
    };
    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('image_base64', baseCode);
    };
    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    name="order_number"
                    label={t('payment:confirmPayment:form:orderNumber')}
                    value={formik.values.order_number}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.order_number && formik.touched.order_number)}
                    errorMessage={(formik.errors.order_number && formik.touched.order_number) ? formik.errors.order_number : null}
                />
                <TextField
                    name="payment"
                    label={t('payment:confirmPayment:form:bankName')}
                    value={formik.values.payment}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.payment && formik.touched.payment)}
                    errorMessage={(formik.errors.payment && formik.touched.payment) ? formik.errors.payment : null}
                />
                <TextField
                    name="account_number"
                    label={t('payment:confirmPayment:form:bankAccountNumber')}
                    value={formik.values.account_number}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.account_number && formik.touched.account_number)}
                    errorMessage={(formik.errors.account_name && formik.touched.account_number) ? formik.errors.account_number : null}
                />
                <TextField
                    name="account_name"
                    label={t('payment:confirmPayment:form:bankAccountName')}
                    value={formik.values.account_name}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.account_name && formik.touched.account_name)}
                    errorMessage={(formik.errors.account_name && formik.touched.account_name) ? formik.errors.account_name : null}
                />
                <TextField
                    name="amount"
                    label={t('payment:confirmPayment:form:amountTranfer')}
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.amount && formik.touched.amount)}
                    errorMessage={(formik.errors.amount && formik.touched.amount) ? formik.errors.amount : null}
                />
                <DatePicker
                    label={t('payment:confirmPayment:form:tranferDate')}
                    name="date"
                    onChange={handleChangeDate}
                    value={formik.values.date}
                    error={!!(formik.errors.date && formik.touched.date)}
                    fullWidth
                    format="MMMM D, YYYY"
                    className={styles.datePicker}
                />
                <DropFile
                    title={t('payment:confirmPayment:form:file')}
                    label={t('payment:confirmPayment:form:labelFile')}
                    acceptedFile=".jpg,.jpeg,.png,.pdf,.gif"
                    multiple={false}
                    error={((formik.errors.filename && formik.touched.filename) || (formik.errors.image_base64 && formik.touched.image_base64))}
                    getBase64={handleDropFile}
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
