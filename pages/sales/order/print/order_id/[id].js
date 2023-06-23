import Page from '@core_modules/order/pages/print';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'order', 'customer', 'trackingorder'])),
        },
    };
};

export default Page;
