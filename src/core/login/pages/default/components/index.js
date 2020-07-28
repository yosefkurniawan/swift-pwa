import TextField from '@common_textfield';
import PasswordField from '@common_password';
import Button from '@common_button';
import Typography from '@common_typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import OtpBlock from '../../../plugins/otp';
import OtpView from '../../../plugins/otp/view';

import useStyles from './style';

const Login = (props) => {
    const {
        formik, otpConfig, isOtp, setIsOtp, t, setDisabled, disabled, loading,
    } = props;
    const styles = useStyles();
    return (
        <form onSubmit={formik.handleSubmit} className={styles.container}>
            {otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && (
                <FormControlLabel
                    control={<Switch checked={isOtp} onChange={() => setIsOtp(!isOtp)} name="useOtp" color="primary" />}
                    className={styles.selectLogin}
                    label={t('login:switchPhone')}
                />
            )}
            {isOtp ? (
                <OtpBlock
                    setDisabled={setDisabled}
                    type="login"
                    OtpView={OtpView}
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
                        {loading ? 'Loading' : t('login:pageTitle')}
                    </Typography>
                </Button>
                <Button fullWidth variant="text" href="/customer/account/forgotpassword">
                    <Typography variant="p" type="regular" letter="capitalize" decoration="underline">
                        {t('login:forgotPassword')}
                    </Typography>
                </Button>
            </div>
            <div className={styles.footer}>
                <Typography variant="span" letter="capitalize" align="center">
                    {t('login:notHaveAccount')}
                </Typography>
                <Button fullWidth variant="outlined" href="/customer/account/create" disabled={disabled}>
                    <Typography variant="title" type="regular" letter="capitalize">
                        {t('login:registerTitle')}
                    </Typography>
                </Button>
            </div>
        </form>
    );
};

export default Login;
