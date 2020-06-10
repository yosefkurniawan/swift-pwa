import Carousel from '@components/Slider/Carousel';
import ItemFeatured from './Item';
// import useStyles from './style';


// eslint-disable-next-line arrow-body-style
const FeaturedBrands = ({ data = [], t }) => {
    // const styles = useStyles();
    return (
        <Carousel
            title={t('brands:featuredBrands')}
            data={data}
            customItem={ItemFeatured}
            // customSlideClass={styles.featuredSlide}
        />
    );
};

export default FeaturedBrands;
