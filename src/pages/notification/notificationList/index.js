import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('notification:notificationList:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('notification:notificationList:pageTitle'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'notification'],
});

export default withTranslation()(Page);
