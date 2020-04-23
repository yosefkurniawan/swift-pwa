import Banner from '@components/Slider/Banner';
import Carousel from '@components/Slider/Carousel';
import Span from '@components/Span';
import SpanProduct from '@components/SpanProduct';
import { useQuery } from '@apollo/react-hooks';
// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import useStyles from './style';

const BannerSlider = ({ storeConfig }) => {
    const styles = useStyles();
    const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;
    const getBannerSlider = gql`
        {
            getHomepageSlider {
                slider_id
                images {
                    image_id
                    image_url
                    mobile_image_url
                    thumb_image_url
                }
            }
        }
    `;

    const { loading, data, error } = useQuery(getBannerSlider);

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

const FeaturedProducts = ({ storeConfig }) => {
    const styles = useStyles();

    const getFeaturedProducts = gql`
        query($url_key: String!) {
            categoryList(filters: { url_key: { eq: $url_key } }) {
                id
                name
                url_key
                image
                products {
                    items {
                        name
                        image {
                            url
                        }
                        thumbnail {
                            url
                        }
                        price_range {
                            minimum_price {
                                regular_price {
                                    value
                                }
                            }
                        }
                    }
                }
                children {
                    id
                    name
                    url_key
                    image
                }
            }
        }
    `;

    const { loading, data, error } = useQuery(getFeaturedProducts, {
        variables: { url_key: 'homepage-featured-products' },
    });

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
            {data.categoryList.image && (
                <Span>
                    <img src={data.categoryList.image} alt="label" />
                </Span>
            )}
            <div className={styles.slider}>
                <Carousel data={products} />
            </div>

            {data.categoryList.map((category) => (
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
        </div>
    );
};

export default HomePage;
