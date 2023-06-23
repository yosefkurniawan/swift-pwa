import Page from '@core_modules/thanks/pages/default';
import { getCheckoutDataFromRequest } from '@helper_cookies';
import Router from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    const checkoutData = getCheckoutDataFromRequest(ctx);
    if (!checkoutData) {
        if (ctx.res) {
            ctx.res.statusCode = 302;
            ctx.res.setHeader('Location', '/');
            return {
                props: {
                    ...(await serverSideTranslations(ctx.locale, ['common', 'thanks', 'home', 'login'])),
                },
            };
        }
        Router.push('/');
    }
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'thanks', 'login'])),
            query: ctx.query,
            checkoutData: typeof checkoutData === 'string' ? JSON.parse(checkoutData) : checkoutData,
        },
    };
};

export default Page;
