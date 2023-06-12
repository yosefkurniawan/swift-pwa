/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';
import { modules, keyLocalStorage } from '@config';
import graphRequest from '@graphql_request';
import { getHomePageConfig } from '@core_modules/home/service/graphql/schema';
import { storeConfigVar } from '@root/core/services/graphql/cache';

const Home = dynamic(() => import('@core_modules/home/pages/default/core'));
const Checkout = dynamic(() => import('@module_checkout/pages/default'));

const Page = (props) => {
    if (!modules.checkout.checkoutOnly) return <Home {...props} />;

    return <Checkout {...props} />;
};

Page.getInitialProps = async (ctx) => {
    let homePageConfig;

    if (!modules.checkout.checkoutOnly && ctx && ctx.req) {
        const homeConfig = await graphRequest(getHomePageConfig);
        homePageConfig = homeConfig.storeConfig;
    } else if (!modules.checkout.checkoutOnly && typeof window !== 'undefined') {
        homePageConfig = storeConfigVar();
        if (!homePageConfig) {
            const homeConfig = await graphRequest(getHomePageConfig);
            homePageConfig = homeConfig.storeConfig;
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
