/* eslint-disable guard-for-in */
import Typography from '@components/Typography';
import Button from '@components/Button';
import { Tune } from '@material-ui/icons';
import PropTypes from 'prop-types';
import GridList from '@components/GridList';
import ProductItem from '@components/ProductItem';
import Loading from '@components/Loaders';
import Router, { useRouter } from 'next/router';
import getQueryFromPath from '@helpers/generateQuery';
import useStyles from '../style';
import Filter from './Filter';
import { getProductByCategory } from '../services';
import * as Schema from '../services/schema';

const getProduct = (catId, config = {}) => getProductByCategory(catId, config);

/**
 * function to generate config product
 * @param Object query
 * @param Object configuration
 * @returns object
 */
const generateConfig = (query, config, elastic) => {
    const resolveConfig = config;
    // eslint-disable-next-line no-restricted-syntax
    for (const q in query) {
        if (q === 'sort' && query[q] !== '') {
            resolveConfig.sort = JSON.parse(query[q]);
        } else if (q === 'priceRange') {
            const price = query[q].split(',');
            // eslint-disable-next-line radix
            if (parseInt(price[1]) !== 0) {
                resolveConfig.filter.push({
                    type: 'price',
                    from: price[0],
                    to: price[1],
                });
            }
        } else if (q !== 'cat') {
            resolveConfig.filter.push({
                type: q,
                value: elastic ? query[q].split(',') : query[q],
            });
        }
    }
    return resolveConfig;
};

const Product = ({ catId, catalog_search_engine }) => {
    const router = useRouter();
    const styles = useStyles();
    const [openFilter, setOpenFilter] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [loadmore, setLoadmore] = React.useState(false);
    const elastic = catalog_search_engine === 'elasticsuite';
    let config = {
        pageSize: 20,
        currentPage: 1,
        filter: [],
    };

    const { path, query } = getQueryFromPath(router);

    const setFiltervalue = (v) => {
        let queryParams = '';
        // eslint-disable-next-line array-callback-return
        Object.keys(v).map((key) => {
            if (key === 'selectedFilter') {
                // eslint-disable-next-line no-restricted-syntax
                for (const idx in v.selectedFilter) {
                    if (v.selectedFilter[idx] !== '') {
                        queryParams += `${queryParams !== '' ? '&' : ''}${idx}=${v.selectedFilter[idx]}`;
                    }
                }
            } else {
                queryParams += `${queryParams !== '' ? '&' : ''}${key}=${v[key]}`;
            }
        });
        Router.push('/[...slug]', encodeURI(`${path}?${queryParams}`));
    };

    config = generateConfig(query, config, elastic);

    const { loading, data, fetchMore } = getProduct(catId, config);
    let products = {};
    products = data && data.products ? data.products : {
        total_count: 0,
        items: [],
    };
    return (
        <>
            <Filter
                defaultValue={query}
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                catId={catId}
                elastic={elastic}
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
                {loading ? <Loading size="50px" />
                    : (
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
                    )}
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
                                    const newItems = fetchMoreResult.products.items;
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
                        {loadmore ? 'Loading' : 'Load More Items'}
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
