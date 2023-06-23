import Page from '@core_modules/customer/pages/sharedwishlist';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'catalog', 'customer', 'validate', 'product'])),
        },
    };
};

export default Page;
