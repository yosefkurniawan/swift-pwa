import Button from '@components/Button';
import Typography from '@components/Typography';
import useStyles from './style';
import Item from './item';
import { getOrder } from '../../services/graphql';
import * as Schema from '../../services/graphql/schema';
import Loader from './Loader';

const OrderPage = ({ t, token }) => {
    const styles = useStyles();
    const [params] = React.useState({
        pageSize: 5,
        currentPage: 1,
    });
    const [loadMore, setLoadMore] = React.useState(false);
    const {
        loading, data, error, fetchMore,
    } = getOrder(params, token);
    if (loading || !data) return <Loader />;
    if (error) console.log(error);
    const handleLoadMore = () => {
        setLoadMore(true);
        return fetchMore({
            query: Schema.getOrder(),
            context: {
                request: 'internal',
            },

            fetchPolicy: 'cache-and-network',
            variables: {
                currentPage: params.currentPage + 1,
                pageSize: params.pageSize,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                setLoadMore(false);
                const prevItems = previousResult.customerOrders;
                const newItems = fetchMoreResult.customerOrders;
                return {
                    customerOrders: {
                        ...prevItems,
                        items: [...prevItems.items, ...newItems.items],
                    },
                };
            },
        });
    };
    return (
        <div className={styles.container}>
            {data && data.customerOrders.items.length > 0 && data.customerOrders.items.map((item, index) => <Item t={t} key={index} {...item} />)}
            {data && data.customerOrders.total_count > data.customerOrders.items.length && (
                <Button variant="text" onClick={handleLoadMore} disabled={loading || loadMore} fullWidth>
                    <Typography variant="span" type="regular" letter="capitalize">
                        {loadMore || loading ? 'Loading ...' : t('common:loadMore')}
                    </Typography>
                </Button>
            )}
        </div>
    );
};

export default OrderPage;
