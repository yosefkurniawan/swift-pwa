import { withApollo } from '@lib_apollo';
import { withTranslation } from '@i18n';
import { getCmsList } from '@services/graphql/schema/config';
import { slugPageSchema } from '@core_modules/slug/services/graphql/schema';
import graphRequest from '@graphql_request';
import { storeConfigNameCookie, keyLocalStorage } from '@config';
import Core from '@core_modules/slug/core';
import { getLocalStorage } from '@helper_localstorage';

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
    if (typeof window === 'undefined' && !req.cookies[storeConfigNameCookie]) {
        cmsList = await graphRequest(getCmsList);
    }

    let slugPageConfig;
    if (typeof window === 'undefined') {
        slugPageConfig = await graphRequest(slugPageSchema);
    } else {
        slugPageConfig = getLocalStorage(keyLocalStorage.slugConfig);
        if (!slugPageConfig) {
            slugPageConfig = await graphRequest(slugPageSchema);
        }
    }

    const allcookie = req ? req.cookies : {};
    const obj = {
        slug: query.slug,
        namespacesRequired: ['common', 'product', 'category', 'validate', 'catalog'],
        token: req && req.session ? req.session.token : '',
        isLogin: allcookie.isLogin || 0,
        url_key: req
            ? `${req.protocol}://${req.get('host')}`
            : `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`,
    };

    obj.slugPageConfig = slugPageConfig;

    obj.cms_page = cmsList.storeConfig && cmsList.storeConfig.cms_page ? cmsList.storeConfig.cms_page : '';
    return obj;
};

export default withApollo({ ssr: true })(withTranslation()(Page));
