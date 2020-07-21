import Button from '@Button';
import Typography from '@Typography';
import classNames from 'classnames';
import Alert from '@material-ui/lab/Alert';
import { debuging } from '@config';
import useStyles from './style';
import Item from './item';
import { getOrder } from '../../services/graphql';
import * as Schema from '../../services/graphql/schema';
import Loader from './Loader';

const OrderPage = ({ t }) => {
    const styles = useStyles();
    const [page, setPage] = React.useState(1);
    const [pageSize] = React.useState(10);
    const [loadMore, setLoadMore] = React.useState(false);
    const {
        loading, data, error, fetchMore,
    } = getOrder({
        pageSize,
        currentPage: 1,
    });
    if (loading || !data) return <Loader />;
    if (error) {
        return (
            <div className={classNames(styles.container, styles.rowCenter)}>
                <Alert className="m-15" severity="error">
                    {debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
                </Alert>
            </div>
        );
    }
    if (data && data.customerOrders.items && data.customerOrders.items.length <= 0) {
        return (
            <Alert className="m-15" severity="warning">
                {t('order:notFound')}
            </Alert>
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
        <div className={classNames(styles.container, styles.rowCenter)}>
            {data && data.customerOrders.items.length > 0 && data.customerOrders.items.map((item, index) => <Item t={t} key={index} {...item} />)}
            {data && data.customerOrders.total_count > data.customerOrders.items.length
                && data.customerOrders.total_pages > page && (
                <Button variant="text" onClick={handleLoadMore} disabled={loading || loadMore} fullWidth>
                    <Typography variant="span" type="regular" letter="capitalize">
                        {loadMore || loading ? 'Loading ...' : t('common:button:loadMore')}
                    </Typography>
                </Button>
            )}
        </div>
    );
};

export default OrderPage;
