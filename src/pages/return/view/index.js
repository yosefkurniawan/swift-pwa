import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { useRouter } from 'next/router';
import Component from './components';

const Page = (props) => {
    const { t } = props;
    const router = useRouter();
    const { id } = router.query;
    const pageConfig = {
        title: `${t('return:view:label')} #${id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('return:view:label')} #${id}`,
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Component {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'return'],
    withAuth: true,
});

export default withTranslation()(Page);
