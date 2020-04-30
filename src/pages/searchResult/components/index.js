import { Box } from '@material-ui/core';
import React from 'react';
import Product from '@components/ProductList';
import useStyles from '../style';


const SearchResult = ({ storeConfig }) => {
    const styles = useStyles();
    return (
        <Box className={styles.container}>
            {/* add url path if no redirect to slug */}
            <Product
                url_path="catalogsearch/result"
                showTabs
                catalog_search_engine={
                    storeConfig.catalog_search_engine
                }
            />
        </Box>
    );
};

export default SearchResult;
