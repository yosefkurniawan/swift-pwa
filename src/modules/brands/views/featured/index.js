/* eslint-disable arrow-body-style */
import Carousel from '../../../commons/carousel';
import ItemFeatured from './Item';

const FeaturedBrands = (props) => {
    const { featured = [], t } = props;
    return (
        <Carousel
            title={t('brands:featuredBrands')}
            data={featured}
            item={ItemFeatured}
        />
    );
};

export default FeaturedBrands;
