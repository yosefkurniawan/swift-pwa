import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Core from './core';
import Content from './views';
import Skeleton from './views/skeleton';

const Default = (props) => {
    const { Layout, t, pageConfig } = props;
    const config = {
        title: t('brands:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('brands:title'),
        headerBackIcon: 'arrow', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'brands',
    };

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Core {...props} Content={Content} Skeleton={Skeleton} />
        </Layout>
    );
};

Default.getInitialProps = async () => ({
    namespacesRequired: ['brands'],
});

export default withApollo({ ssr: true })(withTranslation()(Default));
