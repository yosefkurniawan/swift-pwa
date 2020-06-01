import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { useRouter } from 'next/router';
import Loader from './Loader';
import { getOrder } from '../services/graphql';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const router = useRouter();
    const { id } = router.query;
    let detail = [];
    const [params] = React.useState({
        pageSize: 999,
        currentPage: 1,
    });
    const { loading, data, error } = getOrder(params);
    if (loading || !data || error) return <Loader />;
    if (!loading && data) {
        detail = data.customerOrders.items.filter((item) => item.id === parseInt(id, 0));
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
});

export default withTranslation()(Page);
