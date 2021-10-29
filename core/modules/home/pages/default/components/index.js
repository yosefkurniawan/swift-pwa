/* eslint-disable max-len */
import { modules } from '@config';
import BannerSlider from '@core_modules/home/pages/default/components/Banner';
import CategoryList from '@core_modules/home/pages/default/components/CategoryList';
import FeaturedProducts from '@core_modules/home/pages/default/components/FeaturedProducts';
import useStyles from '@core_modules/home/pages/default/components/style';
import classNames from 'classnames';

const Content = (props) => {
    const styles = useStyles();
    const {
        BannerSliderSkeleton, BannerView, FeaturedSkeleton, FeaturedView, CategoryListSkeleton, CategoryListView, CmsPage, ...other
    } = props;
    const { useCmsPage } = modules.home;

    if (useCmsPage.enable) {
        const { storeConfig } = props;
        const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;
        return (
            <>
                <div className={classNames(styles.header)} id="home-banner">
                    <div className={classNames(styles.logo, 'hidden-desktop')}>
                        <img src={logoUrl} alt="logo" className={styles.imgLogo} />
                    </div>
                </div>
                <CmsPage onlyCms slug={[useCmsPage.identifier]} withLayoutHeader={false} withLayoutFooter={false} withCmsTitle={false} {...other} />
            </>
        );
    }

    return (
        <div className={styles.container}>
            <BannerSlider BannerSliderSkeleton={BannerSliderSkeleton} BannerView={BannerView} {...other} />
            <FeaturedProducts FeaturedView={FeaturedView} FeaturedSkeleton={FeaturedSkeleton} {...other} />
            <CategoryList CategoryListSkeleton={CategoryListSkeleton} CategoryListView={CategoryListView} {...other} />
        </div>
    );
};

export default Content;
