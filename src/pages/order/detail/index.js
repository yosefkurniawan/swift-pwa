import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import { useRouter } from 'next/router';
import Loader from './components/Loader';
import { getOrderDetail } from '../services/graphql';
import Content from './components';

const Page = (props) => {
    const { t } = props;
    const router = useRouter();
    const { id } = router.query;
    let detail = [];
    const [params] = React.useState({
        order_id: id,
    });
    const { loading, data, error } = getOrderDetail(params);
    if (loading || !data || error) return <Loader />;
    if (!loading && data && data.customerOrders) {
        // eslint-disable-next-line prefer-destructuring
        detail = data.customerOrders.items;
    }
    const currency = detail.length > 0 ? detail[0].detail[0].global_currency_code : 'USD';

    const pageConfig = {
        title: `${t('order:order')} ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} detail={detail} currency={currency} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
    withAuth: true,
});

export default withApollo({ ssr: true })(withTranslation()(Page));
