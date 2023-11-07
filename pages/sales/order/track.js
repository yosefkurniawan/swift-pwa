import Page from '@core_modules/trackingorder/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'trackingorder', 'validate', 'contact'])),
        },
    };
}

export default Page;
