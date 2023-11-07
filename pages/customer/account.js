import Page from '@core_modules/customer/pages/account';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'customer', 'rewardpoint', 'productreview'])),
        },
    };
}

export default Page;
