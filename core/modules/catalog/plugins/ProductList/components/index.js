import React, { useEffect, useState } from 'react';
import GridList from '@common_gridlist';
import Typography from '@common_typography';
import classNames from 'classnames';
import { setLocalStorage, getLocalStorage } from '@helper_localstorage';
import Filter from '@plugin_productlist/components/Filter';
import FilterDesktop from '@plugin_productlist/components/FilterDesktop';
import ProductItem from '@plugin_productitem/index';
import LabelView from '@plugin_productitem/components/LabelView';
import useStyles from '@plugin_productlist/components/style';
import Sort from '@plugin_productlist/components/FilterDesktop/sort';

const Content = (props) => {
    const {
        query, showTabs, customFilter, elastic, t,
        aggregations, setFiltervalue, category, defaultSort, config, TabView,
        products, categoryPath, renderEmptyMessage, ProductListSkeleton, loading,
        loadmore, handleLoadMore, dataTabs, onChangeTabs, ...other
    } = props;
    const { storeConfig } = props;
    const styles = useStyles();
    const [isGrid, setGridState] = useState(true);
    const handleScroll = () => {
        // To get page offset of last user
        // const lastUserLoaded = document.querySelector(`.grid-item:last-child`);
        const lastUserLoaded = document.querySelector('.latest-product-indicator');
        if (lastUserLoaded) {
            const lastUserLoadedOffset = lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;
            if (pageOffset > lastUserLoadedOffset && !loadmore && products.items.length < products.total_count) {
                handleLoadMore();
            }
        }
    };

    const setGrid = async (state) => {
        setLocalStorage('isGrid', state);
        setGridState(state);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    useEffect(() => {
        const gridView = getLocalStorage('isGrid');
        if (gridView !== null) {
            setGridState(gridView);
        }
    }, [isGrid]);

    return (
        <>
            {showTabs ? (
                <div className="hidden-desktop">
                    <TabView
                        // eslint-disable-next-line radix
                        value={query.category_id ? query.category_id : 0}
                        data={category}
                        onChange={(e, value) => setFiltervalue({ ...query, ...{ category_id: value } })}
                        {...other}
                    />
                </div>
            ) : null}
            <div className={storeConfig?.pwa?.drawer_filter_on_desktop_enable ? 'hidden-desktop' : ''}>
                <Filter
                    filter={customFilter || aggregations}
                    defaultSort={JSON.stringify(defaultSort)}
                    filterValue={query}
                    setFiltervalue={setFiltervalue}
                    isSearch={!!config.search}
                    products={products}
                    renderEmptyMessage={renderEmptyMessage}
                    loading={loading}
                    setGrid={(state) => setGrid(state)}
                    t={t}
                    {...other}
                />
            </div>
            {storeConfig?.pwa?.drawer_filter_on_desktop_enable ? (
                <div className={classNames(styles.filterBtnContainer, 'hidden-mobile')}>
                    <Sort
                        filter={customFilter || aggregations}
                        defaultSort={JSON.stringify(defaultSort)}
                        filterValue={query}
                        setFiltervalue={setFiltervalue}
                        isSearch={!!config.search}
                        t={t}
                        {...other}
                    />
                </div>
            ) : null}

            <div className="row">
                {storeConfig?.pwa?.drawer_filter_on_desktop_enable
                    ? (
                        <div className="col-sm-12 col-lg-2 hidden-mobile">
                            <FilterDesktop
                                filter={customFilter || aggregations}
                                defaultSort={JSON.stringify(defaultSort)}
                                filterValue={query}
                                setFiltervalue={setFiltervalue}
                                isSearch={!!config.search}
                                products={products}
                                renderEmptyMessage={renderEmptyMessage}
                                loading={loading}
                                tabs={dataTabs}
                                t={t}
                                onChangeTabs={onChangeTabs}
                                storeConfig={storeConfig}
                            />
                        </div>
                    )
                    : null}
                <div className={`col-sm-12 col-xs-12 col-lg-${storeConfig?.pwa?.drawer_filter_on_desktop_enable ? '10' : '12'}`}>
                    {storeConfig?.pwa?.drawer_filter_on_desktop_enable
                        ? (
                            <Typography variant="p" type="regular" className={classNames('hidden-mobile', styles.countProductTextDesktop)}>
                                {products.total_count}
                                {' '}
                                {t('catalog:product:name')}
                            </Typography>
                        ) : null}
                    <div className={styles.productContainer}>
                        {loading && <ProductListSkeleton />}
                        {!loading && (
                            <GridList
                                data={products.items}
                                ItemComponent={ProductItem}
                                className="grid"
                                itemProps={{
                                    categorySelect: categoryPath,
                                    LabelView,
                                    isGrid,
                                    catalogList: true,
                                    className: 'grid-item',
                                    ...other,
                                }}
                                gridItemProps={
                                    isGrid
                                        ? {
                                            xs: 6, sm: 4, md: storeConfig?.pwa?.drawer_filter_on_desktop_enable ? 3 : 2,
                                        } : {
                                            xs: 12, sm: 12, md: storeConfig?.pwa?.drawer_filter_on_desktop_enable ? 12 : 12,
                                        }
                                }
                            />
                        )}
                        <div className="latest-product-indicator" />
                        {(products.items.length === products.total_count) || loading
                            ? renderEmptyMessage(products.items.length, loading)
                            : null}
                        <div className={loadmore ? styles.divLoadMore : styles.hideDivLoadMore}>
                            <Typography align="center" variant="span" type="bold" letter="uppercase" color="gray">
                                Loading
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Content;
