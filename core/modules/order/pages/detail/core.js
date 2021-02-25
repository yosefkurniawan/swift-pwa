import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { features } from '@config';
import { getOrderDetail } from '../../services/graphql';

const OrderDetail = (props) => {
    const {
        t, Content, Skeleton, ...other
    } = props;
    const { storeConfig } = other;
    const router = useRouter();
    const { id } = router.query;
    let detail = [];
    let pageConfig = {
        title: `${t('order:order')}  `,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
    };
    const [params] = React.useState({
        order_id: id,
    });
    const { loading, data, error } = getOrderDetail(params);
    if (loading || !data || error) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }
    if (!loading && data && data.customer.orders) {
        // eslint-disable-next-line prefer-destructuring
        detail = data.customer.orders.items;
    }
    const currency = detail.length > 0 ? detail[0].detail[0].global_currency_code : storeConfig.base_currency_code;

    pageConfig = {
        title: `${t('order:order')} # ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} detail={detail} currency={currency} features={features} />
        </Layout>
    );
};

OrderDetail.propTypes = {
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

OrderDetail.defaultProps = {
    Content: () => {},
    Skeleton: () => {},
};

export default OrderDetail;
