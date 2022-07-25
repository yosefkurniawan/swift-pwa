import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';
import { modules, keyLocalStorage } from '@config';
import graphRequest from '@graphql_request';
import { getHomePageConfig } from '@core_modules/home/service/graphql/schema';
import { getLocalStorage } from '@helper_localstorage';

const Page = dynamic(() => ((!modules.checkout.checkoutOnly)
    ? import('@core_modules/home/pages/default/core')
    : import('@module_checkout/pages/default')));

Page.getInitialProps = async (ctx) => {
    let homePageConfig;

    if (!modules.checkout.checkoutOnly && ctx && ctx.req) {
        homePageConfig = await graphRequest(getHomePageConfig);
    } else if (!modules.checkout.checkoutOnly && typeof window !== 'undefined') {
        homePageConfig = getLocalStorage(keyLocalStorage.home);
        if (!homePageConfig) {
            homePageConfig = await graphRequest(getHomePageConfig);
        }
    }

    return {
        namespacesRequired: modules.checkout.checkoutOnly
            ? ['common', 'checkout', 'customer', 'validate']
            : ['common', 'home'],
        homePageConfig,
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));
