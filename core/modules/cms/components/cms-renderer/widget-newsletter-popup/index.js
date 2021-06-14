import { useMutation } from '@apollo/client';
import Typography from '@common_typography';
import { subscribeNewsletter } from '@core_modules/customer/services/graphql/schema';
import { useFormik } from 'formik';
import parse, { domToReact } from 'html-react-parser';
import * as Yup from 'yup';

const Newsletter = (props) => {
    const { storeConfig } = props;

    const [actSubscribe] = useMutation(subscribeNewsletter);

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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit}>
                <div className="field-newsletter">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <label htmlFor="newsletter">
                            <input
                                name="email"
                                type="email"
                                id="newsletter"
                                placeholder="Enter your email address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </label>
                        <button type="submit" className="subscribe">
                            Subscribe
                        </button>
                    </div>
                    {storeConfig.weltpixel_newsletter_general_terms_conditions_consent === '1' && (
                        <div>
                            <input name="newsletter-tnc" type="checkbox" id="newsletter-tnc" />
                            <label htmlFor="newsletter-tnc">{parse(storeConfig.weltpixel_newsletter_general_terms_conditions_text)}</label>
                        </div>
                    )}
                </div>
            </form>

            <style jsx>
                {`
                    .field-newsletter input[type='email'] {
                        background: #fff;
                        background-clip: padding-box;
                        border: 1px solid silver;
                        border-radius: 0;
                        font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size: 13px;
                        height: 40px;
                        line-height: 1.42857143;
                        padding: 14px 13px;
                        vertical-align: baseline;
                        width: 100%;
                        box-sizing: border-box;
                        padding: 0 20px 0;
                        min-width: 300px;
                        max-width: 400px;
                    }
                    .subscribe {
                        background: #000;
                        border: #000;
                        font-weight: bold;
                        width: 120px;
                        text-transform: uppercase;
                        height: 40px;
                        margin-left: 5px;
                        white-space: nowrap;
                        color: #fff;
                        cursor: pointer;
                    }
                    @media screen and (max-width: 767px) {
                        .subscribe {
                            width: 100%;
                            margin-left: 0;
                        }
                    }
                `}
            </style>
        </div>
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
                        <Typography variant="h1" type="semiBold">
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
