/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import graphRequest from '@graphql_request';
import graphRequestClear from '@graphql_ssr';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCmsList } from '@services/graphql/schema/config';
import { storeConfigNameCookie } from '@config';
import { getResolver } from '@core_modules/slug/services/graphql/schema';
import getCmsSSRProps from '@core_modules/cms/pages/default/ssr';
import createApolloClient from '@lib/apollo/apolloClient';
import getLayoutSSRProps from '@core_modules/theme/layout/ssr';

const getSSRProps = async (ctx) => {
    const apolloClient = createApolloClient({}, ctx);
    // layout
    await getLayoutSSRProps({ apolloClient });

    let cmsList = {};
    if (typeof window === 'undefined' && !ctx.req?.cookies[storeConfigNameCookie]) {
        cmsList = await graphRequest(getCmsList);
    }
    const allcookie = ctx.req ? ctx.req.cookies : {};
    const obj = {
        slug: ctx?.query?.slug,
        ...(await serverSideTranslations(ctx.locale, ['common', 'product', 'category', 'validate', 'catalog'])),
        token: ctx.query && ctx.query.session ? ctx.query.session.token : '',
        isLogin: allcookie.isLogin || 0,
        url_key: '',
    };

    obj.cms_page = cmsList.storeConfig && cmsList.storeConfig.cms_page ? cmsList.storeConfig.cms_page : '';

    let url = obj.slug.join('/');
    // suffix based on storeConfig
    const suffix = cmsList?.category_url_suffix || '.html';
    const cmsPages = obj.cms_page.split(',');
    // for cms pages, no need to add suffix
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : suffix;

    let urlResolver = await graphRequestClear(getResolver(url));
    urlResolver = urlResolver?.urlResolver ?? null;
    const urlType = urlResolver?.type ?? '';

    if (urlType === 'CMS_PAGE') {
        await getCmsSSRProps({ apolloClient, identifier: url });
    } else if (urlType === 'PRODUCT') {
        // belum buat ssr product
    } else if (urlType === 'CATEGORY') {
        // bebelum buat ssr product lum
    }

    const apolloState = apolloClient.cache.extract();

    return {
        props: {
            ...obj,
            urlResolver,
            urlType,
            apolloState,
        },
    };
};

export default getSSRProps;
