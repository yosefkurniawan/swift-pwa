import Page from '@core_modules/slug';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCmsList } from '@services/graphql/schema/config';
import graphRequest from '@graphql_request';
import { storeConfigNameCookie } from '@config';

export async function getServerSideProps(ctx, req) {
    // const {
    //     req,
    // } = ctx;

    let cmsList = {};
    if (typeof window === 'undefined' && !req?.cookies[storeConfigNameCookie]) {
        cmsList = await graphRequest(getCmsList);
    }
    const allcookie = req ? req.cookies : {};
    const obj = {
        slug: req.query.slug,
        ...(await serverSideTranslations(ctx.locale, ['common', 'product', 'category', 'validate', 'catalog'])),
        token: req && req.session ? req.session.token : '',
        isLogin: allcookie.isLogin || 0,
        url_key: req
            ? `${req.protocol}://${req.get('host')}`
            : `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`,
    };

    obj.cms_page = cmsList.storeConfig && cmsList.storeConfig.cms_page ? cmsList.storeConfig.cms_page : '';

    return {
        props: {
            ...obj,
        },
    };
};

export default Page;
