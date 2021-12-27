/* eslint-disable consistent-return */
import { useEffect } from 'react';
import gqlService from '@core_modules/home/service/graphql';
import { categoryListConfig } from '@root/core/services/graphql/repository/pwa_config';

const CategoryList = ({
    storeConfig, t, CategoryListSkeleton, ErrorInfo, CategoryListView,
}) => {
    const { loading: categoryListConfigLoading, data: categoryListConfigData } = categoryListConfig();
    const [loadCategoryList, { loading, data, error }] = gqlService.getCategoryList();

    useEffect(() => {
        if (!categoryListConfigLoading && categoryListConfigData) {
            loadCategoryList({
                variables: { url_key: categoryListConfigData.storeConfig.pwa.category_list_url_key },
            });
        }
    }, [categoryListConfigLoading, categoryListConfigData]);

    if (loading || categoryListConfigLoading) return <CategoryListSkeleton />;
    if (error) {
        return (
            <ErrorInfo variant="error" text={t('home:errorFetchData')} />
        );
    }
    if (!data || data.categoryList.length === 0) {
        return (
            <ErrorInfo variant="warning" text={t('home:nullData')} />
        );
    }

    if (!loading && data && data.categoryList.length > 0) {
        return (
            <>
                <CategoryListView
                    storeConfig={storeConfig}
                    data={data.categoryList[0].children}
                />
            </>
        );
    }
};

export default CategoryList;
