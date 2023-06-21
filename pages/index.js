/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { modules } from '@config';
import graphRequest from '@graphql_request';
import { getHomePageConfig } from '@core_modules/home/service/graphql/schema';
import { storeConfigVar } from '@root/core/services/graphql/cache';

import Page from '@core_modules/home/pages/default';

export async function getServerSideProps(ctx) {
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
        props: {
            ...(await serverSideTranslations(ctx.locale, modules.checkout.checkoutOnly
                ? ['common', 'checkout', 'customer', 'validate']
                : ['common', 'home'])),
            homePageConfig,
        },
    };
};

export default Page;
