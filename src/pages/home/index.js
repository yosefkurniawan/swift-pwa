import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { getHost } from '@helpers/config';
import Content from './component';

const Page = (props) => {
    const { t } = props;

    const schemaOrg = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: `${getHost()}/`,
            logo: 'https://swiftpwa-be.testingnow.me/media/logo/stores/1/swift-logo.png',
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: `${getHost()}/`,
            potentialAction: [{
                '@type': 'SearchAction',
                target: `${getHost()}/catalogsearch/result?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
            }],
        },
    ];
    const pageConfig = {
        title: t('home:pageTitle'),
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'home',
        pageType: 'home',
        schemaOrg,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home'] });

export default withTranslation()(Page);
