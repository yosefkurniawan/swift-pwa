import Typography from '@components/Typography';
import Button from '@components/Button';
import { Tune } from '@material-ui/icons';
import PropTypes from 'prop-types';
import GridList from '@components/GridList';
import ProductItem from '@components/ProductItem';
import Loading from '@components/Loaders';
import useStyles from '../style';
import Filter from './Filter';
import { getProductByCategory } from '../services';
import * as Schema from '../services/schema';

const getProduct = (catId, config = {}) => getProductByCategory(catId, config);

const Product = ({ catId }) => {
    const styles = useStyles();
    const [openFilter, setOpenFilter] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [loadmore, setLoadmore] = React.useState(false);
    const [filter, setFilter] = React.useState({});
    const [prevProduct, setPrevProduct] = React.useState({});

    const setFiltervalue = (v) => {
        setPrevProduct({});
        setFilter(v);
    };

    const config = {
        pageSize: 20,
        currentPage: 1,
        filter: [],
    };
    if (filter.sort) {
        config.sort = JSON.parse(filter.sort);
    }
    if (filter.priceRange && filter.priceRange[1] !== 0) {
        config.filter.push({
            type: 'price',
            from: filter.priceRange[0],
            to: filter.priceRange[1],
        });
    }

    const { loading, data, fetchMore } = getProduct(catId, config);
    if (loading) {
        return <Loading size="50px" />;
    }
    let products = {};
    if (prevProduct.total_count) {
        products = prevProduct;
    } else {
        products = data.products;
    }
    return (
        <>
            <Filter
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                catId={catId}
                setFilter={setFiltervalue}
            />
            <div className={styles.filterContainer}>
                <Typography
                    variant="p"
                    type="regular"
                    className={styles.countProductText}
                >
                    {products.total_count}
                    {' '}
                    Product
                </Typography>
                <div className={styles.filterBtnContainer}>
                    <Button
                        variant="text"
                        className={styles.btnFilter}
                        onClick={() => setOpenFilter(true)}
                    >
                        <Tune className={styles.iconFilter} />
                    </Button>
                    <Typography type="bold" variant="span" letter="capitalize">
                        Filter & Sort
                    </Typography>
                </div>
            </div>

            <div className={styles.productContainer}>
                <GridList
                    data={products.items}
                    ItemComponent={ProductItem}
                    itemProps={{
                        color: ['#343434', '#6E6E6E', '#989898', '#C9C9C9'],
                        showListColor: true,
                        showListSize: true,
                        size: ['s', 'm', 'l', 'xl'],
                    }}
                    gridItemProps={{ xs: 6, sm: 4, md: 3 }}
                />
                {products.items.length === products.total_count ? null : (
                    <button
                        className={styles.btnLoadmore}
                        type="button"
                        onClick={() => {
                            setLoadmore(true);
                            setPage(page + 1);
                            return fetchMore({
                                query: Schema.getProductByCategory(catId, {
                                    pageSize: config.pageSize,
                                    currentPage: page + 1,
                                    filter: config.filter,
                                }),
                                updateQuery: (
                                    previousResult,
                                    { fetchMoreResult },
                                ) => {
                                    setLoadmore(false);
                                    const previousEntry = previousResult.products;
                                    let previousState = prevProduct;
                                    if (!previousState.total_count) {
                                        previousState = previousEntry;
                                    }
                                    const newItems = fetchMoreResult.products.items;
                                    setPrevProduct({
                                        // eslint-disable-next-line no-underscore-dangle
                                        __typename:
                                            // eslint-disable-next-line no-underscore-dangle
                                            previousState.__typename,
                                        total_count:
                                        previousState.total_count,
                                        items: [
                                            ...previousState.items,
                                            ...newItems,
                                        ],
                                    });
                                    return {
                                        products: {
                                            // eslint-disable-next-line no-underscore-dangle
                                            __typename:
                                                // eslint-disable-next-line no-underscore-dangle
                                                previousEntry.__typename,
                                            total_count:
                                                previousEntry.total_count,
                                            items: [
                                                ...previousEntry.items,
                                                ...newItems,
                                            ],
                                        },
                                    };
                                },
                            });
                        }}
                    >
                        {loadmore ? 'loading' : 'loadmore'}
                    </button>
                )}
            </div>
        </>
    );
};

Product.propTypes = {
    catId: PropTypes.number.isRequired,
};

export default Product;
