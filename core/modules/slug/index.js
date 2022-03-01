import { withApollo } from '@lib_apollo';
import { withTranslation } from '@i18n';
import { getCmsList, storeConfig as ConfigSchema } from '@services/graphql/schema/config';
import graphRequest from '@graphql_request';
import { storeConfigNameCookie } from '@config';
import Core from '@core_modules/slug/core';

const Page = (props) => (
    <Core
        {...props}
    />
);

/**
 * get slug from query
 * namespacesRequired empty because Catalog page using product and category so only on component
 */
Page.getInitialProps = async ({ query, req }) => {
    let cmsList = {};
    let storeConfig = {};
    if (typeof window === 'undefined' && !req.cookies[storeConfigNameCookie]) {
        cmsList = await graphRequest(getCmsList);
        storeConfig = await graphRequest(ConfigSchema);
        storeConfig = storeConfig.storeConfig;
    }

    const allcookie = req ? req.cookies : {};
    const obj = {
        storeConfig,
        slug: query.slug,
        namespacesRequired: ['common', 'product', 'category', 'validate', 'catalog'],
        token: req && req.session ? req.session.token : '',
        isLogin: allcookie.isLogin || 0,
        url_key: req
            ? `${req.protocol}://${req.get('host')}`
            : `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`,
    };

    obj.cms_page = cmsList.storeConfig && cmsList.storeConfig.cms_page ? cmsList.storeConfig.cms_page : '';
    return obj;
};

export default withApollo({ ssr: true })(withTranslation()(Page));
