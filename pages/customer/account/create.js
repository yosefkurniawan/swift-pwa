import Page from '@core_modules/register/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'otp', 'validate', 'register'])),
            withAuth: true,
        },
    };
}

export default Page;
