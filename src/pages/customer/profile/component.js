import Button from '@components/Button';
import Typography from '@components/Typography';
import TextField from '@components/Forms/TextField';
import PasswordField from '@components/Forms/Password';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useStyles from './style';

const ProfilePage = ({ t }) => {
    const styles = useStyles();

    const [edit, setEdit] = React.useState(false);
    const [editPass, setEditPass] = React.useState(false);
    const [editEmail, setEditEmail] = React.useState(false);

    const ProfileSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('validate:email:wrong'))
            .required(t('validate:email:required')),
        firstName: Yup.string().required(t('validate:firstName:required')),
        lastName: Yup.string().required(t('validate:lastName:required')),
        currentPassword:
            editPass && Yup.string().required(t('validate:password:required')),
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
            firstName: 'Diasty',
            lastName: 'Hardika putri',
            email: 'hardikaputri@icube.us',
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: ProfileSchema,
        onSubmit: (value, { setSubmitting }) => {
            setEdit(false);
            setEditPass(false);
            setEditEmail(false);
            setSubmitting(false);
        },
    });

    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <TextField
                label="First Name"
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
                disabled={!edit}
            />
            <TextField
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                    !!(formik.touched.lastName && formik.errors.lastName)
                }
                errorMessage={
                    (formik.touched.lastName && formik.errors.lastName) || null
                }
                disabled={!edit}
            />
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
                disabled={!editEmail}
            />

            <FormControlLabel
                className={styles.checkboxLabel}
                onChange={() => setEditEmail(!editEmail)}
                disabled={!edit}
                control={(
                    <Checkbox
                        checked={editEmail}
                        name="whastapptrue"
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
                disabled={!edit}
                control={(
                    <Checkbox
                        checked={editPass}
                        name="whastapptrue"
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

            <div
                className={[
                    styles.editContainer,
                    edit ? 'show' : 'hide',
                ]}
            >
                <div className={editPass ? 'show' : 'hide'}>
                    <PasswordField
                        label="Current Password"
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
                        disabled={!editPass}
                    />
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
                        disabled={!editPass}
                    />
                    <TextField
                        label="Confirm Password"
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
                        disabled={!editPass}
                    />
                </div>
            </div>

            <div className={styles.bottomButtons}>
                <Button
                    variant="outlined"
                    fullWidth
                    className={edit ? 'hide' : 'show'}
                    onClick={() => setEdit(!edit)}
                >
                    {t('common:button:change')}
                    {' '}
                    Data
                </Button>
                <Button
                    fullWidth
                    className={edit ? 'show' : 'hide'}
                    type="submit"
                >
                    {t('common:button:save')}
                </Button>
            </div>
        </form>
    );
};

export default ProfilePage;
