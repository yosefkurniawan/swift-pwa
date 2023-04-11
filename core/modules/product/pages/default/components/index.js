/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
/* eslint-disable react/no-danger */
/* eslint-disable array-callback-return */
import Breadcrumb from '@common_breadcrumb';
import Typography from '@common_typography';
import { features, modules } from '@config';
import ListReviews from '@core_modules/product/pages/default/components/ListReviews';
import ModalPopupImage from '@core_modules/product/pages/default/components/ModalPopupImage';
import OptionItem from '@core_modules/product/pages/default/components/OptionItem';
import SharePopup from '@core_modules/product/pages/default/components/SharePopup';
import useStyles from '@core_modules/product/pages/default/components/style';
import { getProductBannerLite } from '@core_modules/product/services/graphql';
import { getHost } from '@helper_config';
import { formatPrice } from '@helper_currency';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import Link from '@material-ui/core/Link';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { getPriceFromList } from '@core_modules/product/helpers/getPrice';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const Button = dynamic(() => import('@common_button'), { ssr: true });
const Banner = dynamic(() => import('@common_slick/BannerThumbnail'), { ssr: true });
const DesktopOptions = dynamic(() => import('@core_modules/product/pages/default/components/OptionItem/DesktopOptions'), { ssr: true });
const ExpandDetail = dynamic(() => import('@core_modules/product/pages/default/components/ExpandDetail'), { ssr: false });
const TabsView = dynamic(() => import('@core_modules/product/pages/default/components/DesktopTabs'), { ssr: false });
const PriceFormat = dynamic(() => import('@common_priceformat'), { ssr: false });
const RatingStar = dynamic(() => import('@common_ratingstar'), { ssr: true });
const ItemShare = dynamic(() => import('@core_modules/product/pages/default/components/SharePopup/item'), { ssr: false });
const WeltpixelLabel = dynamic(() => import('@plugin_productitem/components/WeltpixelLabel'), { ssr: false });
const UpsellDrawer = dynamic(() => import('@core_modules/product/pages/default/components/RightDrawer'), { ssr: false });
const RelatedProductCaraousel = dynamic(() => import('@core_modules/product/pages/default/components/RelatedProductCaraousel'), { ssr: false });
const PromoBannersLite = dynamic(() => import('@core_modules/product/pages/default/components/PromoBannersLite'), { ssr: false });

// CHAT FEATURES IMPORT

const ChatContent = dynamic(() => import('@core_modules/customer/plugins/ChatPlugin'), { ssr: false });

