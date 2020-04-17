import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './components';

const Page = ({ t }) => {
    const pageConfig = {
        title: t('example:testLayout:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content />
        </Layout>
    );
};

export default withTranslation()(Page);
