import Page from '@core_modules/slug';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCmsList } from '@services/graphql/schema/config';
import graphRequest from '@graphql_request';
import { storeConfigNameCookie } from '@config';

export async function getServerSideProps(ctx) {
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
        // url_key: req
        //     ? `${req.protocol}://${req.get('host')}`
        //     : `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`,
        url_key: '',
    };

    obj.cms_page = cmsList.storeConfig && cmsList.storeConfig.cms_page ? cmsList.storeConfig.cms_page : '';

    return {
        props: {
            ...obj,
        },
    };
};

export default Page;
