/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-empty */
/* eslint-disable array-callback-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-use-before-define */
/* eslint-disable no-empty */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import getQueryFromPath from '@helper_generatequery';
import TagManager from 'react-gtm-module';
import { getProduct, getProductAgragations, getProductPrice } from '@core_modules/catalog/services/graphql';
import { getSessionStorage, setSessionStorage } from '@helpers/sessionstorage';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import * as Schema from '@core_modules/catalog/services/graphql/productSchema';
import generateConfig from '@core_modules/catalog/helpers/generateConfig';
import getCategoryFromAgregations from '@core_modules/catalog/helpers/getCategory';
import getPrice from '@core_modules/catalog/helpers/getPrice';
import Content from '@plugin_productlist/components';
import { priceVar } from '@root/core/services/graphql/cache';
import { useReactiveVar } from '@apollo/client';

const getTagManager = (categoryPath, storeConfig, data) => ({
        dataLayer: {
            event: 'impression',
            eventCategory: 'Ecommerce',
            eventAction: 'Impression',
            eventLabel: categoryPath ? `category ${categoryPath}` : '',
            ecommerce: {
                currencyCode: storeConfig && storeConfig.base_currency_code ? storeConfig.base_currency_code : 'IDR',
                impressions: data.products.items.map((product, index) => {
                    let categoryProduct = '';
                    // eslint-disable-next-line no-unused-expressions
                    product.categories.length > 0 &&
                        product.categories.map(({ name }, indx) => {
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
    });
const getTagManagerGA4 = (categoryPath, data) => ({
        dataLayer: {
            event: 'view_item_list',
            pageName: categoryPath,
            pageType: 'category',
            ecommerce: {
                items: data.products.items.map((product, index) => {
                    let categoryProduct = '';
                    let categoryOne = '';
                    let categoryTwo = '';
                    // eslint-disable-next-line no-unused-expressions
                    product.categories.length > 0 &&
                        ((categoryOne = product.categories[0].name),
                        (categoryTwo = product.categories[1]?.name),
                        product.categories.map(({ name }, indx) => {
                            if (indx > 0) categoryProduct += `/${name}`;
                            else categoryProduct += name;
                        }));
                    return {
                        item_name: product.name,
                        item_id: product.sku,
                        price: product.price_range.minimum_price.regular_price.value,
                        item_category: categoryOne,
                        item_category_2: categoryTwo,
                        item_list_name: categoryProduct,
                        index,
                        currency: product.price_range.minimum_price.regular_price.currency,
                    };
                }),
            },
        }
    });

const ProductPagination = (props) => {
    const {
        catId = 0,
        catalog_search_engine,
        customFilter,
        url_path,
        defaultSort,
        t,
        categoryPath,
        ErrorMessage,
        storeConfig,
        query,
        path,
        availableFilter,
        token,
        isLogin,
        sellerId = null,
        banner,
        ...other
    } = props;
    const router = useRouter();
    // cache price
    const cachePrice = useReactiveVar(priceVar);
    /**
     * start handle previous
     * backPage = (from category)
     * isQueryChanged = (from search result)
     */
    let backPage;
    let isQueryChanged;
    const pageInfo = getLocalStorage('page_info');
    // if (pageInfo?.path === router.asPath) {
    //     backPage = pageInfo.page;
    // }
    if (pageInfo?.path === router.asPath) {
        backPage = pageInfo.page;
    } else if (
        !router.asPath.includes('catalogsearch/result') &&
        (pageInfo?.path?.includes(router.asPath) || router.asPath.includes(pageInfo?.path))
    ) {
        isQueryChanged = true;
    }

    /**
     * handle page
     * specifically from search result not from category
     */
    if (pageInfo?.query?.q !== query?.q) {
        isQueryChanged = true;
    }
    // end handle previous

    let sizePage;
    const [products, setProducts] = React.useState({
        total_count: 0,
        items: [],
    });
    const [page, setPage] = React.useState(backPage || 1);
    const [pageSize, setPageSize] = React.useState(sizePage || 10);
    const [totalCount, setTotalCount] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(0);
    const [loadmore, setLoadmore] = React.useState(false);
    const [filterSaved, setFilterSaved] = React.useState(false);
    const timerRef = React.useRef(null);

    /**
     * config from BO
     * pagination or loadmore
     */
    const elastic = catalog_search_engine === 'elasticsuite';
    let config = {
        customFilter: false,
        search: '',
        pageSize,
        currentPage: page,
        filter: [],
        ...storeConfig.pwa,
    };
    const queryKeys = Object.keys(query);

    /**
     * use effect set page size
     */
    React.useEffect(() => {
        if (storeConfig && storeConfig.pwa) {
            setPageSize(storeConfig && storeConfig.pwa && parseInt(storeConfig.pwa.page_size, 0));
        }
    }, [storeConfig]);

    React.useEffect(() => {
        if (isQueryChanged) {
            setProducts({
                total_count: 0,
                items: [],
            });
            handleChangePage(1);
        }
    }, [isQueryChanged]);

    // set default sort when there is no sort in query
    if (defaultSort && !query.sort) {
        query.sort = JSON.stringify(defaultSort);
    }

    const setFiltervalue = (v) => {
        setFilterSaved(true);
        let queryParams = '';
        // eslint-disable-next-line array-callback-return
        Object.keys(v).map((key) => {
            if (key === 'selectedFilter') {
                // eslint-disable-next-line no-restricted-syntax
                for (const idx in v.selectedFilter) {
                    if (v.selectedFilter[idx] !== '' && !v[idx]) {
                        if (v.selectedFilter[idx] !== undefined && !idx.includes('seller/')) {
                            queryParams += `${queryParams !== '' ? '&' : ''}${idx}=${v.selectedFilter[idx]}`;
                        } else if (v.selectedFilter[idx] !== ''
                        && idx.includes('seller') && idx.includes('filter')) {
                            // for etalase filter
                            const newParam = idx.split('?');
                            queryParams += `${queryParams !== '' ? '&' : ''}${newParam[1]}=${v.selectedFilter[idx]}`;
                        }
                    }
                }
            } else if (v[key] !== 0 && v[key] !== '') {
                queryParams += `${queryParams !== '' ? '&' : ''}${key}=${v[key]}`;
            }
        });
        Router.push(`/${url_path || '[...slug]'}`, encodeURI(`${path}${queryParams ? `?${queryParams}` : ''}`));
        setPage(1);
    };
    if (catId !== 0) {
        config.filter.push({
            type: 'category_id',
            value: catId,
        });
    }

    if (!sellerId) {
        if (queryKeys[0] === 'catalogsearch/result?q') {
            config.search = query['catalogsearch/result?q'];
        } else if (queryKeys[0] === 'catalogsearch/') {
            config.search = query.q;
        }
        config = generateConfig(query, config, elastic, availableFilter);
    } else {
        const urlFilter = banner ? `seller/${sellerId}?filter` : `seller/${sellerId}/product?filter`;
        const setSortOnSellerPage = queryKeys.filter((key) => key.match(banner ? /seller\/\d\d\?sort/ : /seller\/\d\d\/product\?sort/));
        const setFilterSellerPage = queryKeys.find((key) => key === urlFilter);

        let filterObj = [{
            type: 'seller_id',
            value: sellerId,
        }];
        // set default sort when there is no sort in query
        if (setSortOnSellerPage.length > 0) {
            query.sort = query[setSortOnSellerPage[0]];
        }
        if (setFilterSellerPage) {
            filterObj = [{
                type: 'etalase',
                value: query[setFilterSellerPage],
                },
                {
                type: 'seller_id',
                value: sellerId,
                }
            ];
        }

        config = {
            customFilter: false,
            search: '',
            pageSize: 8,
            currentPage: 1,
            filter: filterObj,
            ...storeConfig.pwa,
        };
        config = generateConfig(query, config, elastic, availableFilter);
    }
    let context = (isLogin && isLogin === 1) || (config.sort && config.sort.key === 'random') ? { request: 'internal' } : {};
    if (token && token !== '') {
        context = {
            ...context,
            headers: {
                authorization: token,
            },
        };
    }

    const { loading, data, fetchMore } = getProduct(
        config,
        {
            variables: {
                pageSize,
                currentPage: page,
            },
            fetchPolicy: config.sort && config.sort.key === 'random' && filterSaved ? 'cache-and-network' : 'cache-first',
        },
        router
    );
    /* ====Start get price Product==== */
    const [getProdPrice, { data: dataPrice, loading: loadPrice, error: errorPrice }] = getProductPrice(config, {
        variables: {
            pageSize,
            currentPage: page,
        },
        context,
    },
    router);

    const generateIdentifier = `page_${page}_${router.asPath}`;

    React.useEffect(() => {
        if (typeof window !== 'undefined' && !cachePrice[generateIdentifier]) {
            getProdPrice();
        }
        // clear timeout when the component unmounts
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    React.useEffect(() => {
        if (dataPrice) {
            const identifier = generateIdentifier;
            const dataTemp = cachePrice;
            dataTemp[identifier] = dataPrice;
            priceVar({
                ...cachePrice,
            });
        }
    }, [dataPrice]);

    React.useEffect(() => {
        const totalProduct = products && products.total_count ? products.total_count : 0;
        const totalPageProduct = Math.ceil(totalProduct / pageSize);
        setTotalCount(totalProduct);
        setTotalPage(totalPageProduct);
    }, [products]);
    /**
     * useEffect for pagination to change loadmore to false
     * after getting response from GQL API
     *
     */
    React.useEffect(() => {
        if (data?.products) {
            setProducts(data.products);
        }
        setLoadmore(false);
    }, [data]);

    /**
     * useEffect
     * set localstorage : page info
     * handle back from PDP
     */
    React.useEffect(() => {
        setLocalStorage('page_info', { path: router.asPath, page, query });
    }, [page]);

    // generate filter if donthave custom filter
    const aggregations = React.useMemo(() => {
        const agg = [];
        if (!customFilter && !loading && products.aggregations) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < products.aggregations.length; index++) {
            agg.push({
                field: products.aggregations[index].attribute_code,
                label: products.aggregations[index].label,
                value: products.aggregations[index].options,
            });
        }
        }
        return agg;
    }, [products, loading, customFilter]);

    const category = getCategoryFromAgregations(aggregations);

    // eslint-disable-next-line no-shadow
    const renderEmptyMessage = (count, loading) => {
        if (count || loading) {
            return null;
        }
        return <ErrorMessage variant="warning" text={t('catalog:emptyProductSearchResult')} open />;
    };

    /**
     * function handleChangePage for pagination only
     * pagination is true
     * @param {*} pageInput
     */
    const handleChangePage = async (pageInput) => {
        try {
            if (fetchMore && typeof fetchMore !== 'undefined' && pageInput <= totalPage) {
                setLoadmore(true);
                fetchMore({
                    query: Schema.getProduct({ ...config, currentPage: pageInput }, router),
                    variables: {
                        pageSize,
                        currentPage: pageInput,
                    },
                    fetchPolicy: 'network-only',
                });
                setPage(pageInput);
                // to change setLoadmore to false on useEffect
                timerRef.current = setTimeout(() => {
                    window.scroll(0, 0);
                }, 200);
            }
        } catch (error) {
            setLoadmore(false);
        }
    };

    React.useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
            setFilterSaved(false);
            // GTM UA dataLayer
            const tagManagerArgs = getTagManager(categoryPath, storeConfig, data);
            // GA 4 dataLayer
            const tagManagerArgsGA4 = getTagManagerGA4(categoryPath, data);
            TagManager.dataLayer(tagManagerArgs);
            TagManager.dataLayer(tagManagerArgsGA4);
        }
    }, [data]);

    const contentProps = {
        loadmore,
        loading,
        t,
        query,
        customFilter,
        elastic,
        aggregations,
        setFiltervalue,
        category,
        defaultSort,
        config,
        products,
        categoryPath,
        renderEmptyMessage,
        storeConfig,
        page,
        totalPage,
        totalCount,
        handleChangePage,
    };
    return <Content {...contentProps} {...other} price={getPrice(cachePrice, generateIdentifier, dataPrice)} loadPrice={loadPrice} errorPrice={errorPrice} />;
};

const ProductLoadMore = (props) => {
    const {
        catId = 0,
        catalog_search_engine,
        customFilter,
        url_path,
        defaultSort,
        t,
        categoryPath,
        ErrorMessage,
        storeConfig,
        query,
        path,
        availableFilter,
        token,
        isLogin,
        sellerId = null,
        ...other
    } = props;
    const router = useRouter();
    // cache price
    const cachePrice = useReactiveVar(priceVar);
    const [products, setProducts] = React.useState({
        total_count: 0,
        items: [],
    });

    const [loadmore, setLoadmore] = React.useState(false);
    const [filterSaved, setFilterSaved] = React.useState(false);
    const elastic = catalog_search_engine === 'elasticsuite';
    let config = {
        customFilter: false,
        search: '',
        pageSize: 8,
        currentPage: 1,
        filter: [],
        ...storeConfig.pwa,
    };
    const queryKeys = Object.keys(query);

    // set default sort when there is no sort in query
    if (defaultSort && !query.sort) {
        query.sort = JSON.stringify(defaultSort);
    }

    const setFiltervalue = (v) => {
        setFilterSaved(true);
        let queryParams = '';
        // eslint-disable-next-line array-callback-return
        Object.keys(v).map((key) => {
            if (key === 'selectedFilter') {
                // eslint-disable-next-line no-restricted-syntax
                for (const idx in v.selectedFilter) {
                    if (v.selectedFilter[idx] !== '' && !v[idx]) {
                        if (v.selectedFilter[idx] !== undefined && !idx.includes('seller/')) {
                            queryParams += `${queryParams !== '' ? '&' : ''}${idx}=${v.selectedFilter[idx]}`;
                        } else if (v.selectedFilter[idx] !== ''
                        && idx.includes('seller') && idx.includes('filter')) {
                            // for etalase filter
                            const newParam = idx.split('?');
                            queryParams += `${queryParams !== '' ? '&' : ''}${newParam[1]}=${v.selectedFilter[idx]}`;
                        }
                    }
                }
            } else if (v[key] !== 0 && v[key] !== '') {
                queryParams += `${queryParams !== '' ? '&' : ''}${key}=${v[key]}`;
            }
        });
        Router.push(`/${url_path || '[...slug]'}`, encodeURI(`${path}${queryParams ? `?${queryParams}` : ''}`));
    };
    if (catId !== 0) {
        config.filter.push({
            type: 'category_id',
            value: catId,
        });
    }

    if (!sellerId) {
        if (queryKeys[0] === 'catalogsearch/result?q') {
            config.search = query['catalogsearch/result?q'];
        } else if (queryKeys[0] === 'catalogsearch/') {
            config.search = query.q;
        }
        config = generateConfig(query, config, elastic, availableFilter);
    } else {
        const setSortOnSellerPage = queryKeys.filter((key) => key.match(/seller\/\d\d\/product\?sort/));
        const setFilterSellerPage = queryKeys.find((key) => key === `seller/${sellerId}/product?filter`);

        let filterObj = [{
            type: 'seller_id',
            value: sellerId,
        }];

        // set default sort when there is no sort in query
        if (setSortOnSellerPage.length > 0) {
            query.sort = query[setSortOnSellerPage[0]];
        }
        if (setFilterSellerPage) {
            filterObj = [{
                type: 'etalase',
                value: query[setFilterSellerPage],
            }, {
                type: 'seller_id',
                value: sellerId,
            }];
        }
        config = {
            customFilter: false,
            search: '',
            pageSize: 8,
            currentPage: 1,
            filter: filterObj,
            ...storeConfig.pwa,
        };
        config = generateConfig(query, config, elastic, availableFilter);
    }
    let context = (isLogin && isLogin === 1) || (config.sort && config.sort.key === 'random') ? { request: 'internal' } : {};
    if (token && token !== '') {
        context = {
            ...context,
            headers: {
                authorization: token,
            },
        };
    }
    const { loading, data, fetchMore } = getProduct(
        config,
        {
            variables: {
                pageSize: parseInt(storeConfig?.pwa?.page_size, 0) || 10,
                currentPage: 1,
            },
            context,
            fetchPolicy: config.sort && config.sort.key === 'random' && filterSaved ? 'cache-and-network' : 'cache-first',
        },
        router
    );
    /* ====Start get price Product==== */
    const page = data && data.products && data.products.page_info && data.products.page_info.current_page;
    const [getProdPrice, { data: dataPrice, loading: loadPrice, error: errorPrice }] = getProductPrice(config, {
        variables: {
            pageSize: storeConfig.pwa ? parseInt(storeConfig?.pwa?.page_size, 0) : 10,
            currentPage: page,
        },
        context,
    },
    router);

    const generateIdentifier = `page_${page}_${router.asPath}`;

    React.useEffect(() => {
        if (typeof window !== 'undefined' && !cachePrice[generateIdentifier]) {
            getProdPrice();
        }
    }, [data]);

    React.useEffect(() => {
        if (dataPrice) {
            const identifier = generateIdentifier;
            const dataTemp = cachePrice;
            dataTemp[identifier] = dataPrice;
            priceVar({
                ...cachePrice,
            });
        }
    }, [dataPrice]);

    // generate filter if donthave custom filter
    const aggregations = React.useMemo(() => {
        const agg = [];
        if (!customFilter && !loading && products.aggregations) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < products.aggregations.length; index++) {
            agg.push({
                field: products.aggregations[index].attribute_code,
                label: products.aggregations[index].label,
                value: products.aggregations[index].options,
            });
        }
        }
        return agg;
    }, [products, loading, customFilter]);

    const category = getCategoryFromAgregations(aggregations);

    // eslint-disable-next-line no-shadow
    const renderEmptyMessage = (count, loading) => {
        if (count || loading) {
            return null;
        }
        return <ErrorMessage variant="warning" text={t('catalog:emptyProductSearchResult')} open />;
    };

    const handleLoadMore = async () => {
        setFilterSaved(false);
        const pageSize = storeConfig.pwa ? parseInt(storeConfig?.pwa?.page_size, 0) : 10;
        const pageTemp = data.products.items.length / (parseInt(storeConfig?.pwa?.page_size, 0) || 10) + 1;
        try {
            if (fetchMore && typeof fetchMore !== 'undefined') {
                setLoadmore(true);
                fetchMore({
                    query: Schema.getProduct({ ...config, currentPage: pageTemp }, router),
                    variables: {
                        pageSize,
                        currentPage: pageTemp,
                    },
                    context,
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        setLoadmore(false);
                        return {
                            products: {
                                ...fetchMoreResult.products,
                                items: [...previousResult.products.items, ...fetchMoreResult.products.items],
                            },
                        };
                    },
                });
            }
        } catch (error) {
            setLoadmore(false);
        }
    };

    React.useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
            setFilterSaved(false);
            // GTM UA dataLayer
            const tagManagerArgs = getTagManager(categoryPath, storeConfig, data);
            // GA 4 dataLayer
            const tagManagerArgsGA4 = getTagManagerGA4(categoryPath, data);
            TagManager.dataLayer(tagManagerArgs);
            TagManager.dataLayer(tagManagerArgsGA4);
        }
    }, [data]);

    const handleRouteChange = React.useCallback(() => {
        window.history.scrollRestoration = 'manual';
        const sessionStorageItems = ['lastCatalogsOffset', 'lastCatalogsVisited', 'lastProductsVisited'];
        const lastCatalogsOffset = getSessionStorage('lastCatalogsOffset') || [];
        const prevUrl = sessionStorage.getItem('prevUrl');
        const lastProductsVisited = getSessionStorage('lastProductsVisited') || [];
        const restoreCatalogPosition = getSessionStorage('restoreCatalogPosition');

        if (prevUrl === lastProductsVisited[0] && restoreCatalogPosition && lastCatalogsOffset[0] !== 0) {
            window.scrollTo({
                top: lastCatalogsOffset[0],
            });
            sessionStorageItems.forEach((item) => {
                const itemData = getSessionStorage(item);
                setSessionStorage(item, itemData.slice(1, itemData.length));
            });
            sessionStorage.removeItem('restoreCatalogPosition');
        }
    }, []);

    React.useEffect(() => {
        if (router.pathname === '/catalogsearch/result') {
            handleRouteChange();
        }
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    React.useEffect(() => {
        if (router.pathname !== '/catalogsearch/result') {
            handleRouteChange();
        }
    }, [data, !loading]);

    const contentProps = {
        loadmore,
        loading,
        t,
        query,
        customFilter,
        elastic,
        aggregations,
        setFiltervalue,
        category,
        defaultSort,
        config,
        products,
        categoryPath,
        handleLoadMore,
        renderEmptyMessage,
        storeConfig,
    };

    return <Content {...contentProps} {...other} price={getPrice(cachePrice, generateIdentifier, dataPrice)} loadPrice={loadPrice} errorPrice={errorPrice} />;
};

ProductPagination.propTypes = {
    // eslint-disable-next-line react/require-default-props
    catId: PropTypes.number,
    // eslint-disable-next-line react/require-default-props
    catalog_search_engine: PropTypes.string,
};

ProductLoadMore.propTypes = {
    // eslint-disable-next-line react/require-default-props
    catId: PropTypes.number,
    // eslint-disable-next-line react/require-default-props
    catalog_search_engine: PropTypes.string,
};

const ProductWrapper = (props) => {
    const { storeConfig } = props;
    const router = useRouter();
    const { path, query } = getQueryFromPath(router);

    /**
     * config from BO
     * pagination or loadmore
     */
    const isPagination = storeConfig && storeConfig.pwa && storeConfig.pwa.product_listing_navigation !== 'infinite_scroll';
    const Product = isPagination ? ProductPagination : ProductLoadMore;
    let availableFilter = [];
    let loadingAgg;
    if (Object.keys(query).length > 0) {
        const { data: agg, loading } = getProductAgragations();
        loadingAgg = loading;
        availableFilter = agg && agg.products ? agg.products.aggregations : [];
    }
    if (loadingAgg) {
        return <span />;
    }
    return <Product {...props} availableFilter={availableFilter} path={path} query={query} isPagination={isPagination} />;
};

export default ProductWrapper;
