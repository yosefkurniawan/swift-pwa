/* eslint-disable arrow-body-style */
import Carousel from '@common_slider/Carousel';
import ItemFeatured from './Item';

const FeaturedBrands = ({ data = [], t }) => {
    return (
        <Carousel
            title={t('brands:featuredBrands')}
            data={data}
            customItem={ItemFeatured}
        />
    );
};

export default FeaturedBrands;
