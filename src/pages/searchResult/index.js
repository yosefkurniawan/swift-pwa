import { withTranslation } from '@i18n';
import Layout from '@components/Layouts';
import { useRouter } from 'next/router';
import getQueryFromPath from '@helpers/generateQuery';
import Component from './components';

const Page = (props) => {
    const router = useRouter();
    const { query } = getQueryFromPath(router);
    const pageConfig = {
        title: `Search Result : ${query.q}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `Search Result : ${query.q}`,
        bottomNav: 'browse',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Component {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'search'],
});

export default withTranslation()(Page);
