import { withTranslation } from '@i18n';
import Layout from '@components/Layouts';
import { useRouter } from 'next/router';
import Component from './components';

const Page = (props) => {
    const router = useRouter();
    const pageConfig = {
        title: '[Search Result]',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `Search Result : ${router.query.q}`,
        bottomNav: 'browse',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Component {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
