import CircularProgress from '@material-ui/core/CircularProgress';

const NewsletterView = (props) => {
    const { formik, loading, t } = props;
    return (
        <div>
            <div className="newsletter-container">
                <div className="wrapper">
                    <div className="title"><h3>{t('common:newsletter:title')}</h3></div>
                    <div className="block-newsletter">
                        <div className="content">
                            <form
                                className="form subscribe"
                                noValidate
                                id="newsletter-validate-detail"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="field-newsletter">
                                    <div className="control">
                                        <label htmlFor="newsletter">
                                            <input
                                                name="email"
                                                type="email"
                                                id="newsletter"
                                                placeholder={t('common:newsletter:placeholder')}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                error={!!formik.errors.email}
                                                errorMessage={formik.errors.email || null}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="actions">
                                    <button
                                        className="action subscribe primary"
                                        title="Subscribe"
                                        type="submit"
                                        disabled={loading}
                                        aria-label="Subscribe"
                                        onClick={() => (formik.values.email === ''
                                            ? window.toastMessage(
                                                {
                                                    open: true,
                                                    variant: 'error',
                                                    text: t('common:newsletter:emptyValue'),
                                                },
                                            )
                                            : '')}
                                    >
                                        {loading ? <CircularProgress color="inherit" size={14} />
                                            : <span>{t('common:newsletter:buttonLabel')}</span> }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <style jsx>
                {`
                    .newsletter-container {
                        position: relative;
                        margin-bottom: -40px;
                        height: 170px;
                        background: #f4f4f4;
                    }
                    .wrapper {
                        position: absolute;
                        text-align: center;
                        width: 100%;
                        top: 45%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                    }
                    .title {
                        font-size: 16px;
                    }
                    .title h3 {
                        font-weight: 600;
                        letter-spacing: .72px;
                    }
                    .block-newsletter {
                        margin: 0 auto;
                        max-width: 44%;
                        width: max-content;
                    }
                    .form.subscribe {
                        display: table;
                        width: 100%;
                        margin-top: 20px;
                    }
                    .actions {
                        display: table-cell;
                        vertical-align: top;
                    }
                    .field-newsletter input {
                        background: #fff;
                        background-clip: padding-box;
                        border: 1px solid silver;
                        border-radius: 0;
                        font-family: 'Inter','Helvetica Neue',Helvetica,Arial,sans-serif;
                        font-size: 13px;
                        height: 40px;
                        line-height: 1.42857143;
                        padding: 14px 13px;
                        vertical-align: baseline;
                        width: 100%;
                        box-sizing: border-box;
                        padding: 0 20px 0;
                        min-width: 300px;
                    }
                    .action.subscribe {
                        background: #000;
                        border: #000;
                        font-weight: bold;
                        width: 120px;
                        text-transform: uppercase;
                        padding: 11px 15px;
                        height: 40px;
                        margin-left: 20px;
                        white-space: nowrap;
                        color: #fff;
                        border-radius: 20px;
                        cursor: pointer;
                    }
                    @media screen and (max-width: 767px) {
                        .newsletter-container {
                            background: #fff;
                        }
                        .title {
                            display: none;
                        }
                        .block-newsletter {
                            max-width: 100%;
                            width: 90%;
                        }
                        .actions {
                            display: block;
                            margin-top: 20px;
                        }
                        .action.subscribe {
                            width: 100%;
                            margin-left: 0;
                        }
                     }
                `}
            </style>
        </div>
    );
};

export default NewsletterView;
