import { getCmsBlocks, categories, vesMenu } from '@core_modules/theme/services/graphql/schema';
import { getStoreName, getCurrencySchema } from '@core_modules/setting/services/graphql/schema';
import graphRequestClear from '@graphql_ssr';
import { gql } from '@apollo/client';

const layoutStoreConfigSchema = gql`
    {
        storeConfig {
            pwa {
                ves_menu_alias
                footer_version
            }
        }
    }
`;

const getSSRProps = async ({ apolloClient }) => {
    // get cms page
    let storeConfig = await graphRequestClear(layoutStoreConfigSchema);
    storeConfig = storeConfig?.storeConfig ?? null;

    if (storeConfig) {
        // header
        if (storeConfig.pwa.ves_menu_enable) {
            await apolloClient.query({
                query: vesMenu,
                variables: {
                    alias: storeConfig.pwa.ves_menu_alias,
                },
            });
        } else {
            await apolloClient.query({
                query: categories,
            });
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
