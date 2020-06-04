import Carousel from '@components/Slider/Carousel';
import ItemFeatured from './Item';

const featured = [1, 2, 3, 4, 5, 6, 7];

const FeaturedBrands = () => (
    <Carousel title="Featured Brands" data={featured} customItem={ItemFeatured} />
);

export default FeaturedBrands;
