import React from 'react';
import Product from '@components/ProductList';
import useStyles from '../style';

const SearchResult = ({ storeConfig, t }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            {/* add url path if no redirect to slug */}
            <Product
                defaultSort={{ key: 'relevance', value: 'DESC' }}
                url_path="catalogsearch/result"
                showTabs
                catalog_search_engine={storeConfig.catalog_search_engine}
                t={t}
            />
        </div>
    );
};

export default SearchResult;
