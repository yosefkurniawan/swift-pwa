import Page from '@core_modules/customer/pages/giftcard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'customer'])),
            withAuth: true,
        },
    };
}

export default Page;
