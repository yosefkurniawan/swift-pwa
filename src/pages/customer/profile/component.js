/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import Button from '@common_button';
import Typography from '@common_typography';
import TextField from '@common_textfield';
import PasswordField from '@common_password';
import { regexPhone } from '@helpers/regex';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './style';
import { getCustomer } from '../../../services/graphql/repository/customer';
import gqlServices from './services/graphql';

const ProfileForm = ({ t, data }) => {
    const styles = useStyles();

    const [updateCustomer, updateCustomerStatus] = gqlServices.updateCustomer();
    const [changeCustomerPassword, changeCustomerPasswordStatus] = gqlServices.changeCustomerPassword();
    const [editEmail, setEditEmail] = React.useState(false);
    const [editPass, setEditPass] = React.useState(false);
    const [phoneIsWa, setPhoneIsWa] = React.useState(false);

    const ProfileSchema = Yup.object().shape({
        email: editEmail && Yup.string()
            .email(t('validate:email:wrong'))
            .required(t('validate:email:required')),
        firstName: Yup.string().required(t('validate:firstName:required')),
        lastName: Yup.string().required(t('validate:lastName:required')),
        phonenumber: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        whatsapp_number: Yup.string().required(t('validate:whatsappNumber:required')).matches(regexPhone, t('validate:whatsappNumber:wrong')),
        currentPassword:
            (editEmail || editPass) && Yup.string().required(t('validate:password:required')),
        password:
            editPass && Yup.string().required(t('validate:password:required')),
        confirmPassword:
            editPass
            && Yup.string()
                .required(t('validate:confirmPassword:required'))
                .test(
                    'check-pass',
                    t('validate:confirmPassword.wrong'),
                    // eslint-disable-next-line no-use-before-define
                    (input) => (input === formik.values.password),
                ),
    });

    const formik = useFormik({
        initialValues: {
            firstName: data.firstname,
            lastName: data.lastname,
            phonenumber: data.phonenumber || '',
            whatsapp_number: data.whatsapp_number || '',
            email: data.email,
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: ProfileSchema,
        onSubmit: async (values, { setSubmitting, setFieldValue }) => {
            if (!updateCustomerStatus.loading && !changeCustomerPasswordStatus.loading) {
                window.backdropLoader(true);
                await updateCustomer({
                    variables: {
                        firstname: values.firstName,
                        lastname: values.lastName,
                        email: editEmail ? values.email : data.email,
                        password: values.currentPassword,
                        phonenumber: values.phonenumber,
                        whatsapp_number: values.whatsapp_number,
                    },
                }).then(async () => {
                    if (editEmail) {
                        setFieldValue('currentPassword', '', false);
                    }
                    if (editPass) {
                        await changeCustomerPassword({
                            variables: {
                                currentPassword: values.currentPassword,
                                newPassword: values.password,
                            },
                        });
                        setFieldValue('currentPassword', '', false);
                        setFieldValue('password', '', false);
                        setFieldValue('confirmPassword', '', false);
                    }
                    setEditEmail(false);
                    setEditPass(false);
                    setSubmitting(false);
                    window.backdropLoader(false);
                    window.toastMessage({ variant: 'success', open: true, text: t('customer:profile:successUpdate') });
                }).catch((e) => {
                    window.toastMessage({ variant: 'error', open: true, text: e.message.split(':')[1] || t('common:error:fetchError') });
                    window.backdropLoader(false);
                });
            }
        },
    });

    const handleWa = () => {
        if (phoneIsWa === false) {
            // eslint-disable-next-line no-use-before-define
            formik.setFieldValue('whatsapp_number', formik.values.phonenumber);
        }
        setPhoneIsWa(!phoneIsWa);
    };

    const handleChangePhone = (event) => {
        const { value } = event.target;
        if (phoneIsWa) {
            formik.setFieldValue('whatsapp_number', value);
        }
        formik.setFieldValue('phonenumber', value);
    };

    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <TextField
                label={t('common:form:firstName')}
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                    !!(formik.touched.firstName && formik.errors.firstName)
                }
                errorMessage={
                    (formik.touched.firstName && formik.errors.firstName)
                    || null
                }
            />
            <TextField
                label={t('common:form:lastName')}
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                    !!(formik.touched.lastName && formik.errors.lastName)
                }
                errorMessage={
                    (formik.touched.lastName && formik.errors.lastName) || null
                }
            />

            <TextField
                label={t('common:form:phoneNumber')}
                name="phonenumber"
                value={formik.values.phonenumber}
                onChange={handleChangePhone}
                error={
                    !!(formik.touched.phonenumber && formik.errors.phonenumber)
                }
                errorMessage={
                    (formik.touched.phonenumber && formik.errors.phonenumber) || null
                }
                footer={(
                    <FormControlLabel
                        onChange={handleWa}
                        className={styles.checkWa}
                        control={<Checkbox name="whastapptrue" color="primary" size="small" />}
                        label={<Typography variant="p">{t('customer:register:isWhatsapp')}</Typography>}
                    />
                )}
            />
            {!phoneIsWa && (
                <TextField
                    label={`${t('common:form:phoneNumber')} Whatsapp`}
                    name="whatsapp_number"
                    value={formik.values.whatsapp_number}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.whatsapp_number && formik.errors.whatsapp_number)}
                    errorMessage={(formik.touched.whatsapp_number && formik.errors.whatsapp_number) || null}
                />
            )}
            <FormControlLabel
                className={styles.checkboxLabel}
                onChange={() => setEditEmail(!editEmail)}
                control={(
                    <Checkbox
                        checked={editEmail}
                        name="emailCheckbox"
                        color="primary"
                        size="medium"
                    />
                )}
                label={(
                    <Typography variant="span">
                        {t('common:button:change')}
                        {' '}
                        Email
                    </Typography>
                )}
            />

            <FormControlLabel
                className={styles.checkboxLabel}
                onChange={() => setEditPass(!editPass)}
                control={(
                    <Checkbox
                        checked={editPass}
                        name="passwordCheckbox"
                        color="primary"
                        size="medium"
                    />
                )}
                label={(
                    <Typography variant="span">
                        {t('common:button:change')}
                        {' '}
                        Password
                    </Typography>
                )}
            />

            <div className={styles.editContainer}>
                <div className={editEmail ? 'show' : 'hide'}>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            !!(formik.touched.email && formik.errors.email)
                        }
                        errorMessage={
                            (formik.touched.email && formik.errors.email) || null
                        }
                    />
                </div>
                <div className={editEmail || editPass ? 'show' : 'hide'}>
                    <PasswordField
                        label={t('common:form:currentPassword')}
                        showVisible
                        name="currentPassword"
                        value={formik.values.currentPassword}
                        onChange={formik.handleChange}
                        error={
                            !!(formik.touched.currentPassword
                            && formik.errors.currentPassword)
                        }
                        errorMessage={
                            (formik.touched.currentPassword
                                && formik.errors.currentPassword)
                            || null
                        }
                    />
                </div>
                <div className={editPass ? 'show' : 'hide'}>
                    <PasswordField
                        label="Password"
                        showVisible
                        showPasswordMeter
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                            !!(formik.touched.password && formik.errors.password)
                        }
                        errorMessage={
                            (formik.touched.password
                                && formik.errors.password)
                            || null
                        }
                    />
                    <TextField
                        label={t('common:form:confirm')}
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={
                            !!(formik.touched.confirmPassword
                            && formik.errors.confirmPassword)
                        }
                        errorMessage={
                            (formik.touched.confirmPassword
                                && formik.errors.confirmPassword)
                            || null
                        }
                    />
                </div>
            </div>

            <div className={styles.bottomButtons}>
                <Button
                    fullWidth
                    type="submit"
                    loading={updateCustomerStatus.loading || changeCustomerPasswordStatus.loading}
                >
                    {t('common:button:save')}
                </Button>
            </div>
        </form>
    );
};

