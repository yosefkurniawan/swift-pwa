import Page from '@core_modules/order/pages/history/downloadable';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'order', 'customer'])),
        },
    };
};

export default Page;
