/* eslint-disable arrow-body-style */
import Carousel from '@common_slick/Caraousel';
import ItemFeatured from './Item';

const FeaturedBrands = (props) => {
    const { featured = [], t, desktop } = props;
    return (
        <Carousel
            showArrow={desktop}
            slideLg
            title={t('brands:featuredBrands')}
            data={featured}
            Item={ItemFeatured}
        />
    );
};

export default FeaturedBrands;
