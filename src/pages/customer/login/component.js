import TextField from '@components/Forms/TextField';
import PasswordField from '@components/Forms/Password';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import { regexPhone } from '@helpers/regex';
import useStyles from './style';

const Login = ({ t }) => {
    const styles = useStyles();
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email((val) => {
                const mailCheck = new RegExp(/^(?=.*[@])/);
                if (mailCheck.test(val.value)) {
                    if (!val.regex.test(val.value)) {
                        return t('validate:email:wrong');
                    }
                } else if (!regexPhone.test(val.value)) return t('validate:phoneNumber:wrong');

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
        onSubmit: () => {
            Router.push('/customer/account');
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={styles.container}>
                <TextField
                    name="email"
                    label="Email/Phone Number"
                    placeholder="+6281234xxxx"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={!!formik.errors.email}
                    errorMessage={formik.errors.email || null}
                />
                <PasswordField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="********"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={!!formik.errors.password}
                    errorMessage={formik.errors.password || null}
                    showVisible
                />
                <Button
                    fullWidth
                    className={styles.btnSigin}
                    type="submit"
                >
                    <Typography
                        variant="title"
                        type="regular"
                        letter="capitalize"
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
