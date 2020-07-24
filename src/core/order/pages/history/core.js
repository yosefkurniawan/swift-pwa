import Layout from '@layout';
import { debuging } from '@config';
import PropTypes from 'prop-types';
import { getOrder } from '../../services/graphql';
import * as Schema from '../../services/graphql/schema';

const HistoryOrder = (props) => {
    const {
        t, Content, Skeleton, ErrorView, size,
    } = props;
    const pageConfig = {
        title: t('order:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('order:title'),
        bottomNav: false,
    };
    const [page, setPage] = React.useState(1);
    const [pageSize] = React.useState(size || 10);
    const [loadMore, setLoadMore] = React.useState(false);
    const {
        loading, data, error, fetchMore,
    } = getOrder({
        pageSize,
        currentPage: 1,
    });

    if (loading || !data) return <Layout pageConfig={pageConfig} {...props}><Skeleton /></Layout>;

    if (error) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <ErrorView
                    type="error"
                    message={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
                />
            </Layout>
        );
    }
    if (data && data.customerOrders.items && data.customerOrders.items.length <= 0) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <ErrorView
                    type="error"
                    message={t('order:notFound')}
                />
            </Layout>
        );
    }

    const handleLoadMore = () => {
        setPage(page + 1);
        setLoadMore(true);
        fetchMore({
            query: Schema.getOrder,
            context: {
                request: 'internal',
            },
            skip: typeof window === 'undefined',
            fetchPolicy: 'cache-and-network',
            variables: {
                currentPage: page + 1,
                pageSize,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                setLoadMore(false);
                const prevItems = previousResult.customerOrders;
                const newItems = fetchMoreResult.customerOrders;
                return {
                    customerOrders: {
                        current_page: prevItems.current_page,
                        page_size: prevItems.page_size,
                        total_count: prevItems.total_count,
                        total_pages: prevItems.total_pages,
                        // eslint-disable-next-line no-underscore-dangle
                        __typename: prevItems.__typename,
                        items: [...prevItems.items, ...newItems.items],
                    },
                };
            },
        });
    };

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content
                {...props}
                loadMore={loadMore}
                handleLoadMore={handleLoadMore}
                data={data.customerOrders}
                page={page}
                pageSize={pageSize}
                loading={loading}
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
