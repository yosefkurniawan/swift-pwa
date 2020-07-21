import Typography from '@components/Typography';
import Button from '@Button';
import TextField from '@components/Forms/TextField';
import Toast from '@components/Toast';
import { GraphConfig } from '@services/graphql';
import Loading from '@components/Loaders/Backdrop';
import OtpBlock from '@components/OtpBlock';
import { useFormik } from 'formik';
import { regexPhone } from '@helpers/regex';
import * as Yup from 'yup';
import Router from 'next/router';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { requestLinkToken } from './services/graphql';
import useStyles from './style';

const ForgotPassword = ({ t }) => {
    const styles = useStyles();
    const [toast, setToast] = React.useState({
        open: false,
        variant: 'success',
        text: '',
    });
    const [useEmail, setUseEmail] = React.useState(false);
    const { loading, data } = GraphConfig.otpConfig();
    const [load, setLoad] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [getToken] = requestLinkToken();
    const formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object().shape({
            email: (useEmail || (data && !data.otpConfig.otp_enable[0].enable_otp_forgot_password))
                && Yup.string().required(t('validate:email:required')),
            phoneNumber:
                !useEmail && data
                && data.otpConfig.otp_enable[0].enable_otp_forgot_password
                && Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
            otp: !useEmail && data && data.otpConfig.otp_enable[0].enable_otp_forgot_password && Yup.string().required('Otp is required'),
        }),
        onSubmit: (values) => {
            setLoad(true);
            const getVariables = () => (
                useEmail
                    ? { phoneNumber: '', otp: '', email: values.email }
                    : { phoneNumber: values.phoneNumber, otp: values.otp, email: '' }
            );
            getToken({
                variables: getVariables(),
            })
                .then((res) => {
                    setLoad(false);
                    const { token, message } = res.data.requestLinkForgotPassword;
                    if (token) {
                        setToast({
                            open: true,
                            variant: 'success',
                            text: t('customer:forgotPassword:success'),
                        });
                        setTimeout(() => {
                            Router.push(`/customer/account/newpassword?token=${token}`);
                        }, 3000);
                    } else {
                        setToast({
                            open: true,
                            variant: 'success',
                            text: message || t('customer:forgotPassword:successEmail1') + values.email + t('customer:forgotPassword:successEmail2'),
                        });
                    }
                })
                .catch((e) => {
                    setToast({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('customer:forgotPassword:failed'),
                    });
                    setLoad(false);
                });
        },
    });

    const handleSwitch = () => {
        setToast({ ...toast, open: false });
        setUseEmail(!useEmail);
    };

    React.useEffect(() => {
        setDisabled(!useEmail);
    }, [useEmail]);

    if (loading || !data) return <Loading open />;

    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <Loading open={load} />
            {data && data.otpConfig.otp_enable[0].enable_otp_forgot_password && (
                <FormControlLabel
                    control={<Switch checked={useEmail} onChange={handleSwitch} name="useOtp" color="primary" />}
                    className={styles.switch}
                    label={t('customer:forgotPassword:useEmail')}
                />
            )}
            {
                useEmail ? toast.open && (
                    <Toast
                        autoHideDuration={null}
                        open={toast.open}
                        setOpen={() => setToast({ ...toast, open: false })}
                        message={toast.text}
                        variant={toast.variant}

                    />
                )
                    : (
                        <Toast open={toast.open} setOpen={() => setToast({ ...toast, open: false })} message={toast.text} variant={toast.variant} />
                    )
            }
            {(useEmail || (data && !data.otpConfig.otp_enable[0].enable_otp_forgot_password)) && (
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
            )}
            {(data && data.otpConfig.otp_enable[0].enable_otp_forgot_password && !useEmail) && (
                <OtpBlock
                    setDisabled={setDisabled}
                    type="forgotPassword"
                    phoneProps={{
                        name: 'phoneNumber',
                        value: formik.values.phoneNumber,
                        onChange: formik.handleChange,
                        error: !!formik.errors.phoneNumber,
                        errorMessage: formik.errors.phoneNumber || null,
                    }}
                    codeProps={{
                        name: 'otp',
                        value: formik.values.otp,
                        onChange: formik.handleChange,
                        error: !!formik.errors.otp,
                        errorMessage: formik.errors.otp || null,
                    }}
                />
            )}
            <Button disabled={disabled || load} className={styles.btn} fullWidth type="submit">
                {t('common:button:send')}
            </Button>
        </form>
    );
};

export default ForgotPassword;
