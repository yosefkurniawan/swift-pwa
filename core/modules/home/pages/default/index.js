/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
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
    return {
        namespacesRequired: modules.checkout.checkoutOnly
            ? ['common', 'checkout', 'customer', 'validate']
            : ['common', 'home'],
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));
