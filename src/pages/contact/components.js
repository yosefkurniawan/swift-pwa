import Loading from '@components/Loaders/Backdrop';
import Typography from '@components/Typography';
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import { regexPhone } from '@helpers/regex';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cmsContactIdentifiers, debuging } from '@root/swift.config.js';
import { GraphCms } from '@services/graphql';
import Alert from '@material-ui/lab/Alert';
import gqlService from './services/graphql';
import useStyles from './style';

const ContactForm = ({ t }) => {
    const styles = useStyles();

    const [contactusFormSubmit] = gqlService.contactusFormSubmit();
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            message: '',
            telephone: '',
        },
        validationSchema: Yup.object().shape({
            fullName: Yup.string().required(t('validate:fullName:required')),
            email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
            message: Yup.string().required(t('validate:message:required')),
            telephone: Yup.string().matches(regexPhone, t('validate:phoneNumber:wrong')),
        }),
        onSubmit: async (values) => {
            const response = await contactusFormSubmit({
                variables: {
                    email: values.email,
                    fullname: values.fullName,
                    message: values.message,
                    telephone: values.telephone,
                },
            });
            window.toastMessage({
                variant: 'success',
                open: true,
                text: response.data.contactusFormSubmit.success_message,
            });
        },
    });

    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <span style={{ margin: '0 0 10px -5px' }}>
                <Typography variant="h6" type="bold" align="left">
                    {t('contact:contactUs')}
                </Typography>
            </span>
            <TextField
                label={t('contact:fullName')}
                className={styles.fullName}
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={!!formik.errors.fullName}
                errorMessage={formik.errors.fullName || null}
            />
            <TextField
                label={t('contact:email')}
                className={styles.email}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                errorMessage={formik.errors.email || null}
            />
            <TextField
                label={t('contact:telephone')}
                className={styles.telephone}
                name="telephone"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                error={!!formik.errors.telephone}
                errorMessage={formik.errors.telephone || null}
            />
            <TextField
                label={t('contact:message')}
                className={styles.message}
                name="message"
                multiline
                rows="4"
                value={formik.values.message}
                onChange={formik.handleChange}
                error={!!formik.errors.message}
                errorMessage={formik.errors.message || null}
            />
            <Button className={styles.btn} fullWidth type="submit">
                {t('common:button:send')}
            </Button>
        </form>
    );
};

const ContactPage = (props) => {
    const { error, loading, data } = GraphCms.getCmsBlocks({ identifiers: [cmsContactIdentifiers] });
    if (error) {
        return (
            <div className="cms-container">
                <Alert className="m-15" severity="error">
                    {debuging.originalError ? error.message.split(':')[1] : props.t('common:error:fetchError')}
                </Alert>
            </div>
        );
    }
    if (loading) return <Loading open={loading} />;

    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="cms-container" dangerouslySetInnerHTML={{ __html: data.cmsBlocks.items[0].content }} />
            <ContactForm {...props} />
        </>
    );
};

export default ContactPage;
