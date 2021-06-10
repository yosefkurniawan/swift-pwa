/* eslint-disable react/no-danger */
/* eslint-disable array-callback-return */
import Button from '@common_button';
import PriceFormat from '@common_priceformat';
import Banner from '@common_slick/BannerThumbnail';
// import Caraousel from '@common_slick/Caraousel';
// import CarouselSkeleton from '@common_slick/Caraousel/Skeleton';
import Typography from '@common_typography';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import classNames from 'classnames';
import React from 'react';
import { getHost } from '@helper_config';
import Breadcrumb from '@common_breadcrumb';
import RatingStar from '@common_ratingstar';
import Thumbor from '@common_image';
import { breakPointsUp } from '@helper_theme';
import dynamic from 'next/dynamic';
import useStyles from '@core_modules/product/pages/default/components/style';
import ExpandDetail from '@core_modules/product/pages/default/components/ExpandDetail';
import ListReviews from '@core_modules/product/pages/default/components/ListReviews';
import OptionItem from '@core_modules/product/pages/default/components/OptionItem';
import SharePopup from '@core_modules/product/pages/default/components/SharePopup';
import ModalPopupImage from '@core_modules/product/pages/default/components/ModalPopupImage';
import { modules } from '@config';

const DesktopOptions = dynamic(() => import('@core_modules/product/pages/default/components/OptionItem/DesktopOptions'), { ssr: true });
const TabsView = dynamic(() => import('@core_modules/product/pages/default/components/DesktopTabs'), { ssr: true });
const ItemShare = dynamic(() => import('@core_modules/product/pages/default/components/SharePopup/item'), { ssr: true });
const WeltpixelLabel = dynamic(() => import('@plugin_productitem/components/WeltpixelLabel'), { ssr: false });
const UpsellDrawer = dynamic(() => import('@core_modules/product/pages/default/components/RightDrawer'), { ssr: false });
const RelatedProductCaraousel = dynamic(() => import('@core_modules/product/pages/default/components/RelatedProductCaraousel'), { ssr: false });

