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
        img: image.mobile_image_url || image.image_url,
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
                    }
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

    return (
        <>
            {data.categoryList.image && (
                <Span>
                    <img src={data.categoryList.image} alt="label" />
                </Span>
            )}
            <div className={styles.slider}>
                <Carousel data={data.categoryList[0].products.items} />
            </div>
        </>
    );
};

const HomePage = ({ storeConfig }) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <BannerSlider storeConfig={storeConfig} />
            <FeaturedProducts />

            <div className={styles.slider}>
                <SpanProduct storeConfig={storeConfig} />
            </div>
            <div className={styles.slider}>
                <SpanProduct storeConfig={storeConfig} />
            </div>
        </div>
    );
};

export default HomePage;
