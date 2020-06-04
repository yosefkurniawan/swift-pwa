import Carousel from '@components/Slider/Carousel';
import ItemFeatured from './Item';


const FeaturedBrands = ({ data = [] }) => (
    <Carousel title="Featured Brands" data={data} customItem={ItemFeatured} />
);

export default FeaturedBrands;
