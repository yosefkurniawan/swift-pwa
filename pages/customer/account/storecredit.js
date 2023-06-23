import Page from '@core_modules/storecredit/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'storecredit', 'customer'])),
        },
    };
};

export default Page;
