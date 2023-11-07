import Page from '@core_modules/seller/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'seller', 'catalog', 'product'])),
        },
    };
}

export default Page;
