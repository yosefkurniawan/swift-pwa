/* eslint-disable consistent-return */
import FeaturedSkeleton from '@core_modules/home/pages/default/components/Skeleton/FeaturedSkeleton';
import FeaturedView from '@core_modules/home/pages/default/components/FeaturedProducts/view';
import gqlService from '@core_modules/home/service/graphql';
import ErrorInfo from '@core_modules/home/pages/default/components/ErrorInfo';

const FeaturedProducts = ({
    t, isLogin, storeConfig,
}) => {
    const context = (isLogin && isLogin === 1) ? { request: 'internal' } : {};
    const { loading, data, error } = gqlService.getFeaturedProducts({
        skip: !storeConfig,
        variables: {
            url_key: storeConfig?.pwa?.features_product_url_key,
            context,
        },
    }, storeConfig);

    if ((loading) && !data) return <FeaturedSkeleton />;
    if (error) {
        return <ErrorInfo variant="error" text={t('home:errorFetchData')} />;
    }
    if (!data || data.categoryList.length === 0) {
        return <ErrorInfo variant="warning" text={t('home:nullData')} />;
    }

    if (!loading && data && data.categoryList.length > 0) {
        const onReInit = () => {
            if (typeof window !== 'undefined') {
                if (document.getElementById('home-featured')) {
                    document.getElementById('home-featured').classList.remove('hide');
                }
                if (document.getElementById('home-featured-skeleton')) {
                    document.getElementById('home-featured-skeleton').classList.add('hide');
                }
            }
        };
        return (
            <>
                <div className="full-width" id="home-featured-skeleton">
                    <FeaturedSkeleton />
                </div>
                <FeaturedView onReInit={onReInit} data={data.categoryList[0].children} t={t} storeConfig={storeConfig} />
            </>
        );
    }
};

export default FeaturedProducts;
