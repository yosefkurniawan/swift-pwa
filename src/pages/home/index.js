import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('home:pageTitle'),
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'home',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
