import Layout from '@layout';
import React, { useEffect } from 'react';
import { getHost } from '@helper_config';
import { useRouter } from 'next/router';
import { customerWishlist } from '@core_modules/customer/services/graphql/index';

const HomeCore = (props) => {
    const {
        Content, pageConfig, storeConfig, t, ...other
    } = props;
    const router = useRouter();
    const hashCode = router.query.code;
    const [getCustomerWishlist, { data }] = customerWishlist();
    useEffect(() => {
        if (hashCode) {
            getCustomerWishlist(
                {
                    variables: {
                        sharing_code: hashCode,
                    },
                    skip: hashCode === '' || !hashCode,
                },
            );
        }
    }, [hashCode]);
    const schemaOrg = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: `${getHost()}/`,
            logo: `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: `${getHost()}/`,
            potentialAction: [
                {
                    '@type': 'SearchAction',
                    target: `${getHost()}/catalogsearch/result?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            ],
        },
    ];

    const config = {
        title: storeConfig.default_title,
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'home',
        pageType: 'home',
        schemaOrg,
        ...pageConfig,
    };

    return (
        <Layout {...props} pageConfig={config} {...other}>
            <Content storeConfig={storeConfig} {...other} wishlistItem={data} t={t} />
        </Layout>
    );
};

export default HomeCore;
