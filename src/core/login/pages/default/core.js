/* eslint-disable no-use-before-define */
import Layout from '@layout';
import { setLogin, getLastPathWithoutLogin } from '@helpers/auth';
import { setCartId, getCartId } from '@helpers/cartId';
import { GraphCart, GraphConfig } from '@services/graphql';
import { getCustomer } from '@services/graphql/schema/customer';
import { useQuery } from '@apollo/react-hooks';
import { expiredToken, custDataNameCookie } from '@config';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { regexPhone } from '@helpers/regex';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getToken, getTokenOtp, removeToken as deleteToken } from '../../services/graphql';

const Login = (props) => {
    const {
        t, storeConfig, query, lastPathNoAuth, Content,
    } = props;
    const pageConfig = {
        title: t('login:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('login:pageTitle'),
        headerBackIcon: 'close',
        bottomNav: false,
    };
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
                        text: e.message.split(':')[1] || t('login:failed'),
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
            window.toastMessage({ open: true, variant: 'success', text: t('login:success') });
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
                    window.toastMessage({ open: true, variant: 'success', text: t('login:success') });
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
        <Layout {...props} pageConfig={pageConfig}>
            <Content
                formik={formik}
                otpConfig={otpConfig}
                isOtp={isOtp}
                setIsOtp={setIsOtp}
                t={t}
                setDisabled={setDisabled}
                disabled={disabled}
                loading={loading}
            />
        </Layout>
    );
};

export default Login;
