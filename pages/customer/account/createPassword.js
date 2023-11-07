import Page from '@core_modules/customer/pages/newpassword';
import Router from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    if (ctx.query.token === '' || !ctx.query.token) {
        if (typeof window !== 'undefined') Router.push('/');
        else ctx.res.redirect('/');
    }
    return {
        props: {
            ...ctx.query,
            ...(await serverSideTranslations(ctx.locale, ['common', 'customer', 'validate'])),
        },
    };
}

export default Page;
