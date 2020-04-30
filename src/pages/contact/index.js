import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './components';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('contact:pageTitle'),
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home'] });

export default withTranslation()(Page);
