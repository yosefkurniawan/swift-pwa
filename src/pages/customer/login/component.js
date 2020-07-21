/* eslint-disable no-use-before-define */
import TextField from '@common_textfield';
import PasswordField from '@common_password';
import Button from '@common_button';
import Typography from '@common_typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OtpBlock from '@components/OtpBlock';
import { setLogin, getLastPathWithoutLogin } from '@helpers/auth';
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

const Login = ({
    t, storeConfig, query, lastPathNoAuth,
}) => {
    const styles = useStyles();
    const [isOtp, setIsOtp] = React.useState(false);
    const [isDidUpdate, setIsDidUpdate] = React.useState({});
    const [isRevokeToken, setRevokeToken] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [cusIsLogin, setIsLogin] = React.useState(0);

    let cartId = '';
    let redirectLastPath = lastPathNoAuth;
    const expired = storeConfig.oauth_access_token_lifetime_customer
        ? new Date(Date.now() + parseInt(storeConfig.oauth_access_token_lifetime_customer, 10) * 3600000)
        : expiredToken;

    if (typeof window !== 'undefined') {
        cartId = getCartId();
        if (lastPathNoAuth === '' || !lastPathNoAuth) {
            redirectLastPath = getLastPathWithoutLogin();
        }
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

    // togle disabled when user just switch to otp mode
    React.useEffect(() => {
        if (isDidUpdate.isOtp && formik.dirty) {
            /* only validate form when:
                isOtp changed for not first time / initial && formik is dirty
            */
            formik.validateForm();
        } else {
            setIsDidUpdate({ isOtp: true });
        }

        // disabled when user switch to otp mode
        setDisabled(isOtp);
    }, [isOtp]);

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
            setDisabled(true);
            setLoading(true);
            window.backdropLoader(true);
            getTokenCustomer({
                variables,
            })
                .then(async (res) => {
                    let token = '';
                    if (isOtp) {
                        token = res.data.internalGenerateCustomerTokenOtp.token;
                    } else {
                        token = res.data.internalGenerateCustomerToken.token;
                    }
                    if (token) {
                        setLogin(1, expired);
                        await setIsLogin(1);
                        getCart();
                    }
                })
                .catch((e) => {
                    setDisabled(false);
                    setLoading(false);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('customer:login:failed'),
                    });
                });
        },
    });
    if (cartData.data && custData.data) {
        Cookies.set(custDataNameCookie, {
            email: custData.data.customer.email,
            firstname: custData.data.customer.firstname,
        });
        const custCartId = cartData.data.customerCart.id;
        if (cartId === '' || !cartId) {
            setCartId(custCartId, expired);
            setDisabled(false);
            window.backdropLoader(false);
            window.toastMessage({ open: true, variant: 'success', text: t('customer:login:success') });
            if (query && query.redirect) {
                Router.push(query.redirect);
            } else if (redirectLastPath && redirectLastPath !== '') {
                Router.push(redirectLastPath);
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
                    setDisabled(false);
                    window.backdropLoader(false);
                    window.toastMessage({ open: true, variant: 'success', text: t('customer:login:success') });
                    if (query && query.redirect) {
                        Router.push(query.redirect);
                    } else if (redirectLastPath && redirectLastPath !== '') {
                        Router.push(redirectLastPath);
                    } else {
                        Router.push('/customer/account');
                    }
                })
                .catch(() => {});
        } else if (query && query.redirect) {
            Router.push(query.redirect);
        } else if (redirectLastPath && redirectLastPath !== '') {
            Router.push(redirectLastPath);
        }
    }

    return (
        <div>
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
                        setDisabled={setDisabled}
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
                    <Button fullWidth type="submit" disabled={disabled}>
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
                    <Button fullWidth variant="outlined" href="/customer/account/create" disabled={disabled}>
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
