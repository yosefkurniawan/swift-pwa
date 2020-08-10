import Layout from '@layout';
import { withTranslation } from '@i18n';

const Error = (props) => {
    const { statusCode, Content, pageConfig } = props;

    const statusCodes = {
        400: 'Bad Request',
        404: 'This page could not be found',
        405: 'Method Not Allowed',
        500: 'Internal Server Error',
    };

    // eslint-disable-next-line react/destructuring-assignment
    const title = props.title || statusCodes[statusCode] || 'An unexpected error has occurred';

    const config = {
        title,
    };
    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content statusCode={statusCode} title={title} />
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
