import { useMutation } from '@apollo/client';
import Typography from '@common_typography';
import { subscribeNewsletter } from '@core_modules/customer/services/graphql/schema';
import { useFormik } from 'formik';
import parse, { domToReact } from 'html-react-parser';
import * as Yup from 'yup';
import useStyles from '@core_modules/cms/components/cms-renderer/widget-newsletter-popup/style';

const Newsletter = (props) => {
    const { storeConfig } = props;
    const [actSubscribe] = useMutation(subscribeNewsletter);
    const styles = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required('required'),
        }),
        onSubmit: (values) => {
            actSubscribe({
                variables: {
                    email: values.email,
                },
            })
                .then(async (res) => {
                    const data = res.data.subscribe.status;
                    window.toastMessage({
                        open: true,
                        variant: data.response !== 'Failed' ? 'success' : 'error',
                        text: data.message,
                    });
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || '',
                    });
                });
        },
    });

    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <div className={styles.fieldNewsletterControl}>
                <label htmlFor="newsletter">
                    <input
                        className={styles.fieldNewsletter}
                        name="email"
                        type="email"
                        id="newsletter"
                        placeholder="Enter your email address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                </label>
                <button type="submit" className={styles.subscribeBtn}>
                    Subscribe
                </button>
            </div>
            {storeConfig.weltpixel_newsletter_general_terms_conditions_consent === '1' && (
                <div>
                    <input name="newsletter-tnc" type="checkbox" id="newsletter-tnc" />
                    <label htmlFor="newsletter-tnc">{parse(storeConfig.weltpixel_newsletter_general_terms_conditions_text)}</label>
                </div>
            )}
        </form>
    );
};

const WidgetNewsletterPopup = (props) => {
    const { storeConfig, data } = props;
    const content = data.cmsBlocks.items[0].content || '';

    /* eslint-disable */
    const options = {
        replace: ({ name, attribs, children }) => {
            if (attribs) {
                if (name === 'pwa' && attribs.type === 'pwa-newsletter') {
                    return <Newsletter storeConfig={storeConfig} />;
                }

                if (attribs.class === 'title') {
                    return (
                        <Typography variant="title" type="semiBold">
                            {domToReact(children, options)}
                        </Typography>
                    );
                }

                if (attribs.class === 'col-md-7 newsletter-left') {
                    return <div className="col-xs-12 col-sm-7 col-md-7 newsletter-left">{domToReact(children, options)}</div>;
                }

                if (attribs.class === 'col-md-5 newsletter-right') {
                    return <div className="col-sm-5 col-md-5 newsletter-right">{domToReact(children, options)}</div>;
                }
            }
        },
    };

    return parse(content, options);
};

export default WidgetNewsletterPopup;
