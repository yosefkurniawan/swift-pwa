import Page from '@core_modules/notification/pages/list';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'notification', 'customer'])),
            withAuth: true,
        },
    };
}

export default Page;
