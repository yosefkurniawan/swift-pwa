/* eslint-disable consistent-return */
import CategoryListView from '@core_modules/home/pages/default/components/CategoryList/view';
import CategoryListSkeleton from '@core_modules/home/pages/default/components/Skeleton/CategoryListSkeleton';
import gqlService from '@core_modules/home/service/graphql';
import ErrorInfo from '@core_modules/home/pages/default/components/ErrorInfo';

const CategoryList = ({
    storeConfig, t,
}) => {
    const { loading, data, error } = gqlService.getCategoryList({
        skip: !storeConfig,
        variables: { url_key: storeConfig?.pwa?.category_list_url_key },
    });

    if (loading) return <CategoryListSkeleton />;
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