const ProfilePageSkeleton = () => {
    const styles = useStyles();
    const TextFieldSkeleton = () => (
        <Grid container className={styles.skeletonField} spacing={2} direction="column">
            <Skeleton className={styles.skeleton} variant="rect" width="25%" height={18} animation="wave" />
            <Skeleton className={styles.skeleton} variant="rect" width="80%" height={18} animation="wave" />
        </Grid>
    );
    const CheckboxSkeleton = () => (
        <Grid container className={styles.skeletonField} spacing={1} direction="row">
            <Skeleton className={styles.skeleton} variant="rect" width="20px" height={18} animation="wave" />
            <Skeleton className={styles.skeleton} variant="rect" width="30%" height={18} animation="wave" />
        </Grid>
    );
    return (
        <div className={styles.skeletonContainer}>
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <CheckboxSkeleton />
            <CheckboxSkeleton />
            <TextFieldSkeleton />
            <Grid container className={styles.skeletonField} alignItems="center" direction="column">
                <Skeleton className={styles.skeleton} variant="rect" width="90%" height={32} animation="wave" />
            </Grid>
        </div>
    );
};

const ProfilePage = (props) => {
    const { error, loading, data } = getCustomer();

    if (loading) return <ProfilePageSkeleton />;
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return null;

    return (
        <ProfileForm
            {...props}
            data={data.customer}
        />
    );
};

export default ProfilePage;
