import TextField from '@components/Forms/TextField';
import PasswordField from '@components/Forms/Password';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Message from '@components/Toast';
import { FormControlLabel, Switch } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import OtpBlock from '@components/OtpBlock';
import Loading from '@components/Loaders/Backdrop';
import { setToken } from '@helpers/token';
import { setCartId, getCartId } from '@helpers/cartId';
import { GraphCart } from '@services/graphql';
import { expiredToken } from '@config';
import { getToken } from './service/graphql';

import useStyles from './style';


const Login = ({ t, storeConfig, query }) => {
    const styles = useStyles();
    const [isOtp, setIsOtp] = React.useState(false);
    const [message, setMessage] = React.useState({
        open: false,
        text: '',
        variant: 'success',
    });
    const [loading, setLoading] = React.useState(false);
    const [cusToken, setCusToken] = React.useState('');

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
        ? new Date(Date.now() + parseInt(storeConfig.oauth_access_token_lifetime_customer, 10) * 3600000) : expiredToken;

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    const [getCustomerToken] = getToken();
    const [getCart, cartData] = GraphCart.getCustomerCartId(cusToken);
    const [mergeCart, { called }] = GraphCart.mergeCart(cusToken);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('validate:email:wrong'))
            .required(t('validate:emailPhone')),
        password: Yup.string().required(t('validate:password:required')),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: ({ email, password }) => {
            setLoading(true);
            getCustomerToken({
                variables: {
                    email,
                    password,
                },
            }).then(async (res) => {
                const { token } = res.data.generateCustomerToken;
                await setCusToken(token);
                getCart();
            }).catch((e) => {
                setLoading(false);
                handleOpenMessage({
                    variant: 'error',
                    text: e.message.split(':')[1] || 'Login Failed!',
                });
            });
        },
    });
    if (cartData.data) {
        const custCartId = cartData.data.customerCart.id;
        if (cartId === '' || !cartId) {
            setToken(cusToken, expired);
            setCartId(custCartId, expired);
            setLoading(false);
            handleOpenMessage({ variant: 'success', text: 'Login Success!' });
            if (query && query.redirect) {
                Router.push(query.redirect);
            } else {
                Router.push('/customer/account');
            }
        } else if (!called) {
            mergeCart({
                variables: {
                    sourceCartId: cartId,
                    destionationCartId: custCartId,
                },
            }).then(() => {
                setToken(cusToken, expired);
                setCartId(custCartId, expired);
                setLoading(false);
                handleOpenMessage({ variant: 'success', text: 'Login Success!' });
                if (query && query.redirect) {
                    Router.push(query.redirect);
                } else {
                    Router.push('/customer/account');
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    return (
        <div>
            <Loading open={loading} />
            <Message
                open={message.open}
                variant={message.variant}
                setOpen={handleOpenMessage}
                message={message.text}
            />
            <form onSubmit={formik.handleSubmit} className={styles.container}>
                <FormControlLabel
                    control={(
                        <Switch
                            checked={isOtp}
                            onChange={() => setIsOtp(!isOtp)}
                            name="useOtp"
                            color="primary"
                        />
                    )}
                    className={styles.selectLogin}
                    label="Signin with Phone number"
                />
                {isOtp ? (
                    <OtpBlock
                        phoneProps={{
                            name: 'email',
                            placeholder: '+6281234xxxx',
                            value: formik.values.email,
                            onChange: formik.handleChange,
                            error: !!formik.errors.email,
                            errorMessage: formik.errors.email || null,
                        }}
                        codeProps={{
                            name: 'otp',
                            value: formik.values.otp,
                            onChange: formik.handleChange,
                            error: !!(formik.touched.otp && formik.errors.otp),
                            errorMessage:
                                (formik.touched.otp && formik.errors.otp)
                                || null,
                        }}
                    />
                ) : (
                    <>
                        <TextField
                            name="email"
                            label="Email"
                            placeholder="john.doe@gmail.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!formik.errors.email}
                            errorMessage={formik.errors.email || null}
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
                <Button fullWidth className={styles.btnSigin} type="submit" disabled={loading}>
                    <Typography
                        variant="title"
                        type="regular"
                        letter="capitalize"
                        color="white"
                    >
                        { loading ? 'Loading' : t('customer:login:pageTitle') }
                    </Typography>
                </Button>
                <Button variant="text" href="/customer/account/forgotPassword">
                    <Typography
                        variant="p"
                        type="regular"
                        letter="capitalize"
                        decoration="underline"
                    >
                        {t('customer:login:forgotPassword')}
                    </Typography>
                </Button>
                <div className={styles.footer}>
                    <Typography
                        variant="span"
                        letter="capitalize"
                        align="center"
                    >
                        {t('customer:login:notHaveAccount')}
                    </Typography>
                    <Button
                        fullWidth
                        className={styles.btnSigin}
                        variant="outlined"
                        href="/customer/account/create"
                        disabled={loading}
                    >
                        <Typography
                            variant="title"
                            type="regular"
                            letter="capitalize"
                        >
                            { t('customer:register:title') }
                        </Typography>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
