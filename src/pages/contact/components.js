import Loading from '@components/Loaders';
import Typography from '@components/Typography';
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
// import Toast from '@components/Toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cmsContactIdentifiers } from '@root/swift.config.js';
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
            telephone: Yup.string(),
        }),
        onSubmit: (values) => {
            contactusFormSubmit({
                email: values.email,
                fullname: values.fullName,
                message: values.message,
                telephone: values.telephone,
            });
        },
    });

    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <span style={{ margin: '0 0 10px -5px' }}>
                <Typography variant="h6" type="bold" align="left">
                    Contact Us
                </Typography>
            </span>
            <TextField
                label="Full Name"
                className={styles.fullName}
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={!!formik.errors.fullName}
                errorMessage={formik.errors.fullName || null}
            />
            <TextField
                label="Email"
                className={styles.email}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                errorMessage={formik.errors.email || null}
            />
            <TextField
                label="Message"
                className={styles.message}
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                error={!!formik.errors.message}
                errorMessage={formik.errors.message || null}
            />
            <TextField
                label="Telephone"
                className={styles.telephone}
                name="telephone"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                error={!!formik.errors.telephone}
                errorMessage={formik.errors.telephone || null}
            />
            <Button className={styles.btn} fullWidth type="submit">
                {t('common:button:send')}
            </Button>
        </form>
    );
};

const ContactPage = (props) => {
    const { error, loading, data } = gqlService.getContactPage({ identifiers: [cmsContactIdentifiers] });
    if (error) return <p>error</p>;
    if (loading) return <Loading size="50px" />;

    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="cms-container" dangerouslySetInnerHTML={{ __html: data.cmsBlocks.items[0].content }} />
            <ContactForm {...props} />
        </>
    );
};

export default ContactPage;
