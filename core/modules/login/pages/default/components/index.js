/* eslint-disable no-nested-ternary */
import React from 'react';
import TextField from '@common_textfield';
import PasswordField from '@common_password';
import Button from '@common_button';
import Typography from '@common_typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import { breakPointsUp } from '@helper_theme';
import classNames from 'classnames';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import OtpBlock from '../../../plugins/otp';
import OtpView from '../../../plugins/otp/view';
import useStyles from './style';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccess: () => false,
    },
};

const Login = (props) => {
    const {
        formik, otpConfig, isOtp, setIsOtp, t, setDisabled, disabled, loading, formikOtp, toastMessage,
    } = props;
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    return (
        <div className={styles.container}>
            {!desktop && otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && (
                <FormControlLabel
                    control={<Switch checked={isOtp} onChange={() => setIsOtp(!isOtp)} name="useOtp" color="primary" />}
                    className={classNames(styles.selectLogin, 'hidden-desktop')}
                    label={t('login:switchPhone')}
                />
            )}
            <div className={classNames('row between-sm between-md between-lg', styles.desktopContainer)}>
                <div className="col-sm-12 col-md-12 col-lg-12 hidden-mobile">
                    <Typography type="bold" variant="h1" className={styles.title}>
                        {t('login:customerLogin')}
                    </Typography>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className="row">
                        <div className="col-sm-12 hidden-mobile">
                            <div className={styles.headerSpan}>
                                <Typography variant="span" className="clear-margin-padding" letter="uppercase">
                                    {t('login:registerCustomer')}
                                </Typography>
                            </div>
                        </div>
                        {
                            (!isOtp || desktop) && (
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className={classNames(styles.spanLabel, 'hidden-mobile')}>
                                        <Typography type="bold" variant="p" className="clear-margin-padding">
                                            {t('login:loginInformation')}
                                        </Typography>
                                    </div>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="row center-xs start-sm">
                                            <div className="col-xs-12 col-sm-12">
                                                <TextField
                                                    name="username"
                                                    label="Email"
                                                    placeholder="john.doe@gmail.com"
                                                    value={formik.values.username}
                                                    onChange={formik.handleChange}
                                                    error={!!formik.errors.username}
                                                    errorMessage={formik.errors.username || null}
                                                />
                                            </div>
                                            <div className="col-xs-12  col-sm-12">
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
                                            </div>
                                            <div className="col-xs-12 col-sm-12">
                                                <Button
                                                    className={styles.generalButton}
                                                    fullWidth={!desktop}
                                                    type="submit"
                                                    disabled={(desktop) ? false : disabled}
                                                    align={desktop ? 'left' : 'center'}
                                                >
                                                    <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                        {loading ? 'Loading' : t('login:pageTitle')}
                                                    </Typography>
                                                </Button>
                                            </div>
                                            <div className="col-xs-12 col-sm-12">
                                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                            </div>
                                            <div className="col-xs-12 col-sm-12">
                                                <Button
                                                    fullWidth={false}
                                                    variant="text"
                                                    href="/customer/account/forgotpassword"
                                                    align={desktop ? 'left' : 'center'}
                                                >
                                                    <Typography variant="span" type="regular" letter="capitalize" decoration="underline">
                                                        {t('login:forgotPassword')}
                                                    </Typography>
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 hidden-mobile">
                            <div className={classNames('row middle-sm', styles.spanDivider)}>
                                <div className="col-sm-12">
                                    <Divider />
                                </div>
                            </div>
                        </div>
                        {
                            (isOtp || desktop) && (
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className={classNames(styles.spanLabel, 'hidden-mobile')}>
                                        <Typography type="bold" variant="p" className="clear-margin-padding">
                                            {t('login:loginOtpInformation')}
                                        </Typography>
                                    </div>
                                    <form onSubmit={formikOtp.handleSubmit} className={styles.formOtp}>
                                        <div className="row center-xs start-sm">
                                            <div className="col-xs-12 col-sm-12">
                                                <OtpBlock
                                                    setDisabled={setDisabled}
                                                    type="login"
                                                    OtpView={OtpView}
                                                    phoneProps={{
                                                        name: 'username',
                                                        placeholder: '+6281234xxxx',
                                                        value: formikOtp.values.username,
                                                        onChange: formikOtp.handleChange,
                                                        error: !!formikOtp.errors.username,
                                                        errorMessage: formikOtp.errors.username || null,
                                                    }}
                                                    codeProps={{
                                                        name: 'otp',
                                                        value: formikOtp.values.otp,
                                                        onChange: formikOtp.handleChange,
                                                        error: !!(formikOtp.touched.otp && formikOtp.errors.otp),
                                                        errorMessage: (formikOtp.touched.otp && formikOtp.errors.otp) || null,
                                                    }}
                                                />
                                            </div>
                                            <div className="col-xs-12 col-sm-12">
                                                <Button
                                                    className={styles.generalButton}
                                                    fullWidth={!desktop}
                                                    type="submit"
                                                    disabled={disabled}
                                                    align={desktop ? 'left' : 'center'}
                                                >
                                                    <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                        {loading ? 'Loading' : t('common:button:submit')}
                                                    </Typography>
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 hidden-mobile">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className={styles.headerSpan}>
                                <Typography className="clear-margin-padding" variant="span" letter="uppercase">
                                    {t('login:newCustomer')}
                                </Typography>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <Typography variant="p">
                                {t('login:registerInformation')}
                            </Typography>
                        </div>
                        <div className="col-sm-12">
                            <Button
                                className={styles.generalButton}
                                fullWidth={false}
                                href="/customer/account/create"
                                disabled={(desktop) ? false : disabled}
                                align={desktop ? 'left' : 'center'}
                            >
                                <Typography color="white" variant="span" type="bold" letter="uppercase">
                                    {t('login:registerTitle')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
                {toastMessage}
            </div>
        </div>
    );
};

export default Login;
