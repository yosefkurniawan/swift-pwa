import Loading from '@components/Loaders';
import Typography from '@components/Typography';
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import { regexPhone } from '@helpers/regex';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cmsContactIdentifiers, recaptcha } from '@config';
import { GraphCms } from '@services/graphql';
import ReCAPTCHA from 'react-google-recaptcha';
import dynamic from 'next/dynamic';
import gqlService from './services/graphql';
import useStyles from './style';

const Message = dynamic(() => import('@components/Toast'), { ssr: false });

const ContactForm = ({ t }) => {
    const styles = useStyles();
    const [message, setMessage] = React.useState({
        open: false,
        variant: 'success',
        text: '',
    });
    const recaptchaRef = React.createRef();

    const [contactusFormSubmit] = gqlService.contactusFormSubmit();
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            message: '',
            telephone: '',
            captcha: '',
        },
        validationSchema: Yup.object().shape({
            fullName: Yup.string().required(t('validate:fullName:required')),
            email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
            message: Yup.string().required(t('validate:message:required')),
            captcha: Yup.string().required(`Captcha ${t('validate:required')}`),
            telephone: Yup.string().matches(regexPhone, t('validate:phoneNumber:wrong')).required(t('validate:phoneNumber:required')),
        }),
        onSubmit: async (values, { resetForm }) => {
            window.backdropLoader(true);
            fetch('/captcha-validation', {
                method: 'post',
                body: JSON.stringify({
                    response: values.captcha,
                }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((data) => data.json())
                .then((json) => {
                    if (json.success) {
                        contactusFormSubmit({
                            variables: {
                                email: values.email,
                                fullname: values.fullName,
                                message: values.message,
                                telephone: values.telephone,
                            },
                        }).then(() => {
                            resetForm({});
                            setMessage({
                                open: true,
                                variant: 'success',
                                text: t('contact:successSubmit'),
                            });
                        }).catch(() => {
                            setMessage({
                                open: true,
                                variant: 'error',
                                text: t('common:error:fetchError'),
                            });
                        });
                    } else {
                        setMessage({
                            open: true,
                            variant: 'error',
                            text: t('contact:failedSubmit'),
                        });
                    }
                    window.backdropLoader(false);
                })
                .catch(() => {
                    window.backdropLoader(false);
                    setMessage({
                        open: true,
                        variant: 'error',
                        text: t('common:error:fetchError'),
                    });
                });

            recaptchaRef.current.reset();
        },
    });

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
    };

    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <Message
                open={message.open}
                variant={message.variant}
                setOpen={() => setMessage({ ...message, open: false })}
                message={message.text}
            />
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
                error={!!(formik.touched.fullName && formik.errors.fullName)}
                errorMessage={(formik.touched.fullName && formik.errors.fullName) || null}
            />
            <TextField
                label={t('contact:email')}
                className={styles.email}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!(formik.touched.email && formik.errors.email)}
                errorMessage={(formik.touched.email && formik.errors.email) || null}
            />
            <TextField
                label={t('contact:telephone')}
                className={styles.telephone}
                name="telephone"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                error={!!(formik.touched.telephone && formik.errors.telephone)}
                errorMessage={(formik.touched.telephone && formik.errors.telephone) || null}
            />
            <TextField
                label={t('contact:message')}
                className={styles.message}
                name="message"
                multiline
                rows="4"
                value={formik.values.message}
                onChange={formik.handleChange}
                error={!!(formik.touched.message && formik.errors.message)}
                errorMessage={(formik.touched.message && formik.errors.message) || null}
            />
            {
                recaptcha.enable ? (
                    <>
                        <ReCAPTCHA
                            sitekey={recaptcha.siteKey.dev}
                            onChange={handleChangeCaptcha}
                            ref={recaptchaRef}
                        />
                        { formik.errors.captcha && (
                            <Typography color="red">{formik.errors.captcha}</Typography>
                        )}
                    </>
                ) : null
            }
            <Button className={styles.btn} fullWidth type="submit">
                {t('common:button:send')}
            </Button>
        </form>
    );
};

const ContactPage = (props) => {
    const { error, loading, data } = GraphCms.getCmsBlocks({ identifiers: [cmsContactIdentifiers] });
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
