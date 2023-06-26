import Page from '@core_modules/blog/pages/category';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'blog'])),
        },
    };
}

export default Page;
