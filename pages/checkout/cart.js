import Page from '@core_modules/cart/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'cart', 'checkout'])),
            withAuth: true,
            query: ctx.query,
        },
    };
}

export default Page;
