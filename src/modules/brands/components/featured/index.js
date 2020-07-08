/* eslint-disable arrow-body-style */
import Carousel from '@components/Swiper/ImageSlider';
import ItemFeatured from './Item';

const FeaturedBrands = (props) => {
    const { featured = [], t } = props;
    return (
        <Carousel
            title={t('brands:featuredBrands')}
            data={featured}
            customItem={ItemFeatured}
        />
    );
};

export default FeaturedBrands;
