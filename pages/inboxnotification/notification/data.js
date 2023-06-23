import Page from '@core_modules/notification/pages/detail';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'notification', 'customer'])),
        },
    };
};

export default Page;
