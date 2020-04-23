import Banner from '@components/Slider/Banner';
import Carousel from '@components/Slider/Carousel';
import Span from '@components/Span';
import SpanProduct from '@components/SpanProduct';
import gqlService from './service/graphql';
import useStyles from './style';
import setDefaultWhenEmpty from '../../helpers/checkImageSrc';

const BannerSlider = ({ storeConfig }) => {
    const styles = useStyles();
    const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;
    const { loading, data, error } = gqlService.getBannerSlider();

    if (loading) return <p>Loading . . .</p>;
    if (error) {
        return (
            <p>
                ERROR:
                {error.message}
            </p>
        );
    }
    if (!data) return <p>Not found</p>;

    const bannerImages = data.getHomepageSlider.images.map((image) => ({
        url: image.mobile_image_url || image.image_url,
        link: '/',
    }));
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src={logoUrl} alt="logo" className={styles.imgLogo} />
            </div>
            {bannerImages && bannerImages.length && (
                <Banner data={bannerImages} height="95vh" />
            )}
        </div>
    );
};

const FeaturedProducts = () => {
    const styles = useStyles();
    const { loading, data, error } = gqlService.getCategoryList(
        { url_key: 'homepage-featured-products' },
    );

    if (loading) return <p>Loading . . .</p>;
    if (error) {
        return (
            <p>
                ERROR:
                {error.message}
            </p>
        );
    }
    if (!data) return <p>Not found</p>;

    const products = data.categoryList[0].products.items.map((product) => ({
        ...product,
        name: product.name,
        link: product.url_key,
        imageSrc: product.image.url,
        price: product.price_range.minimum_price.regular_price.value,
    }));

    return (
        <>
            <Span>
                <img src={setDefaultWhenEmpty(data.categoryList.image)} alt="label" style={{ maxHeight: '100%' }} />
            </Span>
            <div className={styles.slider}>
                <Carousel data={products} />
            </div>
        </>
    );
};

const CategoryList = ({ storeConfig }) => {
    const styles = useStyles();
    const { loading, data, error } = gqlService.getCategoryList(
        { url_key: 'homepage-featured-categories' },
    );

    if (loading) return <p>Loading . . .</p>;
    if (error) {
        return (
            <p>
                ERROR:
                {error.message}
            </p>
        );
    }
    if (!data) return <p>Not found</p>;

    return (
        <>
            {data.categoryList[0].children.map((category) => (
                <div className={styles.slider}>
                    <SpanProduct
                        storeConfig={storeConfig}
                        imageSrc={category.image}
                        name={category.name}
                        description={category.description}
                    />
                </div>
            ))}
        </>
    );
};

const HomePage = ({ storeConfig }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <BannerSlider storeConfig={storeConfig} />
            <FeaturedProducts storeConfig={storeConfig} />
            <CategoryList storeConfig={storeConfig} />
        </div>
    );
};

export default HomePage;