// END CHAT FEATURES IMPORT

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
        selectedImgIdx,
        stockStatus,
        additionalPrice,
        smartProductTabs,
        isLogin,
        handleSetCompareList,
        enablePopupImage,
        enableMultiSeller,
        storeConfig,
        loadPrice,
        dataPrice = [],
        errorPrice,
        handleChat,
        showChat,
        dataSeller,
        currencyCache,
    } = props;

    const context = isLogin && isLogin === 1 ? { request: 'internal' } : {};
    const [getBannerLite, bannerLiteResult] = getProductBannerLite(route.asPath.slice(1), { context });

    let citySplit;
    if (enableMultiSeller && dataSeller && dataSeller.length > 0) {
        citySplit = dataSeller[0].city?.split(',');
    }

    React.useEffect(() => {
        getBannerLite();
    }, [bannerLiteResult.called]);

    let bannerLiteData = [];
    if (
        bannerLiteResult
        && bannerLiteResult.data
        && bannerLiteResult.data.products.items
        && bannerLiteResult.data.products.items.length > 0
        && bannerLiteResult.data.products.items[0].banners_data
    ) {
        bannerLiteData = bannerLiteResult.data.products.items[0].banners_data;
    }
    const bannerLiteObj = {
        top: bannerLiteData.filter((bannerLite) => bannerLite.banner_type === '0') || [],
        after: bannerLiteData.filter((bannerLite) => bannerLite.banner_type === '1') || [],
        label: bannerLiteData.filter((bannerLite) => bannerLite.banner_type === '2') || [],
    };

    const [spesificProduct, setSpesificProduct] = React.useState({});
    const priceData = getPriceFromList(dataPrice, data.id);
    const generatePrice = (priceDataItem, priceItem) => {
        // handle if loading price
        if (loadPrice) {
            return (
                <div>
                    <Skeleton variant="text" width={100} />
                    {' '}
                </div>
            );
        }

        let priceProduct = priceItem;
        // handle if have an update price state
        if (priceItem && priceItem.update) {
            priceProduct = priceItem;
        }
        if (priceDataItem.length > 0 && !loadPrice && !errorPrice && !priceItem.update) {
            priceProduct = {
                priceRange: spesificProduct.price_range ? spesificProduct.price_range : priceDataItem[0].price_range,
                priceTiers: spesificProduct.price_tiers ? spesificProduct.price_tiers : priceDataItem[0].price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: priceDataItem[0].__typename,
                specialFromDate: priceDataItem[0].special_from_date,
                specialToDate: priceDataItem[0].special_to_date,
            };
        }
        return (
            <>
                {
                    priceProduct && <PriceFormat isPdp {...priceProduct} additionalPrice={additionalPrice} />
                }
            </>
        );
    };

    const generateTiersPrice = (priceDataItem, priceItem) => {
        // handle if loading price
        if (loadPrice) {
            return (
                <div>
                    <Skeleton variant="text" width={100} />
                    {' '}
                </div>
            );
        }

        let priceProduct = priceItem;
        if (priceDataItem.length > 0 && !loadPrice && !errorPrice) {
            priceProduct = {
                priceRange: spesificProduct.price_range ? spesificProduct.price_range : priceDataItem[0].price_range,
                priceTiers: spesificProduct.price_tiers ? spesificProduct.price_tiers : priceDataItem[0].price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: priceDataItem[0].__typename,
                specialFromDate: priceDataItem[0].special_from_date,
                specialToDate: priceDataItem[0].special_to_date,
            };
        }
        return (
            <div className={styles.titleContainer}>
                <div className={styles.priceTiersContainer}>
                    {
                        priceProduct.priceTiers.length > 0 && priceProduct.priceTiers.map((tiers, index) => {
                            const priceTiers = {
                                quantity: tiers.quantity,
                                currency: tiers.final_price.currency,
                                price: tiers.final_price.value,
                                discount: tiers.discount.percent_off,
                            };
                            return (
                                <>
                                    {priceTiers.quantity > 1 && (
                                        <Typography variant="p" type="regular" key={index}>
                                            {t('product:priceTiers', { priceTiers })}
                                            {' '}
                                            {formatPrice(priceTiers.price, priceTiers.currency, currencyCache)}
                                        </Typography>
                                    )}
                                </>
                            );
                        })
                    }
                </div>
            </div>
        );
    };

    const favoritIcon = wishlist ? <Favorite className={styles.iconShare} /> : <FavoriteBorderOutlined className={styles.iconShare} />;
    return (
        <>
            <div className="hidden-mobile">
                <UpsellDrawer
                    open={openDrawer}
                    setOpen={() => setOpenDrawer(!openDrawer)}
                    t={t}
                    dataProduct={data}
                    isLogin={isLogin}
                    storeConfig={storeConfig}
                />
            </div>
            {enablePopupImage && (
                <ModalPopupImage
                    open={openImageDetail}
                    setOpen={handleOpenImageDetail}
                    banner={banner}
                    selectedImgIdx={selectedImgIdx}
                    storeConfig={storeConfig}
                />
            )}
            <OptionItem
                {...props}
                open={openOption}
                setOpen={() => setOpenOption(!openOption)}
                setBanner={setBanner}
                setPrice={setPrice}
                handleSelecteProduct={setSpesificProduct}
            />
            <SharePopup open={openShare} setOpen={() => setOpenShare(!openShare)} link={getHost() + route.asPath} {...props} />
            <div className={classNames(styles.container, 'row')}>
                <div className="col-lg-12 hidden-mobile">
                    <Breadcrumb data={breadcrumbsData} variant="text" />
                </div>

                {bannerLiteObj.top
                    && bannerLiteObj.top.length > 0
                    && bannerLiteObj.top.map((topBanner) => (
                        <PromoBannersLite
                            type="top"
                            key={topBanner.entity_id}
                            classes={classNames(styles.bannerLiteTop, 'col-xs-12')}
                            src={topBanner.banner_link}
                            imgSrc={topBanner.banner_image}
                            alt={topBanner.banner_alt}
                            storeConfig={storeConfig}
                        />
                    ))}

                <div className={classNames(styles.headContainer, 'col-xs-12 col-lg-6')}>
                    {bannerLiteObj.top
                        && bannerLiteObj.top.length > 0
                        && bannerLiteObj.top.map((topBanner) => (
                            <PromoBannersLite
                                type="top"
                                key={topBanner.entity_id}
                                classes={classNames(styles.bannerLiteTopMobile, 'col-xs-12')}
                                src={topBanner.banner_link}
                                imgSrc={topBanner.banner_image}
                                alt={topBanner.banner_alt}
                                storeConfig={storeConfig}
                            />
                        ))}
                    <div className="row">
                        {bannerLiteObj.label
                            && bannerLiteObj.label.length > 0
                            && bannerLiteObj.label.map((labelBanner) => (
                                <PromoBannersLite
                                    type="label"
                                    key={labelBanner.entity_id}
                                    classes={classNames(styles.bannerLiteLabel, 'col-xs-6')}
                                    imgSrc={labelBanner.banner_image}
                                    alt={labelBanner.banner_alt}
                                    storeConfig={storeConfig}
                                />
                            ))}
                    </div>
                    <Banner
                        data={banner}
                        noLink
                        thumbnail
                        showArrow
                        contentWidth="auto"
                        autoPlay={false}
                        width={960}
                        height={1120}
                        actionImage={enablePopupImage ? handleOpenImageDetail : () => {}}
                        customProduct={styles.bannerProduct}
                        storeConfig={storeConfig}
                    >
                        {storeConfig?.pwa?.label_enable && storeConfig?.pwa?.label_weltpixel_enable && (
                            <WeltpixelLabel t={t} weltpixel_labels={data.weltpixel_labels || []} categoryLabel={false} withThumbnailProduct />
                        )}
                    </Banner>
                    <div className="hidden-desktop">
                        <UpsellDrawer open={openDrawer} setOpen={() => setOpenDrawer(!openDrawer)} t={t} dataProduct={data} isLogin={isLogin} />
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
                            {// eslint-disable-next-line no-underscore-dangle
                                data.__typename !== 'AwGiftCardProduct' && generatePrice(priceData, price)
                            }
                        </div>
                        <div className={styles.shareContainer}>
                            {modules.productcompare.enabled && (
                                <div className="hidden-desktop">
                                    <IconButton className={styles.btnShare} onClick={() => handleSetCompareList(data.id)}>
                                        <CompareArrowsIcon color="primary" />
                                    </IconButton>
                                </div>
                            )}
                            <IconButton className={styles.btnShare} onClick={handleWishlist}>
                                {favoritIcon}
                            </IconButton>
                            {/* CHAT FEATURES ON MOBILE */}
                            {features.chatSystem.enable && (
                                <div className="hidden-desktop">
                                    {isLogin === 1 ? (
                                        <>
                                            {showChat ? (
                                                <ChatContent
                                                    isPdp
                                                    handleChatPdp={handleChat}
                                                    agentSellerCode={dataSeller[0].id}
                                                    agentSellerName={dataSeller[0].name}
                                                    sellerMessage={`${getHost() + route.asPath} - ${data.name}`}
                                                />
                                            ) : (
                                                <IconButton className={classNames(styles.btnShare, 'hidden-desktop')} onClick={handleChat}>
                                                    <ChatIcon className={styles.iconShare} />
                                                </IconButton>
                                            )}
                                        </>
                                    ) : (
                                        <IconButton className={classNames(styles.btnShare, 'hidden-desktop')} onClick={handleChat}>
                                            <ChatIcon className={styles.iconShare} />
                                        </IconButton>
                                    )}
                                </div>
                            )}
                            {/* END CHAT FEATURES ON MOBILE */}
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
                    {enableMultiSeller && dataSeller && dataSeller.length > 0 ? (
                        <div className={styles.titleContainer}>
                            <div className={styles.sellerContainer}>
                                <Link href={`/seller/${dataSeller[0].id}`}>
                                    <div className={styles.imageContainer}>
                                        <Avatar alt={dataSeller[0].name} src={dataSeller[0].logo} className={styles.sellerLogo} variant="rounded" />
                                    </div>
                                </Link>
                                <Link href={`/seller/${dataSeller[0].id}`}>
                                    <div>
                                        <Typography variant="p" type="bold" letter="capitalize" size="14">
                                            {dataSeller[0].name}
                                        </Typography>
                                        <Typography variant="p" type="regular" letter="capitalize" size="14">
                                            {citySplit ? citySplit[0] : ''}
                                        </Typography>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ) : null}

                    <div className={styles.titleContainer}>
                        {generateTiersPrice(priceData, price)}
                    </div>

                    <div className="row">
                        {storeConfig?.pwa?.label_enable && storeConfig?.pwa?.label_weltpixel_enable && (
                            <WeltpixelLabel t={t} weltpixel_labels={data.weltpixel_labels || []} categoryLabel={false} onDetailProduct />
                        )}
                    </div>

                    <div className="hidden-desktop">
                        <div className={styles.desc}>
                            <Typography variant="span" type="regular" size="10">
                                {data.short_description.html ? <span dangerouslySetInnerHTML={{ __html: data.short_description.html }} /> : null}
                            </Typography>
                        </div>
                        <div>
                            <ExpandDetail data={expandData} smartProductTabs={smartProductTabs} />
                        </div>
                        <div className="row">
                            {bannerLiteObj.after
                                && bannerLiteObj.after.length > 0
                                && bannerLiteObj.after.map((afterBanner) => (
                                    <PromoBannersLite
                                        type="after"
                                        key={afterBanner.entity_id}
                                        classes={classNames(styles.bannerLiteAfter, 'col-xs-6')}
                                        src={bannerLiteObj.after.banner_link}
                                        imgSrc={afterBanner.banner_image}
                                        alt={afterBanner.banner_alt}
                                        storeConfig={storeConfig}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="hidden-mobile">
                        <DesktopOptions
                            {...props}
                            setOpen={setOpenOption}
                            setBanner={setBanner}
                            setPrice={setPrice}
                            priceData={priceData}
                            handleSelecteProduct={setSpesificProduct}
                        />

                        <div className="row">
                            {bannerLiteObj.after
                                && bannerLiteObj.after.length > 0
                                && bannerLiteObj.after.map((afterBanner) => (
                                    <PromoBannersLite
                                        type="after"
                                        key={afterBanner.entity_id}
                                        classes={classNames(styles.bannerLiteAfter, 'col-xs-6')}
                                        src={bannerLiteObj.after.banner_link}
                                        imgSrc={afterBanner.banner_image}
                                        alt={afterBanner.banner_alt}
                                        storeConfig={storeConfig}
                                    />
                                ))}
                        </div>

                        <div className={styles.desktopShareIcon}>
                            <Typography className={styles.shareTitle} variant="p">
                                {t('product:shareTitle')}
                            </Typography>
                            <div className={modules.productcompare.enabled && styles.rowItem}>
                                <div className={styles.itemShare}>
                                    <ItemShare link={getHost() + route.asPath} />
                                </div>
                                <div className={styles.compareChat}>
                                    {modules.productcompare.enabled && (
                                        <Button className={styles.btnCompare} color="primary" onClick={() => handleSetCompareList(data.id)}>
                                            <CompareArrowsIcon color="inherit" style={{ fontSize: '18px' }} />
                                        </Button>
                                    )}
                                    {/* CHAT FEATURES ON DESKTOP */}
                                    {features.chatSystem.enable && (
                                        <>
                                            {isLogin === 1 ? (
                                                <>
                                                    {showChat ? (
                                                        <ChatContent
                                                            isPdp
                                                            handleChatPdp={handleChat}
                                                            agentSellerCode={dataSeller[0].id}
                                                            agentSellerName={dataSeller[0].name}
                                                            sellerMessage={`${getHost() + route.asPath} - ${data.name}`}
                                                        />
                                                    ) : (
                                                        <Button className={styles.btnChat} color="primary" onClick={handleChat}>
                                                            <ChatIcon color="inherit" style={{ fontSize: '18px' }} />
                                                        </Button>
                                                    )}
                                                </>
                                            ) : (
                                                <Button className={styles.btnChat} color="primary" onClick={handleChat}>
                                                    <ChatIcon className={styles.btnChat} color="inherit" style={{ fontSize: '18px' }} />
                                                </Button>
                                            )}
                                        </>
                                    )}
                                    {/* END CHAT FEATURES ON DESKTOP */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.desc}>
                            <Typography variant="span" type="regular" size="10">
                                {data.short_description.html ? <span dangerouslySetInnerHTML={{ __html: data.short_description.html }} /> : null}
                            </Typography>
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
                        smartProductTabs={
                            smartProductTabs || {
                                tab_2: {
                                    label: null,
                                    content: null,
                                },
                            }
                        }
                    />
                </div>
                <RelatedProductCaraousel t={t} dataProduct={data} isLogin={isLogin} storeConfig={storeConfig} />
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
