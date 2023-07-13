import { getCmsBlocks, categories, vesMenu } from '@core_modules/theme/services/graphql/schema';
import { getStoreName, getCurrencySchema } from '@core_modules/setting/services/graphql/schema';

// import graphqlSSRNoCache from '@graphql_ssr';
import { storeConfig as ConfigSchema } from '@services/graphql/schema/config';
import graphRequest from '@graphql_request';
// import { gql } from '@apollo/client';

const getSSRProps = async ({ apolloClient }) => {
    // get cms page
    let storeConfig = await graphRequest(ConfigSchema);
    // console.log('layout', storeConfig);
    storeConfig = storeConfig?.storeConfig ?? null;

    if (storeConfig) {
        // header
        if (storeConfig.pwa.ves_menu_enable) {
            const ves = await apolloClient.query({
                query: vesMenu,
                variables: {
                    alias: storeConfig.pwa.ves_menu_alias,
                },
            });
            console.log('header ves', ves?.data?.vesMenu?.items);
        } else {
            const cat = await apolloClient.query({
                query: categories,
            });

            console.log('header category', cat);
        }
        // header setting currency
        await apolloClient.query({
            query: getCurrencySchema,
        });
        // header setting store
        await apolloClient.query({
            query: getStoreName,
        });

        // news letter
        await apolloClient.query({
            query: getCmsBlocks,
            variables: { identifiers: 'weltpixel_newsletter_v5' },
        });

        // footer
        await apolloClient.query({
            query: getCmsBlocks,
            variables: { identifiers: [storeConfig?.pwa?.footer_version] },
        });
    }
};

export default getSSRProps;
