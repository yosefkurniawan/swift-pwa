/* eslint-disable consistent-return */
import { useEffect } from 'react';
import gqlService from '@core_modules/home/service/graphql';
import { featuresConfig } from '@services/graphql/repository/pwa_config';

const FeaturedProducts = ({
    t, ErrorInfo, FeaturedSkeleton, FeaturedView, isLogin,
}) => {
    const context = (isLogin && isLogin === 1) ? { request: 'internal' } : {};
    const { loading: featuresConfigLoading, data: featuresConfigData } = featuresConfig();
    const [loadFeaturedProducts, { loading, data, error }] = gqlService.getFeaturedProducts();

    useEffect(() => {
        if (!featuresConfigLoading && featuresConfigData) {
            loadFeaturedProducts({
                variables: {
                    url_key: featuresConfigData.storeConfig.pwa.features_product_url_key,
                    context,
                },
            });
        }
    }, [featuresConfigLoading, featuresConfigData]);

    if ((loading || featuresConfigLoading) && !data) return <FeaturedSkeleton />;
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
                <FeaturedView onReInit={onReInit} data={data.categoryList[0].children} t={t} />
            </>
        );
    }
};

export default FeaturedProducts;
