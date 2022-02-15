import Layout from '@layout';
import { getHost } from '@helper_config';
import { setLocalStorage } from '@helper_localstorage';
import { keyLocalStorage } from '@config';
import Content from '@core_modules/home/pages/default/components';

const HomeCore = (props) => {
    const {
        pageConfig, storeConfig, homePageConfig, ...other
    } = props;

    const homeKey = keyLocalStorage.home;

    if (typeof window !== 'undefined' && homePageConfig) {
        setLocalStorage(homeKey, homePageConfig);
    }

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
        <Layout {...props} pageConfig={config}>
            <Content storeConfig={storeConfig} homePageConfig={homePageConfig} {...other} />
        </Layout>
    );
};

export default HomeCore;
