import Page from '@core_modules/emailconfirmation/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    if (!ctx.query.id || !ctx.query.token) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', '/');
        return {
            props: {
                ...(await serverSideTranslations(ctx.locale, ['common', 'customer', 'validate', 'register'])),
                withAuth: true,
            },
        };
    }
    return {
        props: {
            query: ctx.req.query,
            ...(await serverSideTranslations(ctx.locale, ['common', 'customer', 'validate', 'register'])),
        },
    };
}

export default Page;
