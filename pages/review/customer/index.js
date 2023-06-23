import Page from '@core_modules/productreview/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'productreview', 'customer', 'storecredit'])),
        },
    };
};

export default Page;
