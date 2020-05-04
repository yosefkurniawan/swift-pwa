import Loading from '@components/Loaders';
import Typography from '@components/Typography';
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
// import Toast from '@components/Toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cmsContactIdentifiers } from '@root/swift.config.js';
import { getContactPage } from './services/graphql';
import useStyles from './style';

const ContactForm = ({ t }) => {
    const styles = useStyles();
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
        },
        validationSchema: Yup.object().shape({
            fullName: Yup.string().required(t('validate:fullName:required')),
            email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        }),
        onSubmit: () => {
            console.log(new Date());
        },
    });

    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <Typography variant="h6" type="bold" align="left">
                Contact Us
            </Typography>
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
            <Button className={styles.btn} fullWidth type="submit">
                {t('common:button:send')}
            </Button>
        </form>
    );
};

const ContactPage = (props) => {
    const { error, loading, data } = getContactPage({ identifiers: [cmsContactIdentifiers] });
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
