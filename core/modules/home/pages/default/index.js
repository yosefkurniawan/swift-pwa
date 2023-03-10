/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';
import { modules } from '@config';
import requestInternal from '@rest_request';

const Page = dynamic(() => ((!modules.checkout.checkoutOnly)
    ? import('@core_modules/home/pages/default/core')
    : import('@module_checkout/pages/default')));

Page.getInitialProps = async (ctx) => {
    let homePageConfig;

    if (typeof window === 'undefined') {
        homePageConfig = await requestInternal('getConfig?field=pwa');
    }
    return {
        namespacesRequired: modules.checkout.checkoutOnly
            ? ['common', 'checkout', 'customer', 'validate']
            : ['common', 'home'],
        homePageConfig,
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));
