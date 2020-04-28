import TextField from '@components/Forms/TextField';
import PasswordField from '@components/Forms/Password';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Message from '@components/SnackMessage';
import { FormControlLabel, Switch } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import OtpBlock from '@components/OtpBlock';
import { regexPhone } from '@helpers/regex';
import { setToken } from '@helpers/token';
import { getToken } from './service/graphql';

import useStyles from './style';

const Login = ({ t }) => {
    const styles = useStyles();
    const [isOtp, setIsOtp] = React.useState(false);
    const [message, setMessage] = React.useState({
        open: false,
        text: '',
        variant: 'success',
    });

    const handleOpenMessage = ({ variant, text }) => {
        setMessage({
            ...message,
            variant,
            text,
            open: !message.open,
        });
    };

    const mailCheck = new RegExp(/^(?=.*[@])/);

    const [getCustomerToken] = getToken();

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email((val) => {
                if (mailCheck.test(val.value)) {
                    if (!val.regex.test(val.value)) {
                        return t('validate:email:wrong');
                    }
                } else if (!regexPhone.test(val.value)) {
                    return t('validate:phoneNumber:wrong');
                }

                return false;
            })
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
            getCustomerToken({
                variables: {
                    email,
                    password,
                },
            }).then((res) => {
                setToken(res.data.generateCustomerToken.token);
                handleOpenMessage({ variant: 'success', text: 'Login Success!' });
                Router.push('/customer/account');
            }).catch(() => {
                handleOpenMessage({ variant: 'error', text: 'Login Failed!' });
            });
        },
    });

    return (
        <div>
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
                <Button fullWidth className={styles.btnSigin} type="submit">
                    <Typography
                        variant="title"
                        type="regular"
                        letter="capitalize"
                        color="white"
                    >
                        {t('customer:login:pageTitle')}
                    </Typography>
                </Button>
                <Button variant="text" href="/customer/account/forgot-password">
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
                    >
                        <Typography
                            variant="title"
                            type="regular"
                            letter="capitalize"
                        >
                            {t('customer:register:title')}
                        </Typography>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
