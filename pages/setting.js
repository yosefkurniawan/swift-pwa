import Page from '@core_modules/setting/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common'])),
            withAuth: true,
        },
    };
}

export default Page;
