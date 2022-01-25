import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { regexPhone } from '@helper_regex';
import { debuging } from '@config';
import { getAppEnv } from '@helpers/env';
import gqlService from '@core_modules/contact/services/graphql';
import { contactConfig } from '@services/graphql/repository/pwa_config';
import { useRef } from 'react';

const Contact = (props) => {
    const {
        Content,
        t,
        pageConfig,
        ErrorInfo,
        Skeleton,
        isCms = false,
        storeConfig,
    } = props;

    const appEnv = getAppEnv();
    // enable recaptcha
    let enableRecaptcha = false;
    const Config = {
        title: t('contact:pageTitle'),
        headerTitle: t('contact:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };
    const [message, setMessage] = React.useState({
        open: false,
        variant: 'success',
        text: '',
    });
    const [load, setLoad] = React.useState(false);
    const recaptchaRef = useRef();

    // query config cms contact identifier
    let cmsContactIdentifiers;
    const { loading: loadingConfig, data: dataContactConfig } = contactConfig();
    let sitekey;

    if (appEnv === 'local') {
        sitekey = dataContactConfig
                && dataContactConfig.storeConfig
                && dataContactConfig.storeConfig.pwa
                && dataContactConfig.storeConfig.pwa.recaptcha_site_key_local;
    } else if (appEnv === 'dev') {
        sitekey = dataContactConfig
                && dataContactConfig.storeConfig
                && dataContactConfig.storeConfig.pwa
                && dataContactConfig.storeConfig.pwa.recaptcha_site_key_dev;
    } else if (appEnv === 'stage') {
        sitekey = dataContactConfig
                && dataContactConfig.storeConfig
                && dataContactConfig.storeConfig.pwa
                && dataContactConfig.storeConfig.pwa.recaptcha_site_key_stage;
    } else if (appEnv === 'prod') {
        sitekey = dataContactConfig
                && dataContactConfig.storeConfig
                && dataContactConfig.storeConfig.pwa
                && dataContactConfig.storeConfig.pwa.recaptcha_site_key_prod;
    }

    const [contactusFormSubmit] = gqlService.contactusFormSubmit();
    if (!loadingConfig && dataContactConfig && dataContactConfig.storeConfig && dataContactConfig.storeConfig.pwa) {
        if (dataContactConfig.storeConfig.pwa.cms_contact_identifiers
            && dataContactConfig.storeConfig.pwa.cms_contact_identifiers !== '') {
            cmsContactIdentifiers = dataContactConfig.storeConfig.pwa.cms_contact_identifiers;
        }

        if (dataContactConfig.storeConfig.pwa.recaptcha_contact_enable !== null) {
            enableRecaptcha = (storeConfig && storeConfig.pwa.recaptcha_enable)
                            && (dataContactConfig && dataContactConfig.storeConfig
                                && dataContactConfig.storeConfig.pwa
                                && dataContactConfig.storeConfig.pwa.recaptcha_contact_enable);
        }
    }

    const submitForm = async (values, resetForm) => {
        contactusFormSubmit({
            variables: {
                email: values.email,
                fullname: values.fullName,
                message: values.message,
                telephone: values.telephone,
            },
        })
            .then(() => {
                resetForm({});
                setMessage({
                    open: true,
                    variant: 'success',
                    text: t('contact:successSubmit'),
                });
            })
            .catch(() => {
                setMessage({
                    open: true,
                    variant: 'error',
                    text: t('common:error:fetchError'),
                });
            });
    };

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
            captcha: enableRecaptcha && Yup.string().required(`Captcha ${t('validate:required')}`),
            telephone: Yup.string().matches(regexPhone, t('validate:phoneNumber:wrong')).required(t('validate:phoneNumber:required')),
        }),
        onSubmit: async (values, { resetForm }) => {
            window.backdropLoader(true);
            setLoad(true);
            if (enableRecaptcha) {
                await fetch('/captcha-validation', {
                    method: 'post',
                    body: JSON.stringify({
                        response: values.captcha,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then((data) => data.json())
                    .then((json) => {
                        if (json.success) {
                            submitForm(values, resetForm);
                        } else {
                            setMessage({
                                open: true,
                                variant: 'error',
                                text: t('contact:failedSubmit'),
                            });
                        }
                        setLoad(false);
                        window.backdropLoader(false);
                    })
                    .catch(() => {
                        window.backdropLoader(false);
                        setMessage({
                            open: true,
                            variant: 'error',
                            text: t('common:error:fetchError'),
                        });
                        setLoad(false);
                    });

                recaptchaRef.current.reset();
            } else {
                await submitForm(values, resetForm);
                setLoad(false);
                window.backdropLoader(false);
            }
        },
    });

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
    };

    const { error, loading, data } = gqlService.getCmsBlocks(
        { identifiers: [cmsContactIdentifiers] },
        { skip: !cmsContactIdentifiers },
    );

    if (!cmsContactIdentifiers) {
        return (
            <Layout pageConfig={pageConfig || Config} {...props}>
                <ErrorInfo variant="error" text={props.t('contact:nullCmsIdentifer')} />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout pageConfig={pageConfig || Config} {...props}>
                <ErrorInfo variant="error" text={debuging.originalError ? error.message.split(':')[1] : props.t('common:error:fetchError')} />
            </Layout>
        );
    }

    if (isCms) {
        return (
            <Content
                t={t}
                Content={Content}
                handleChangeCaptcha={handleChangeCaptcha}
                formik={formik}
                error={error}
                message={message}
                setMessage={setMessage}
                sitekey={sitekey}
                loading={loading}
                data={data}
                recaptchaRef={recaptchaRef}
                Skeleton={Skeleton}
                load={load}
                enableRecaptcha={enableRecaptcha}
            />
        );
    }
    return (
        <Layout pageConfig={pageConfig || Config} {...props}>
            <Content
                t={t}
                Content={Content}
                handleChangeCaptcha={handleChangeCaptcha}
                formik={formik}
                error={error}
                message={message}
                setMessage={setMessage}
                sitekey={sitekey}
                loading={loading}
                data={data}
                recaptchaRef={recaptchaRef}
                Skeleton={Skeleton}
                load={load}
                enableRecaptcha={enableRecaptcha}
            />
        </Layout>
    );
};

export default Contact;
