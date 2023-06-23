import Page from '@core_modules/rewardpoint/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'rewardpoint', 'customer'])),
        },
    };
};

export default Page;
