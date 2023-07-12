/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { modules } from '@config';
import graphRequest from '@graphql_request';
import { getHomePageConfig } from '@core_modules/home/service/graphql/schema';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getSSRCMSProps from '@core_modules/cms/pages/default/ssr';

const getSSRProps = async (ctx) => {
    const translation = await serverSideTranslations(
        ctx.locale,
        modules.checkout.checkoutOnly ? ['common', 'checkout', 'customer', 'validate'] : ['common', 'home'],
    );

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

    const identifier = homePageConfig?.pwa?.use_cms_page_identifier ?? '';
    const cms = await getSSRCMSProps(identifier);

    return {
        props: {
            homePageConfig,
            ...translation,
            ...cms.props,
        },
    };
};

export default getSSRProps;
