import Page from '@core_modules/rma/pages/detail';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'rma', 'customer'])),
        },
    };
};

export default Page;
