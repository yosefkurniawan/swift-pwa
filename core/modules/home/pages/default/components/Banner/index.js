/* eslint-disable consistent-return */
import gqlService from '@core_modules/home/service/graphql';
import BannerSliderSkeleton from '@core_modules/home/pages/default/components/Skeleton/BannerSkeleton';
import BannerView from '@core_modules/home/pages/default/components/Banner/view';
import ErrorInfo from '@core_modules/home/pages/default/components/ErrorInfo';

const BannerSlider = (props) => {
    const { storeConfig, t, slider_id } = props;
    const logoUrl = `${storeConfig && storeConfig.secure_base_media_url}logo/${storeConfig && storeConfig.header_logo_src}`;
    const { loading, data, error } = gqlService.getSlider({
        skip: !storeConfig,
        variables: {
            input: slider_id === undefined ? { title: storeConfig?.pwa?.banner_slider_title } : { id: slider_id },
        },
    });

    if (loading && !data) {
        return <BannerSliderSkeleton logoUrl={logoUrl} storeConfig={storeConfig} />;
    }
    if (error) {
        return <ErrorInfo variant="error" text={t('home:errorFetchData')} />;
    }
    if (!data || data.slider.images.length === 0) {
        return (
            <>
                <h1>Test</h1>
                <ErrorInfo variant="warning" text={t('home:nullData')} />
            </>
        );
    }

    if (data && data.slider) {
        const bannerImages = data.slider.images.map((image) => ({
            imageUrl: image.image_url,
            mobileImageUrl: image.mobile_image_url || image.image_url,
            link: image.url_redirection,
            video: image.video,
        }));
        return (
            <>
                <BannerView logoUrl={logoUrl} images={bannerImages} storeConfig={storeConfig} />
            </>
        );
    }

    return null;
};

export default BannerSlider;
