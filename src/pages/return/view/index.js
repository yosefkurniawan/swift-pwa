import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { useRouter } from 'next/router';
import { getUpdateFormRma } from '../services/graphql';
import Loader from './components/Loader';
import Component from './components';

const Page = (props) => {
    const { t, customerData } = props;
    const router = useRouter();
    const { id } = router.query;
    let objectData = {};
    const paramsFormRma = {
        email: customerData.email,
        increment_id: id,
    };
    const {
        loading, data, error, refetch,
    } = getUpdateFormRma(paramsFormRma);
    if (loading || !data || error) return <Loader />;
    if (!loading && data && data.getUpdateFormDataAwRma) {
        // eslint-disable-next-line prefer-destructuring
        objectData = data.getUpdateFormDataAwRma;
    }
    const pageConfig = {
        title: `${t('return:view:label')} #${id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('return:view:label')} #${id}`,
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Component refetch={refetch} {...props} data={objectData} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'return'],
    withAuth: true,
});

export default withTranslation()(Page);
