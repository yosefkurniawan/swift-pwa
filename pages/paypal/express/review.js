import Page from '@core_modules/paypal/pages/review';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { modules } from '@config';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@root/core/helpers/env';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    const { checkoutOnly } = modules.checkout;
    const data = typeof window === 'undefined' ? ctx.req?.cookies : Cookies.getJSON();
    const cartId = data.nci || null;

    let urlRedirect = '/checkout/cart';
    if (checkoutOnly) {
        urlRedirect = getStoreHost(getAppEnv());
    }

    if (!cartId) {
        if (ctx.res) {
            ctx.res.statusCode = 302;
            ctx.res.setHeader('Location', urlRedirect);
            return {
                props: {
                    ...(await serverSideTranslations(ctx.locale, ['common', 'checkout'])),
                },
            };
        }
        if (typeof window !== 'undefined') Router.push(urlRedirect);
    }

    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'checkout'])),
            cartId,
            isLogin: data.isLogin || 0,
        },
    };
};

export default Page;
