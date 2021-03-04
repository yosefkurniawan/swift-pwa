/* eslint-disable consistent-return */
import config from '@config';
import gqlService from '../../../../service/graphql';

const BannerSlider = (props) => {
    const { home } = config.modules;
    const {
        storeConfig, t, BannerSliderSkeleton, ErrorInfo, BannerView,
    } = props;
    const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;

    const { loading, data, error } = gqlService.getSlider({
        variables: {
            title: home.bannerSlider.title,
        },
    });
    if (loading && !data) {
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

        if (typeof window !== 'undefined') {
            setTimeout(() => {
                if (typeof window !== 'undefined') {
                    if (document.getElementById('home-banner')) {
                        document.getElementById('home-banner').classList.remove('hide');
                    }
                    if (document.getElementById('home-banner-skeleton')) {
                        document.getElementById('home-banner-skeleton').classList.add('hide');
                    }
                }
            }, 500);
        }
        return (
            <>
                <div className="full-width" id="home-banner-skeleton">
                    <BannerSliderSkeleton logoUrl={logoUrl} />
                </div>
                <BannerView logoUrl={logoUrl} images={bannerImages} />
            </>
        );
    }

    return null;
};

export default BannerSlider;
