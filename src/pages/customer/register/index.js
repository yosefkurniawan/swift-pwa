import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('customer:register:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:register:title'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
