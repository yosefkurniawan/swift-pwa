import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { useRouter } from 'next/router';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: `${t('order:order')} ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} ${router.query.id}`,
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
});

export default withTranslation()(Page);
