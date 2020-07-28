/* eslint-disable array-callback-return */
/* eslint-disable guard-for-in */
import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import Tune from '@material-ui/icons/Tune';
import PropTypes from 'prop-types';
import GridList from '@common_gridlist';
import ProductItem from '@components/ProductItem';
import ProductListSkeleton from '@components/ProductList/component/Skeleton';
import Router, { useRouter } from 'next/router';
import getQueryFromPath from '@helpers/generateQuery';
import CustomTabs from '@common_tabs';
import Skeleton from '@material-ui/lab/Skeleton';
import Alert from '@material-ui/lab/Alert';
import TagManager from 'react-gtm-module';
import { storeConfigNameCokie } from '@config';
import cookies from 'js-cookie';
import useStyles from '../style';
import Filter from './Filter';
import { getProduct } from '../services';
import * as Schema from '../services/schema';

const getCategoryFromAgregations = (agg) => {
    const category = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < agg.length; index++) {
        if (agg[index].field === 'category_id') {
            // eslint-disable-next-line no-plusplus
            for (let catIdx = 0; catIdx < agg[index].value.length; catIdx++) {
                // only if have product show category
                if (agg[index].value[catIdx].count > 0) {
                    category.push({ label: agg[index].value[catIdx].label, value: agg[index].value[catIdx].value });
                }
            }
        }
    }
    return category;
};

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
        if (q === 'q') {
            resolveConfig.search = query[q];
        } else if (q === 'sort' && query[q] !== '') {
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
/**
 * add url_path if no redirect to slug router
 * catId if need to by category
 * catalog_search_engine props to use detect elastic in on or of
 * customFilter have custom sort and filter
 */
const Product = (props) => {
    const {
        catId = 0, catalog_search_engine, customFilter, url_path, showTabs, defaultSort, t,
        categoryPath,
    } = props;
    const router = useRouter();
    const styles = useStyles();
    const [openFilter, setOpenFilter] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [loadmore, setLoadmore] = React.useState(false);
    const elastic = catalog_search_engine === 'elasticsuite';
    let config = {
        customFilter: typeof customFilter !== 'undefined',
        search: '',
        pageSize: 8,
        currentPage: 1,
        filter: [],
    };

    const { path, query } = getQueryFromPath(router);

    // set default sort when there is no sort in query
    if (defaultSort && !query.sort) {
        query.sort = JSON.stringify(defaultSort);
    }

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
            } else if (v[key] !== 0 && v[key] !== '') {
                queryParams += `${queryParams !== '' ? '&' : ''}${key}=${v[key]}`;
            }
        });
        Router.push(`/${url_path || '[...slug]'}`, encodeURI(`${path}?${queryParams}`));
    };
    if (catId !== 0) {
        config.filter.push({
            type: 'category_id',
            value: catId,
        });
    }
    config = generateConfig(query, config, elastic);

    const { loading, data, fetchMore } = getProduct(config);
    let products = {};
    products = data && data.products ? data.products : {
        total_count: 0,
        items: [],
    };

    // generate filter if donthave custom filter
    const aggregations = [];
    if (!customFilter && !loading && products.aggregations) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < products.aggregations.length; index++) {
            aggregations.push({
                field: products.aggregations[index].attribute_code,
                label: products.aggregations[index].label,
                value: products.aggregations[index].options,
            });
        }
    }
    const category = getCategoryFromAgregations(aggregations);

    // eslint-disable-next-line no-shadow
    const renderEmptyMessage = (count, loading) => {
        if (count || loading) {
            return null;
        }
        return <Alert style={{ margin: '18px' }} severity="warning">{t('product:emptyProductSearchResult')}</Alert>;
    };

    let storeConfig = {};
    if (typeof window !== 'undefined') {
        storeConfig = cookies.getJSON(storeConfigNameCokie);
    }

    React.useEffect(() => {
        if (data && data.products) {
            const tagManagerArgs = {
                dataLayer: {
                    event: 'impression',
                    eventCategory: 'Ecommerce',
                    eventAction: 'Impression',
                    eventLabel: categoryPath ? `category ${categoryPath}` : '',
                    ecommerce: {
                        currencyCode: storeConfig.base_currency_code || 'IDR',
                        impressions: data.products.items.map((product, index) => {
                            let categoryProduct = '';
                            // eslint-disable-next-line no-unused-expressions
                            product.categories.length > 0 && product.categories.map(({ name }, indx) => {
                                if (indx > 0) categoryProduct += `/${name}`;
                                else categoryProduct += name;
                            });
                            return {
                                name: product.name,
                                id: product.sku,
                                category: categoryProduct,
                                price: product.price_range.minimum_price.regular_price.value,
                                list: categoryProduct,
                                position: index,
                            };
                        }),
                    },
                },
            };
            TagManager.dataLayer(tagManagerArgs);
        }
    }, [data]);

    return (
        <>
            {showTabs && loading ? <Skeleton variant="rect" height={50} style={{ marginBottom: 20 }} /> : null}
            {showTabs ? (
                <CustomTabs
                    // eslint-disable-next-line radix
                    value={query.category_id ? query.category_id : 0}
                    data={category}
                    onChange={(e, value) => setFiltervalue({ ...query, ...{ category_id: value } })}
                />
            ) : null }
            {loading ? <Skeleton variant="rect" width="100%" height={50} style={{ marginBottom: 10 }} /> : (
                <>
                    <Filter
                        filter={customFilter || aggregations}
                        defaultSort={JSON.stringify(defaultSort)}
                        filterValue={query}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        elastic={elastic}
                        setFilter={setFiltervalue}
                        isSearch={!!config.search}
                    />
                    <div className={styles.filterContainer}>
                        <Typography
                            variant="p"
                            type="regular"
                            className={styles.countProductText}
                        >
                            {products.total_count}
                            {' '}
                            {t('common:product:name')}
                        </Typography>
                        <div className={styles.filterBtnContainer}>
                            <Button
                                variant="text"
                                customRootStyle={{ width: 'fit-content' }}
                                className={styles.btnFilter}
                                onClick={() => setOpenFilter(true)}
                            >
                                <Tune className={styles.iconFilter} />
                            </Button>
                            <Typography type="bold" variant="span" letter="capitalize">
                                {t('common:title:shortFilter')}
                            </Typography>
                        </div>
                    </div>
                </>
            )}

            <div className={styles.productContainer}>
                {loading && <ProductListSkeleton />}
                {!loading && (
                    <GridList
                        data={products.items}
                        ItemComponent={ProductItem}
                        itemProps={{
                            categorySelect: categoryPath,
                        }}
                        gridItemProps={{ xs: 6, sm: 4, md: 3 }}
                    />
                )}
                {(products.items.length === products.total_count) || loading
                    ? renderEmptyMessage(products.items.length, loading)
                    : (
                        <button
                            className={styles.btnLoadmore}
                            type="button"
                            onClick={() => {
                                setLoadmore(true);
                                setPage(page + 1);
                                return fetchMore({
                                    query: Schema.getProduct({
                                        customFilter: typeof customFilter !== 'undefined',
                                        search: config.search,
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
    // eslint-disable-next-line react/require-default-props
    catId: PropTypes.number,
    // eslint-disable-next-line react/require-default-props
    catalog_search_engine: PropTypes.string,
};

export default Product;
