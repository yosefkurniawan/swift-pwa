import Carousel from '@components/Slider/Carousel';
import ItemFeatured from './Item';


const FeaturedBrands = ({ data = [], t }) => (
    <Carousel title={t('brands:featuredBrands')} data={data} customItem={ItemFeatured} />
);

export default FeaturedBrands;