const ProductPage = (props) => {
    const styles = useStyles();
    const {
        t,
        data,
        openOption,
        handleOption,
        setOpenOption,
        setBanner,
        setPrice,
        openShare,
        setOpenShare,
        route,
        banner,
        openDrawer,
        setOpenDrawer,
        breadcrumbsData,
        price,
        handleWishlist,
        reviewValue,
        wishlist,
        expandData,
        openImageDetail,
        handleOpenImageDetail,
        stockStatus,
        additionalPrice,
        smartProductTabs,
    } = props;
    const desktop = breakPointsUp('sm');

    const bannerLiteData = data.banners_data.filter(((item) => item.banner_image !== null));
    const bannerLiteObj = {
        top: null,
        after: null,
        label: null,
    };

    bannerLiteData.forEach((bannerLite) => {
        const bannerImg = JSON.parse(bannerLite.banner_image);

        if (bannerLite.banner_type === '0') {
            bannerLiteObj.top = {
                ...bannerLite,
                banner_image: bannerImg[0].url,
            };
        } else if (bannerLite.banner_type === '1') {
            bannerLiteObj.after = {
                ...bannerLite,
                banner_image: bannerImg[0].url,
            };
        } else if (bannerLite.banner_type === '2') {
            bannerLiteObj.label = {
                ...bannerLite,
                banner_image: bannerImg[0].url,
            };
        }
    });

    const favoritIcon = wishlist ? <Favorite className={styles.iconShare} /> : <FavoriteBorderOutlined className={styles.iconShare} />;

    return (
        <>
            <div className="hidden-mobile">
                <UpsellDrawer
                    open={openDrawer}
                    setOpen={() => setOpenDrawer(!openDrawer)}
                    t={t}
                    dataProduct={data}
                />
                <ModalPopupImage open={openImageDetail} setOpen={handleOpenImageDetail} banner={banner} />
            </div>
            <OptionItem {...props} open={openOption} setOpen={() => setOpenOption(!openOption)} setBanner={setBanner} setPrice={setPrice} />
            <SharePopup open={openShare} setOpen={() => setOpenShare(!openShare)} link={getHost() + route.asPath} {...props} />
            <div className={classNames(styles.container, 'row')}>
                <div className="col-lg-12 hidden-mobile">
                    <Breadcrumb data={breadcrumbsData} variant="text" />
                </div>
                {bannerLiteObj.top && (
                    <div className="col-lg-12">
                        <a href={bannerLiteObj.top.banner_link}>
                            <Thumbor src={bannerLiteObj.top.banner_image} alt={bannerLiteObj.top.banner_alt} width={1175} height={424} lazy />
                        </a>
                    </div>
                )}

                <div className={classNames(styles.headContainer, 'col-xs-12 col-lg-6')}>
                    {
                        modules.catalog.productListing.label.enabled
                        && modules.catalog.productListing.label.weltpixel.enabled && (
                            <WeltpixelLabel t={t} weltpixel_labels={data.weltpixel_labels || []} categoryLabel={false} />
                        )
                    }
                    {bannerLiteObj.label && (
                        <div className="col-lg-12">
                            <div className={styles.bannerLiteLabel}>
                                <Thumbor src={bannerLiteObj.label.banner_image} alt={bannerLiteObj.label.banner_alt} width={1175} height={424} lazy />
                            </div>
                        </div>
                    )}
                    <Banner
                        data={banner}
                        noLink
                        thumbnail
                        showArrow
                        contentWidth="auto"
                        autoPlay={false}
                        width={960}
                        height={1120}
                        actionImage={desktop ? handleOpenImageDetail : () => { }}
                        customProduct={styles.bannerProduct}
                    />
                    <div className="hidden-desktop">
                        <UpsellDrawer
                            open={openDrawer}
                            setOpen={() => setOpenDrawer(!openDrawer)}
                            t={t}
                            dataProduct={data}
                        />
                    </div>
                </div>
                <div className={classNames(styles.body, 'col-xs-12 col-lg-6')}>
                    <div className={classNames(styles.titleContainer, 'hidden-desktop')}>
                        <Breadcrumb data={breadcrumbsData} variant="text" />
                    </div>

                    <div className={styles.titleContainer}>
                        <div className={styles.titlePriceContainer}>
                            <Typography variant="title" type="bold" letter="capitalize" className={classNames(styles.title, 'clear-margin-padding')}>
                                {data.name}
                            </Typography>
                            <PriceFormat {...price} additionalPrice={additionalPrice} />
                        </div>
                        <div className={styles.shareContainer}>
                            <IconButton className={styles.btnShare} onClick={handleWishlist}>
                                {favoritIcon}
                            </IconButton>
                            <div className="hidden-desktop">
                                <IconButton className={classNames(styles.btnShare, 'hidden-desktop')} onClick={() => setOpenShare(true)}>
                                    <ShareOutlined className={styles.iconShare} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className={styles.titleContainer}>
                        <div className={classNames('row', styles.sku)}>
                            <Typography className="clear-margin-padding" variant="p" type="regular" letter="capitalize">
                                SKU#:
                                {' '}
                            </Typography>
                            <Typography variant="p" type="bold" letter="none">
                                {data.sku || ''}
                            </Typography>
                        </div>
                        <Typography variant="p" type="bold" letter="uppercase">
                            {stockStatus.replace(/_/g, ' ') || ''}
                        </Typography>
                    </div>

                    <div className={styles.titleContainer}>
                        <div className={styles.ratingContainer}>
                            <RatingStar value={reviewValue || 0} />
                            <Typography variant="p" type="regular" letter="capitalize">
                                {data.review.reviews_count || 0}
                                {' '}
                                {t('product:review')}
                            </Typography>
                        </div>
                    </div>
                    <div className="row">
                        {
                            modules.catalog.productListing.label.enabled
                            && modules.catalog.productListing.label.weltpixel.enabled && (
                                <WeltpixelLabel
                                    t={t}
                                    weltpixel_labels={data.weltpixel_labels || []}
                                    categoryLabel={false}
                                    onDetailProduct
                                />
                            )
                        }
                    </div>

                    <div className="hidden-desktop">
                        {' '}
                        <div className={styles.desc}>
                            <Typography variant="span" type="regular" size="10">
                                {data.short_description.html ? <span dangerouslySetInnerHTML={{ __html: data.short_description.html }} /> : null}
                            </Typography>
                        </div>
                        <div>
                            <ExpandDetail data={expandData} smartProductTabs={smartProductTabs} />
                        </div>
                    </div>
                    <div className="hidden-mobile">
                        <DesktopOptions {...props} setOpen={setOpenOption} setBanner={setBanner} setPrice={setPrice} bannerLite={bannerLiteObj} />
                        <div className={styles.desktopShareIcon}>
                            <Typography className={styles.shareTitle} variant="title">
                                {t('product:shareTitle')}
                            </Typography>
                            <ItemShare link={getHost() + route.asPath} />
                        </div>
                    </div>
                </div>
                <div className="hidden-desktop">
                    <ListReviews {...props} />
                </div>
                <div className={classNames(styles.tabs, 'col-xs-12 col-lg-12 hidden-mobile')}>
                    <TabsView
                        {...props}
                        dataInfo={expandData}
                        smartProductTabs={smartProductTabs || {
                            tab_2: {
                                label: null,
                                content: null,
                            },
                        }}
                    />
                </div>
                <RelatedProductCaraousel t={t} dataProduct={data} />
                <div className={classNames(styles.footer, 'hidden-desktop')}>
                    <Button
                        className={styles.btnAddToCard}
                        color="primary"
                        onClick={handleOption}
                        disabled={data && data.stock_status === 'OUT_STOCK'}
                    >
                        <Typography variant="span" align="center" type="bold" letter="uppercase" color="white">
                            {t('product:addToCart')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
