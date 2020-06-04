import Carousel from '@components/Slider/Carousel';
import ItemFeatured from './Item';

const featured = [
    {
        attribute_id: 5643,
        logo: 'https://swiftpwa-be.testingnow.me/media/brand/a/d/adidas.jpg',
        name: 'Adidas',
        sort_order: 0,
        is_active: 1,
        category_url: 'brands/adidas.html',
    },
    {
        attribute_id: 5644,
        logo: 'https://swiftpwa-be.testingnow.me/media/brand/n/i/nike.png',
        name: 'Nike',
        sort_order: 0,
        is_active: 1,
        category_url: 'brands/nike.html',
    },
    {
        attribute_id: 5645,
        logo: 'https://swiftpwa-be.testingnow.me/media/brand/u/n/uniqlo.png',
        name: 'Uniqlo',
        sort_order: 0,
        is_active: 1,
        category_url: 'brands/uniqlo.html',
    },
    {
        attribute_id: 5650,
        logo: 'https://swiftpwa-be.testingnow.me/media/brand/z/a/zara.png',
        name: 'Zara',
        sort_order: 0,
        is_active: 1,
        category_url: 'brands/zara.html',
    },
    {
        attribute_id: 5651,
        logo: 'https://swiftpwa-be.testingnow.me/media/brand/h/m/hm.png',
        name: 'H&M',
        sort_order: 0,
        is_active: 1,
        category_url: 'brands/hm.html',
    },
];

const FeaturedBrands = () => (
    <Carousel title="Featured Brands" data={featured} customItem={ItemFeatured} />
);

export default FeaturedBrands;
