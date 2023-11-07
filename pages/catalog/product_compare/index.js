import Page from '@core_modules/productcompare/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'catalog', 'customer', 'validate', 'product'])),
        },
    };
}

export default Page;
