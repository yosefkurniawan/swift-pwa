import Page from '@core_modules/searchresult/pages/advanced';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'catalog', 'product'])),
            token: ctx.req && ctx.req.session ? ctx.req.session.token : '',
        },
    };
}

export default Page;
