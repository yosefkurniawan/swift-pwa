import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './components';
import CustomHeader from './components/header';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('example:testLayout:title'),
        bottomNav: false,
        header: 'absolute', // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig} CustomHeader={<CustomHeader />}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async ({ req }) => ({
    namespacesRequired: ['common', 'product'],
    url: req
        ? `${req.protocol}://${req.get('host')}`
        : `${window.location.protocol
        }//${
            window.location.hostname
        }${window.location.port ? `:${window.location.port}` : ''}`,
});

export default withTranslation()(Page);
