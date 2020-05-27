import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Link from 'next/link';
import Button from '@components/Button';
import useStyles from './style';

const Error = (props) => {
    const styles = useStyles();
    const { statusCode, t } = props;

    const statusCodes = {
        400: t('error:400:title'),
        404: t('error:404:title'),
        405: t('error:405:title'),
        500: t('error:500:title'),
    };

    // eslint-disable-next-line react/destructuring-assignment
    const title = props.title
        || statusCodes[statusCode]
        || 'An unexpected error has occurred';

    const pageConfig = {
        title,
        className: styles.body,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <div className={styles.error}>
                <div className={styles.wrapper}>
                    {statusCode ? (
                        <h1 className={styles.h1}>{statusCode}</h1>
                    ) : null}
                    <div className={styles.desc}>
                        <h2 className={styles.h2}>{title}</h2>
                    </div>
                </div>
                {statusCode === 404 ? (
                    <div className={styles.actions}>
                        <Link href="/">
                            <Button className={styles.toolbarButton}>
                                {t('error:actions:back')}
                            </Button>
                        </Link>
                    </div>
                ) : null}
            </div>
        </Layout>
    );
};

Error.getInitialProps = ({ res, err }) => {
    const namespacesRequired = ['error'];
    // eslint-disable-next-line no-nested-ternary
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode, namespacesRequired };
};

export default withTranslation()(Error);
