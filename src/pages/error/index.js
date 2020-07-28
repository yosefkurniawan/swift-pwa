import Layout from '@layout';
import { withTranslation } from '@i18n';
import Link from 'next/link';
import Button from '@common_button';
import useStyles from './style';

const Error = (props) => {
    const styles = useStyles();
    const { statusCode } = props;

    const statusCodes = {
        400: 'Bad Request',
        404: 'This page could not be found',
        405: 'Method Not Allowed',
        500: 'Internal Server Error',
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
                            <Button className={styles.toolbarButton}>Back</Button>
                        </Link>
                    </div>
                ) : null}
            </div>
        </Layout>
    );
};

// Error.getInitialProps = ({ res, err }) => {
//     const namespacesRequired = ['error'];
//     // eslint-disable-next-line no-nested-ternary
//     const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//     return { statusCode, namespacesRequired };
// };

export default withTranslation()(Error);
