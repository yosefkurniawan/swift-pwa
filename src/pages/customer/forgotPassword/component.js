import Typography from '@components/Typography';
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import Toast from '@components/Toast';
import { GraphConfig } from '@services/graphql';
import Loading from '@components/Loaders/Backdrop';
import OtpBlock from '@components/OtpBlock';
import { useFormik } from 'formik';
import { regexPhone } from '@helpers/regex';
import * as Yup from 'yup';
import Router from 'next/router';
import { requestLinkToken } from './services/graphql';
import useStyles from './style';

const ForgotPassword = ({ t }) => {
    const styles = useStyles();
    const [toast, setToast] = React.useState({
        open: false,
        variant: 'success',
        text: '',
    });
    const { loading, data } = GraphConfig.otpConfig();
    const [load, setLoad] = React.useState(false);
    const [getToken] = requestLinkToken();
    const formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object().shape({
            email: data && !data.otpConfig.otp_enable[0].enable_otp_forgot_password && Yup.string()
                .required(t('validate:email:required')),
            phoneNumber: data && data.otpConfig.otp_enable[0].enable_otp_forgot_password
                && Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
            otp: data && data.otpConfig.otp_enable[0].enable_otp_forgot_password && Yup.string().required('Otp is required'),
        }),
        onSubmit: (values) => {
            setLoad(true);
            getToken({
                variables: values,
            }).then((res) => {
                setLoad(false);
                const { token } = res.data.requestLinkForgotPassword;
                if (token) Router.push(`/customer/account/newPassword?token=${token}`);
                setToast({
                    open: true,
                    variant: 'success',
                    text: t('customer:forgotPassword:success'),
                });
            }).catch(() => {
                setToast({
                    open: true,
                    variant: 'error',
                    text: t('customer:forgotPassword:failed'),
                });
                setLoad(false);
            });
        },
    });

    if (loading || !data) return <Loading open />;

    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <Loading open={load} />
            <Toast open={toast.open} setOpen={() => setToast({ ...toast, open: false })} message={toast.text} variant={toast.variant} />
            {
                data && data.otpConfig.otp_enable[0].enable_otp_forgot_password ? (
                    <OtpBlock
                        type="forgotPassword"
                        phoneProps={{
                            name: 'phoneNumber',
                            value: formik.values.phoneNumber,
                            onChange: formik.handleChange,
                            error: !!formik.errors.phoneNumber,
                            errorMessage: (formik.touched.phoneNumber && formik.errors.phoneNumber) || null,
                        }}
                        codeProps={{
                            name: 'otp',
                            value: formik.values.otp,
                            onChange: formik.handleChange,
                            error: !!(formik.touched.otp && formik.errors.otp),
                            errorMessage: (formik.touched.otp && formik.errors.otp) || null,
                        }}
                    />
                ) : (
                    <>
                        <Typography variant="span" align="left">
                            {t('customer:forgotPassword:content')}
                        </Typography>
                        <TextField
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!formik.errors.email}
                            errorMessage={formik.errors.email || null}
                        />
                    </>
                )
            }
            <Button disabled={load} className={styles.btn} fullWidth type="submit">
                {t('common:button:send')}
            </Button>
        </form>
    );
};

export default ForgotPassword;
