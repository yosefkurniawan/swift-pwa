import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './components';

const Page = (props) => {
    const { t } = props;
    // console.log(props);
    const pageConfig = {
        title: t('cart:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('cart:pageTitle'),
        headerBackIcon: 'close', // available values: "close", "arrow"
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'cart'],
});

export default withTranslation()(Page);
