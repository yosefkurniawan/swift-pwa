/* eslint-disable consistent-return */
import CarouselSkeleton from '@components/Slider/Carousel/Skeleton';
import { Fragment } from 'react';
import Link from 'next/link';
import Skeleton from '@components/Skeleton';
import Grid from '@material-ui/core/Grid';
import { imageSize } from '@config';
import dynamic from 'next/dynamic';
import gqlService from './service/graphql';
import useStyles from './style';
import Thumbor from '../../components/Image';

const Banner = dynamic(() => import('@components/Slider/Banner'));
const Carousel = dynamic(() => import('@components/Slider/Carousel'));
const SpanCategory = dynamic(() => import('@components/SpanCategory'));
const Alert = dynamic(() => import('@material-ui/lab/Alert'));

const BannerSliderSkeleteon = () => {
    const styles = useStyles();
    return (
        <div className={styles.skeletonWrapper}>
            <Skeleton
                variant="rect"
                animation="wave"
                xsStyle={{ width: '100%', height: '60vw' }}
                mdStyle={{ width: '100%', height: '577px' }}
            />
        </div>
    );
};

const BannerSlider = ({ storeConfig, t }) => {
    const styles = useStyles();
    const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;
    const { loading, data, error } = gqlService.getBannerSlider();

    if (loading && !data) {
        return <BannerSliderSkeleteon />;
    }
    if (error) {
        return (
            <div className={styles.divMessage}>
                <Alert className="m-15" severity="error">{t('home:errorFetchData')}</Alert>
            </div>
        );
    }
    if (!data || data.getHomepageSlider.images.length === 0) {
        return (
            <div className={styles.divMessage}>
                <Alert className="m-15" severity="warning">{t('home:nullData')}</Alert>
            </div>
        );
    }

    if (data && data.getHomepageSlider) {
        const bannerImages = data.getHomepageSlider.images.map((image) => ({
            imageUrl: image.mobile_image_url || image.image_url,
            link: image.url_redirection,
        }));

        return (
            <>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <img src={logoUrl} alt="logo" className={styles.imgLogo} />
                    </div>
                    {bannerImages && bannerImages.length && <Banner data={bannerImages} />}
                </div>
            </>
        );
    }
};

const FeaturedProducts = ({ t }) => {
    const styles = useStyles();
    const { loading, data, error } = gqlService.getFeaturedProducts({
        url_key: 'homepage-featured-products',
    });

    if (loading && !data) return <CarouselSkeleton />;
    if (error) {
        return (
            <div className={styles.divMessage}>
                <Alert className="m-15" severity="error">{t('home:errorFetchData')}</Alert>
            </div>
        );
    }
    if (!data || data.categoryList.length === 0) {
        return (
            <div className={styles.divMessage}>
                <Alert className="m-15" severity="warning">{t('home:nullData')}</Alert>
            </div>
        );
    }

    if (!loading && data && data.categoryList.length > 0) {
        return (
            <>
                {data.categoryList[0].children.map((category, i) => {
                    const products = category.products.items.map((product) => ({
                        ...product,
                        name: product.name,
                        url: product.url_key,
                        imageSrc: product.small_image.url,
                        price: product.price_range.minimum_price.regular_price.value,
                    }));
                    return (
                        <Fragment key={i}>
                            {category.image_path && (
                                <Link
                                    href="[...slug]"
                                    as={category.url_path}

                                >
                                    <a style={{
                                        width: '100%',
                                        maxWidth: '100%',
                                        height: 'auto',
                                    }}
                                    >
                                        <Thumbor
                                            src={category.image_path}
                                            alt={category.name}
                                            style={{
                                                width: '100%',
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                            }}
                                            width={imageSize.category.width}
                                            height={imageSize.category.height}
                                            quality={80}
                                        />
                                    </a>
                                </Link>
                            )}
                            <div className={styles.slider}>
                                <Carousel data={products} />
                            </div>
                        </Fragment>
                    );
                })}
            </>
        );
    }
};

const CategoryListSkeleteon = () => {
    const styles = useStyles();
    return (
        <div className={styles.skeletonWrapper}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Skeleton
                    className={styles.skeleton}
                    variant="rect"
                    width="100%"
                    xsStyle={{ height: '60vw' }}
                    mdStyle={{ height: '577px' }}
                    animation="wave"
                />
                <Skeleton className={styles.skeleton} style={{ alignSelf: 'center' }} variant="rect" width="35%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="75%" height={10} animation="wave" />
            </Grid>
        </div>
    );
};

const CategoryList = ({ storeConfig, t }) => {
    const styles = useStyles();
    const { loading, data, error } = gqlService.getCategoryList({
        url_key: 'homepage-featured-categories',
    });

    if (loading && !data) return <CategoryListSkeleteon />;
    if (error) {
        return (
            <div className={styles.divMessage}>
                <Alert className="m-15" severity="error">{error.message.split(':')[1] || t('home:errorFetchData')}</Alert>
            </div>
        );
    }
    if (!data || data.categoryList.length === 0) {
        return (
            <div className={styles.divMessage}>
                <Alert className="m-15" severity="warning">{t('home:nullData')}</Alert>
            </div>
        );
    }

    if (!loading && data && data.categoryList.length > 0) {
        return (
            <>
                {data.categoryList[0].children.map((category, i) => (
                    <div className={styles.slider} key={i}>
                        <SpanCategory
                            storeConfig={storeConfig}
                            imageSrc={category.image_path}
                            name={category.name}
                            description={category.description}
                            url={category.url_path}
                        />
                    </div>
                ))}
            </>
        );
    }
};

const HomePage = ({ storeConfig, t }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <BannerSlider storeConfig={storeConfig} t={t} />
            <FeaturedProducts storeConfig={storeConfig} t={t} />
            <CategoryList storeConfig={storeConfig} t={t} />
        </div>
    );
};

export default HomePage;
