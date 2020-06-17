import Button from '@components/Button';
import Password from '@components/Forms/Password';
import Toast from '@components/Toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import { newPassword } from './services/graphql';
import useStyles from './style';

const ForgotPassword = ({ t, query: { token } }) => {
    const styles = useStyles();
    const [toast, setToast] = React.useState({
        open: false,
        variant: 'success',
        text: '',
    });
    const [disabled, setdisabled] = React.useState(false);
    const [setNewPassword] = newPassword();
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().required(t('validate:password:required')),
            confirmPassword: Yup.string()
                .required(t('validate:confirmPassword:required'))
                // eslint-disable-next-line no-use-before-define
                .test('check-pass', t('validate:confirmPassword.wrong'), (input) => input === formik.values.password),
        }),
        onSubmit: (values) => {
            setdisabled(true);
            window.backdropLoader(true);
            setNewPassword({
                variables: {
                    ...values,
                    token,
                },
            })
                .then(async () => {
                    window.backdropLoader(false);
                    setdisabled(false);
                    setToast({
                        open: true,
                        variant: 'success',
                        text: t('customer:newPassword:success'),
                    });
                    setTimeout(() => {
                        Router.push('/customer/account/login');
                    }, 3000);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    setdisabled(false);
                    setToast({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('customer:newPassword:failed'),
                    });
                });
        },
    });

    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <Toast open={toast.open} setOpen={() => setToast({ ...toast, open: false })} message={toast.text} variant={toast.variant} />
            <Password
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={!!formik.errors.password}
                errorMessage={formik.errors.password || null}
                showVisible
                showPasswordMeter
            />
            <Password
                label={t('common:form:confirm')}
                className={styles.email}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={!!formik.errors.confirmPassword}
                errorMessage={formik.errors.confirmPassword || null}
            />
            <Button disabled={disabled} className={styles.btn} fullWidth type="submit">
                {t('common:button:send')}
            </Button>
        </form>
    );
};

export default ForgotPassword;
