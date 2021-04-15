/* eslint-disable max-len */
import { modules } from '@config';
import BannerSlider from './Banner';
import FeaturedProducts from './FeaturedProducts';
import CategoryList from './CategoryList';
import useStyles from './style';

const Content = (props) => {
    const styles = useStyles();
    const {
        BannerSliderSkeleton, BannerView, FeaturedSkeleton, FeaturedView, CategoryListSkeleton, CategoryListView, CmsPage, ...other
    } = props;
    const { useCmsPage } = modules.home;

    if (useCmsPage) return <CmsPage onlyCms slug={['pwa-homepage']} withLayoutHeader={false} withLayoutFooter={false} withCmsTitle={false} {...other} />;

    return (
        <div className={styles.container}>
            <BannerSlider BannerSliderSkeleton={BannerSliderSkeleton} BannerView={BannerView} {...other} />
            <FeaturedProducts FeaturedView={FeaturedView} FeaturedSkeleton={FeaturedSkeleton} {...other} />
            <CategoryList CategoryListSkeleton={CategoryListSkeleton} CategoryListView={CategoryListView} {...other} />
        </div>
    );
};

export default Content;
