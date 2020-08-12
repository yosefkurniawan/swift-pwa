import React from 'react';
import GridList from '@common_gridlist';
import Filter from './Filter';
import ProductItem from '../../ProductItem/core';
import useStyles from './style';

const Content = (props) => {
    const {
        query, showTabs, customFilter, elastic,
        aggregations, setFiltervalue, category, defaultSort, config, TabView,
        products, categoryPath, renderEmptyMessage, ProductListSkeleton, loading,
        loadmore, handleLoadMore, ...other
    } = props;
    const styles = useStyles();
    return (
        <>
            {showTabs ? (
                <TabView
                    // eslint-disable-next-line radix
                    value={query.category_id ? query.category_id : 0}
                    data={category}
                    onChange={(e, value) => setFiltervalue({ ...query, ...{ category_id: value } })}
                    {...other}
                />
            ) : null}
            <Filter
                filter={customFilter || aggregations}
                defaultSort={JSON.stringify(defaultSort)}
                filterValue={query}
                setFiltervalue={setFiltervalue}
                isSearch={!!config.search}
                products={products}
                renderEmptyMessage={renderEmptyMessage}
                loading={loading}
                {...other}
            />
            <div className={styles.productContainer}>
                {loading && <ProductListSkeleton />}
                {!loading && (
                    <GridList
                        data={products.items}
                        ItemComponent={ProductItem}
                        itemProps={{
                            categorySelect: categoryPath,
                            ...other,
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
                            onClick={handleLoadMore}
                        >
                            {loadmore ? 'Loading' : 'Load More Items'}
                        </button>
                    )}
            </div>
        </>
    );
};

export default Content;
