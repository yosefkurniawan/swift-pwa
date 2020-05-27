import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './components';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('example:testLayout:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'example'],
});

export default withTranslation()(Page);
