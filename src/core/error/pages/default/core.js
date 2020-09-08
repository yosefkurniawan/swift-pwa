import { useEffect, useState } from 'react';
import Layout from '@layout';
import { withTranslation } from '@i18n';
import { storeConfig as ConfigSchema } from '@services/graphql/schema/config';
import graphRequest from '../../../../api/graphql/request';

const Error = (props) => {
    const { statusCode, Content, pageConfig } = props;
    const statusCodes = {
        400: 'Bad Request',
        404: 'This page could not be found',
        405: 'Method Not Allowed',
        500: 'Internal Server Error',
    };

    const [storeConfig, setStoreConfig] = useState({});
    useEffect(() => {
        graphRequest(ConfigSchema)
            .then((Response) => Response)
            .then((Result) => { setStoreConfig(Result); });
    }, []);

    // eslint-disable-next-line react/destructuring-assignment
    const title = props.title || statusCodes[statusCode] || 'An unexpected error has occurred';

    const config = {
        title,
    };
    return (
        <Layout pageConfig={pageConfig || config} {...props} {...storeConfig}>
            <Content statusCode={statusCode} title={title} />
        </Layout>
    );
};

export default withTranslation()(Error);
