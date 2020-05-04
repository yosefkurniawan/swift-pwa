import Button from '@components/Button';
import PasswordField from '@components/Forms/Password';
import TextField from '@components/Forms/TextField';
import Typography from '@components/Typography';
import { regexPhone } from '@helpers/regex';
import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core/';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import Toast from '@components/Toast';
import Backdrop from '@components/Loaders/Backdrop';
import OtpBlock from '@components/OtpBlock';
import { setToken } from '@helpers/token';
import { setCartId, getCartId } from '@helpers/cartId';
import { GraphCart, GraphConfig } from '@services/graphql';
import { expiredToken } from '@config';
import { register } from './services/graphql';
import useStyles from './style';

const Register = ({ t }) => {
    const styles = useStyles();
    const [phoneIsWa, setPhoneIsWa] = React.useState(false);
    const [message, setMessage] = React.useState({
        open: false,
        variant: 'success',
        text: '',
    });
    const [cusToken, setCusToken] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    let cartId = '';

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    const [getCart, cartData] = GraphCart.getCustomerCartId(cusToken);
    const [mergeCart] = GraphCart.mergeCart(cusToken);
    const otpConfig = GraphConfig.otpConfig();

    const [sendRegister] = register();

    const handleWa = async () => {
        if (phoneIsWa === false) {
            // eslint-disable-next-line no-use-before-define
            formik.setFieldValue('whatsappNumber', formik.values.phoneNumber);
        }
        setPhoneIsWa(!phoneIsWa);
    };

    const RegisterSchema = Yup.object().shape({
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        firstName: Yup.string().required(t('validate:firstName:required')),
        lastName: Yup.string().required(t('validate:lastName:required')),
        password: Yup.string().required(t('validate:password:required')),
        confirmPassword: Yup.string()
            .required(t('validate:confirmPassword:required'))
            // eslint-disable-next-line no-use-before-define
            .test('check-pass', t('validate:confirmPassword.wrong'), (input) => input === formik.values.password),
        phoneNumber: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        whatsappNumber: Yup.string().required(t('validate:whatsappNumber:required')).matches(regexPhone, t('validate:whatsappNumber:wrong')),
        tos: Yup.boolean().oneOf([true], t('validate:tos:required')),
        otp: otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_register && Yup.number().required('Otp is required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            whatsappNumber: '',
            tos: false,
            subscribe: false,
            otp: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: (values) => {
            setLoading(true);
            sendRegister({
                variables: values,
            })
                .then(async (res) => {
                    const { token } = res.data.createCustomerCustom;
                    await setCusToken(token);
                    getCart();
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    setMessage({
                        open: true,
                        text: 'Register failed!',
                        variant: 'error',
                    });
                });
        },
    });

    if (cartData.data) {
        const custCartId = cartData.data.customerCart.id;
        if (cartId === '' || !cartId) {
            setToken(cusToken, expiredToken);
            setCartId(custCartId, expiredToken);
            setMessage({
                open: true,
                text: 'Register success',
                variant: 'success',
            });
            Router.push('/customer/account');
        } else {
            mergeCart({
                variables: {
                    sourceCartId: cartId,
                    destionationCartId: custCartId,
                },
            })
                .then(() => {
                    setToken(cusToken, expiredToken);
                    setCartId(custCartId, expiredToken);
                    setMessage({
                        open: true,
                        text: 'Register success',
                        variant: 'success',
                    });
                    Router.push('/customer/account');
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }

    return (
        <>
            <Backdrop open={loading} />
            <Toast open={message.open} message={message.text} variant={message.variant} setOpen={() => setMessage({ ...message, open: false })} />
            <form className={styles.container} onSubmit={formik.handleSubmit}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.firstName && formik.errors.firstName)}
                    errorMessage={(formik.touched.firstName && formik.errors.firstName) || null}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.lastName && formik.errors.lastName)}
                    errorMessage={(formik.touched.lastName && formik.errors.lastName) || null}
                />
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.email && formik.errors.email)}
                    errorMessage={(formik.touched.email && formik.errors.email) || null}
                />
                <PasswordField
                    label="Password"
                    showVisible
                    showPasswordMeter
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.password && formik.errors.password)}
                    errorMessage={(formik.touched.password && formik.errors.password) || null}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    errorMessage={(formik.touched.confirmPassword && formik.errors.confirmPassword) || null}
                />
                {otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_register ? (
                    <OtpBlock
                        type="register"
                        phoneProps={{
                            name: 'phoneNumber',
                            value: formik.values.phoneNumber,
                            onChange: formik.handleChange,
                            error: !!formik.errors.phoneNumber,
                            errorMessage: (formik.touched.phoneNumber && formik.errors.phoneNumber) || null,
                            footer: (
                                <FormControlLabel
                                    onChange={handleWa}
                                    className={styles.checkWa}
                                    control={<Checkbox name="whastapptrue" color="primary" size="small" />}
                                    label={<Typography variant="p">Phone Number is Registered in Whatsapp</Typography>}
                                />
                            ),
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
                    <TextField
                        label="Phone number"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                        errorMessage={(formik.touched.phoneNumber && formik.errors.phoneNumber) || null}
                        footer={(
                            <FormControlLabel
                                onChange={handleWa}
                                className={styles.checkWa}
                                control={<Checkbox name="whastapptrue" color="primary" size="small" />}
                                label={<Typography variant="p">Phone Number is Registered in Whatsapp</Typography>}
                            />
                        )}
                    />
                )}
                {!phoneIsWa && (
                    <TextField
                        label="Whatsapp Phone Number"
                        name="whatsappNumber"
                        value={formik.values.whatsappNumber}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.whatsappNumber && formik.errors.whatsappNumber)}
                        errorMessage={(formik.touched.whatsappNumber && formik.errors.whatsappNumber) || null}
                    />
                )}
                <div className={styles.footer}>
                    <FormControl>
                        <div className={styles.tos}>
                            <Checkbox
                                value={formik.values.tos}
                                name="tos"
                                color="primary"
                                size="small"
                                onChange={formik.handleChange}
                                className={styles.checkTos}
                            />
                            <Typography variant="p" letter="capitalize" onClick={() => formik.setFieldValue('tos', !formik.values.tos)}>
                                I accept
                            </Typography>
                            <Button
                                variant="text"
                                // eslint-disable-next-line no-console
                                onClick={() => console.log('tos')}
                                className="clear-margin-padding"
                            >
                                <Typography variant="p" letter="capitalize" decoration="underline">
                                    Terms of Use
                                </Typography>
                            </Button>
                        </div>
                        {formik.touched.tos && formik.errors.tos && (
                            <Typography color="red" className="clear-margin-padding">
                                {formik.errors.tos}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControlLabel
                        value={formik.values.subscribe}
                        onChange={formik.handleChange}
                        name="subscribe"
                        control={<Checkbox name="subscribe" color="primary" size="small" />}
                        label={(
                            <Typography variant="p" letter="capitalize" className="row center">
                                Sign up for Newsletter
                            </Typography>
                        )}
                    />
                    <Button disabled={loading} fullWidth className={styles.btnSigin} type="submit">
                        <Typography variant="title" type="regular" letter="capitalize" color="white">
                            {t('customer:register:button')}
                        </Typography>
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Register;
