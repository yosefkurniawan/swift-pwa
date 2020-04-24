/* eslint-disable guard-for-in */
import Typography from '@components/Typography';
import Button from '@components/Button';
import { Tune } from '@material-ui/icons';
import PropTypes from 'prop-types';
import GridList from '@components/GridList';
import ProductItem from '@components/ProductItem';
import Loading from '@components/Loaders';
import Router, { useRouter } from 'next/router';
import useStyles from '../style';
import Filter from './Filter';
import { getProductByCategory } from '../services';
import * as Schema from '../services/schema';

const getProduct = (catId, config = {}) => getProductByCategory(catId, config);

const getQuery = (router) => {
    let { asPath } = router;
    let path = '';
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < router.query.slug.length; index++) {
        path += `/${router.query.slug[index]}`;
    }
    asPath = decodeURI(asPath);
    asPath = asPath.replace(path, '').substr(1);
    asPath = asPath.split('&');
    const query = {};
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < asPath.length; index++) {
        let tempQuery = asPath[index];
        if (tempQuery !== '') {
            tempQuery = tempQuery.split('=');
            // eslint-disable-next-line prefer-destructuring
            query[tempQuery[0]] = tempQuery[1];
        }
    }
    return {
        path,
        query,
    };
};

const generateConfig = (query, config) => {
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
                value: query[q],
            });
        }
    }
    return resolveConfig;
};

const Product = ({ catId }) => {
    const router = useRouter();
    const styles = useStyles();
    const [openFilter, setOpenFilter] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [loadmore, setLoadmore] = React.useState(false);

    let config = {
        pageSize: 20,
        currentPage: 1,
        filter: [],
    };

    const { path, query } = getQuery(router);

    const setFiltervalue = (v) => {
        let queryParams = '';
        // eslint-disable-next-line array-callback-return
        Object.keys(v).map((key) => {
            if (key === 'selectedFilter') {
                // eslint-disable-next-line no-restricted-syntax
                for (const idx in v.selectedFilter) {
                    queryParams += `${queryParams !== '' ? '&' : ''}${idx}=${v.selectedFilter[idx]}`;
                }
            } else {
                queryParams += `${queryParams !== '' ? '&' : ''}${key}=${v[key]}`;
            }
        });
        Router.push('/[...slug]', encodeURI(`${path}?${queryParams}`));
    };
    config = generateConfig(query, config);
    const { loading, data, fetchMore } = getProduct(query.cat ? query.cat : catId, config);
    if (loading) {
        return <Loading size="50px" />;
    }
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
