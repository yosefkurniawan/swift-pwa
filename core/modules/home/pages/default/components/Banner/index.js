/* eslint-disable consistent-return */
import { useEffect } from 'react';
import gqlService from '@core_modules/home/service/graphql';
import { bannerSliderConfig } from '@root/core/services/graphql/repository/pwa_config';

const BannerSlider = (props) => {
    const {
        storeConfig, t, BannerSliderSkeleton, ErrorInfo, BannerView, slider_id,
    } = props;
    const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;
    const { loading: sliderConfigLoading, data: sliderConfigData } = bannerSliderConfig();
    const [loadSlider, { loading, data, error }] = gqlService.getSlider();

    useEffect(() => {
        if (!sliderConfigLoading && sliderConfigData) {
            loadSlider({
                variables: {
                    input: slider_id === undefined
                        ? { title: sliderConfigData.storeConfig.pwa.banner_slider_title }
                        : { id: slider_id },
                },
            });
        }
    }, [sliderConfigLoading, sliderConfigData]);

    if ((loading || sliderConfigLoading) && !data) {
        return <BannerSliderSkeleton logoUrl={logoUrl} />;
    }
    if (error) {
        return <ErrorInfo variant="error" text={t('home:errorFetchData')} />;
    }
    if (!data || data.slider.images.length === 0) {
        return <ErrorInfo variant="warning" text={t('home:nullData')} />;
    }

    if (data && data.slider) {
        const bannerImages = data.slider.images.map((image) => ({
            imageUrl: image.image_url,
            mobileImageUrl: image.mobile_image_url || image.image_url,
            link: image.url_redirection,
        }));
        return (
            <>
                <BannerView logoUrl={logoUrl} images={bannerImages} />
            </>
        );
    }

    return null;
};

export default BannerSlider;
