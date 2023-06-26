import Page from '@core_modules/login/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'otp', 'validate', 'login'])),
            withAuth: true,
            query: ctx.query,
        },
    };
}

export default Page;
