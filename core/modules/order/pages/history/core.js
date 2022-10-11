import { debuging } from '@config';
import { getOrder, reOrder as mutationReorder } from '@core_modules/order/services/graphql';
import { getHost } from '@helpers/config';
import { setCartId } from '@helper_cartid';
import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const HistoryOrder = (props) => {
    const {
        t, Content, Skeleton, ErrorView, size, storeConfig,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('order:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('order:title'),
        bottomNav: false,
    };
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(size || 10);
    const [loadMore, setLoadMore] = React.useState(false);

    const [actionReorder] = mutationReorder();

    const handleChangePage = (event, newPage) => {
        if (newPage > page) {
            setLoadMore(true);
        }
        setPage(newPage);
    };

    const handleChangePageSize = (event) => {
        setLoadMore(true);
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const { loading, data, error } = getOrder({
        pageSize,
        currentPage: page + 1,
    });

    React.useEffect(() => {
        if (!loading && data && data.customer.orders && data.customer.orders.items.length) {
            setLoadMore(false);
        }
    }, [loading, data]);

    if (loading || (!data && !loadMore)) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <ErrorView type="error" message={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')} />
            </Layout>
        );
    }

    const reOrder = (order_id) => {
        if (order_id && order_id !== '') {
            window.backdropLoader(true);
            actionReorder({
                variables: {
                    order_id,
                },
            })
                .then(async (res) => {
                    if (res.data && res.data.reorder && res.data.reorder.cart_id) {
                        await setCartId(res.data.reorder.cart_id);
                        setTimeout(() => {
                            router.push('/checkout/cart');
                        }, 1000);
                    }
                    window.backdropLoader(false);
                })
                .catch(() => {
                    window.backdropLoader(false);
                });
        }
    };

    let detail = [];
    let customerEmail;
    if (!loading && data && data.customer.orders) {
        // eslint-disable-next-line prefer-destructuring
        detail = data.customer.orders.items;
    }

    if (detail.length > 0) {
        // eslint-disable-next-line array-callback-return
        detail.map((item) => {
            if (item.detail.length > 0) {
                customerEmail = item.detail[0].customer_email;
            }
        });
    }

    const returnUrl = (order_number) => {
        if (storeConfig && storeConfig.OmsRma.enable_oms_rma) {
            const omsRmaLink = storeConfig.OmsRma.oms_rma_link;
            const omsChannelCode = storeConfig.oms_channel_code;
            const backUrl = window.location.href;
            // eslint-disable-next-line max-len
            const encodedQuerystring = `email=${encodeURIComponent(customerEmail)}&order_number=${encodeURIComponent(
                order_number,
            )}&channel_code=${encodeURIComponent(omsChannelCode)}&from=${encodeURIComponent(backUrl)}`;
            const omsUrl = `${omsRmaLink}?${encodedQuerystring}`;
            window.location.replace(omsUrl);
        } else {
            window.location.replace(`${getHost()}/rma/customer/new/order_id/${order_number}`);
        }
    };

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content
                {...props}
                loadMore={loadMore}
                data={data.customer.orders}
                page={page}
                pageSize={pageSize}
                loading={loading}
                handleChangePage={handleChangePage}
                handleChangePageSize={handleChangePageSize}
                reOrder={reOrder}
                returnUrl={returnUrl}
            />
        </Layout>
    );
};

HistoryOrder.propTypes = {
    ErrorView: PropTypes.func,
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

HistoryOrder.defaultProps = {
    ErrorView: () => null,
    Content: () => null,
    Skeleton: () => null,
};

export default HistoryOrder;
