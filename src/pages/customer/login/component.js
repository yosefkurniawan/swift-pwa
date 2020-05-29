import TextField from '@components/Forms/TextField';
import PasswordField from '@components/Forms/Password';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Message from '@components/Toast';
import { FormControlLabel, Switch } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OtpBlock from '@components/OtpBlock';
import Loading from '@components/Loaders/Backdrop';
import { setLogin } from '@helpers/auth';
import { setCartId, getCartId } from '@helpers/cartId';
import { GraphCart, GraphConfig } from '@services/graphql';
import { getCustomer } from '@services/graphql/schema/customer';
import { useQuery } from '@apollo/react-hooks';
import { expiredToken, custDataNameCookie } from '@config';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { regexPhone } from '@helpers/regex';
import { getToken, getTokenOtp } from './service/graphql';
import useStyles from './style';
import { removeToken as deleteToken } from '../account/services/graphql';

const Login = ({ t, storeConfig, query }) => {
    const styles = useStyles();
    const [isOtp, setIsOtp] = React.useState(false);
    const [isRevokeToken, setRevokeToken] = React.useState(false);
    const [message, setMessage] = React.useState({
        open: false,
        text: '',
        variant: 'success',
    });
    const [loading, setLoading] = React.useState(false);
    const [cusIsLogin, setIsLogin] = React.useState(0);

    const handleOpenMessage = ({ variant, text }) => {
        setMessage({
            ...message,
            variant,
            text,
            open: !message.open,
        });
    };

    let cartId = '';
    const expired = storeConfig.oauth_access_token_lifetime_customer
        ? new Date(Date.now() + parseInt(storeConfig.oauth_access_token_lifetime_customer, 10) * 3600000)
        : expiredToken;

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }
    const [deleteTokenGql] = deleteToken();
    const [getCustomerToken] = getToken();
    const [getCustomerTokenOtp] = getTokenOtp();
    const [getCart, cartData] = GraphCart.getCustomerCartId();
    const [mergeCart, { called }] = GraphCart.mergeCart();
    const otpConfig = GraphConfig.otpConfig();
    const custData = useQuery(getCustomer, {
        context: {
            request: 'internal',
        },
        skip: !cusIsLogin,
    });

    // handle revoke token
    React.useEffect(() => {
        if (!isRevokeToken && typeof window !== 'undefined') {
            setRevokeToken(true);
            deleteTokenGql();
        }
    }, [isRevokeToken]);

    const LoginSchema = Yup.object().shape({
        username: isOtp ? Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong'))
            : Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        password: (!otpConfig.data || !otpConfig.data.otpConfig.otp_enable[0].enable_otp_login || !isOtp)
            && Yup.string().required(t('validate:password:required')),
        otp: otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && isOtp && Yup.number().required('Otp is required'),
    });
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            otp: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            let getTokenCustomer;
            let variables;
            if (isOtp) {
                getTokenCustomer = getCustomerTokenOtp;
                variables = {
                    username: values.username,
                    otp: values.otp,
                };
            } else {
                getTokenCustomer = getCustomerToken;
                variables = {
                    username: values.username,
                    password: values.password,
                };
            }
            setLoading(true);
            getTokenCustomer({
                variables,
            })
                .then(async (res) => {
                    let token = '';
                    if (isOtp) {
                        token = res.data.generateCustomerTokenCustomOtp.token;
                    } else {
                        token = res.data.generateCustomerTokenCustom.token;
                    }
                    if (token) {
                        setLogin(1, expired);
                        await setIsLogin(1);
                        getCart();
                    }
                })
                .catch((e) => {
                    setLoading(false);
                    handleOpenMessage({
                        variant: 'error',
                        text: e.message.split(':')[1] || t('customer:login:failed'),
                    });
                });
        },
    });
    if (cartData.data && custData.data) {
        Cookies.set(custDataNameCookie, {
            email: custData.data.customer.email,
        });
        const custCartId = cartData.data.customerCart.id;
        if (cartId === '' || !cartId) {
            setCartId(custCartId, expired);
            setLoading(false);
            handleOpenMessage({ variant: 'success', text: t('customer:login:success') });
            if (query && query.redirect) {
                Router.push(query.redirect);
            } else {
                Router.push('/customer/account');
            }
        } else if (!called && (cartId !== custCartId)) {
            mergeCart({
                variables: {
                    sourceCartId: cartId,
                    destionationCartId: custCartId,
                },
            })
                .then(() => {
                    setCartId(custCartId, expired);
                    setLoading(false);
                    handleOpenMessage({ variant: 'success', text: t('customer:login:success') });
                    if (query && query.redirect) {
                        Router.push(query.redirect);
                    } else {
                        Router.push('/customer/account');
                    }
                })
                .catch(() => {});
        } else if (query && query.redirect) {
            Router.push(query.redirect);
        } else {
            Router.push('/customer/account');
        }
    }

    return (
        <div>
            <Loading open={loading} />
            <Message open={message.open} variant={message.variant} setOpen={handleOpenMessage} message={message.text} />
            <form onSubmit={formik.handleSubmit} className={styles.container}>
                {otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && (
                    <FormControlLabel
                        control={<Switch checked={isOtp} onChange={() => setIsOtp(!isOtp)} name="useOtp" color="primary" />}
                        className={styles.selectLogin}
                        label={t('customer:login:switchPhone')}
                    />
                )}
                {isOtp ? (
                    <OtpBlock
                        type="login"
                        phoneProps={{
                            name: 'username',
                            placeholder: '+6281234xxxx',
                            value: formik.values.username,
                            onChange: formik.handleChange,
                            error: !!formik.errors.username,
                            errorMessage: formik.errors.username || null,
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
                        <TextField
                            name="username"
                            label="Email"
                            placeholder="john.doe@gmail.com"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={!!formik.errors.username}
                            errorMessage={formik.errors.username || null}
                        />
                        <PasswordField
                            name="password"
                            label="Password"
                            placeholder="********"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={!!formik.errors.password}
                            errorMessage={formik.errors.password || null}
                            showVisible
                        />
                    </>
                )}
                <div className={styles.rowCenter}>
                    <Button fullWidth type="submit" disabled={loading}>
                        <Typography variant="title" type="regular" letter="capitalize" color="white">
                            {loading ? 'Loading' : t('customer:login:pageTitle')}
                        </Typography>
                    </Button>
                    <Button fullWidth variant="text" href="/customer/account/forgotpassword">
                        <Typography variant="p" type="regular" letter="capitalize" decoration="underline">
                            {t('customer:login:forgotPassword')}
                        </Typography>
                    </Button>
                </div>
                <div className={styles.footer}>
                    <Typography variant="span" letter="capitalize" align="center">
                        {t('customer:login:notHaveAccount')}
                    </Typography>
                    <Button fullWidth variant="outlined" href="/customer/account/create" disabled={loading}>
                        <Typography variant="title" type="regular" letter="capitalize">
                            {t('customer:register:title')}
                        </Typography>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
