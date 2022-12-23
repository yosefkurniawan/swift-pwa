import React from 'react';
import Product from '@plugin_productlist';
import Typography from '@common_typography';
import useStyles from '@core_modules/searchresult/components/style';
import CategoryList from '@core_modules/searchresult/components/CategoryList';
import SellerList from '@core_modules/searchresult/components/SellerList';

const SearchResult = (props) => {
    const styles = useStyles();
    const {
        storeConfig, t, q, isLogin,
    } = props;
    return (
        <div className={styles.container}>
            {/* add url path if no redirect to slug */}
            <div className="hidden-mobile">
                <Typography variant="span" letter="uppercase" className={styles.title}>
                    {t('catalog:title:searchResult')}
                    {': '}
                    {q}
                </Typography>
            </div>
            <CategoryList {...props} />
            {storeConfig.enable_oms_multiseller === '1' && (
                <SellerList {...props} />
            )}
            <div className={styles.wrapper}>
                <div className={styles.topTitle}>
                    Product
                </div>
                <Product
                    defaultSort={{ key: 'relevance', value: 'DESC' }}
                    url_path="catalogsearch/advanced/result"
                    showTabs
                    catalog_search_engine={storeConfig.catalog_search_engine}
                    t={t}
                    storeConfig={storeConfig}
                    isLogin={isLogin}
                />
            </div>
        </div>
    );
};

export default SearchResult;
