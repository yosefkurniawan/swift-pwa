/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
import Button from '@common_button';
import PriceFormat from '@common_priceformat';
import RatingStar from '@common_ratingstar';
import Banner from '@common_slick/BannerThumbnail';
import Typography from '@common_typography';
import DesktopOptions from '@core_modules/product/pages/default/components/OptionItem/DesktopOptions';
import ItemShare from '@core_modules/product/pages/default/components/SharePopup/item';
import { getSeller } from '@core_modules/theme/services/graphql';
import { getHost } from '@helper_config';
import { useTranslation } from '@i18n';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@plugin_productitem/components/QuickView/style';
import WeltpixelLabel from '@plugin_productitem/components/WeltpixelLabel';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { getPriceFromList } from '@core_modules/product/helpers/getPrice';
import { formatPrice } from '@helper_currency';
import Skeleton from '@material-ui/lab/Skeleton';

const QuickView = (props) => {
    const styles = useStyles();
    const route = useRouter();
    const { t } = useTranslation(['validate', 'common', 'product', 'catalog']);
    const {
        onClose, selectedValue, keyProduct, open, data, weltpixel_labels, storeConfig = {}, dataPrice = [], loadPrice, errorPrice,
    } = props;
    let productKey;
    for (let i = 0; i < data.items.length; i += 1) {
        if (keyProduct === data.items[i].url_key) {
            productKey = [i];
        }
    }

    const product = data && data.items[productKey];

    const reviewValue = parseInt(product?.review?.rating_summary, 0) / 20;

    let enableMultiSeller = false;
    if (storeConfig) {
        enableMultiSeller = storeConfig.enable_oms_multiseller === '1';
    }

    // getSeller gql
    const [actGetSeller, { data: dSeller }] = getSeller();

    React.useEffect(() => {
        if (product) {
            actGetSeller({
                variables: {
                    input: {
                        seller_id: [parseFloat(product.seller_id)],
                    },
                },
            });
        }
    }, [product]);

    let dataSeller;
    let citySplit;
    if (enableMultiSeller && dSeller && dSeller.getSeller) {
        dataSeller = dSeller && dSeller.getSeller;
    }
    if (enableMultiSeller && dataSeller && dataSeller.length > 0) {
        citySplit = dataSeller[0].city?.split(',');
    }

    // generate banner image
    const bannerData = [];
    if (product?.media_gallery?.length > 0) {
        // eslint-disable-next-line array-callback-return
        product.media_gallery.map((media) => {
            bannerData.push({
                link: '#',
                imageUrl: media.url,
            });
        });
    } else {
        bannerData.push({
            link: '#',
            imageUrl: product?.image?.url,
        });
    }

    const [banner, setBanner] = React.useState(bannerData);
    const [price, setPrice] = React.useState({
        priceRange: product.price_range,
        priceTiers: product.price_tiers,
        // eslint-disable-next-line no-underscore-dangle
        productType: product.__typename,
        specialFromDate: product.special_from_date,
        specialToDate: product.special_to_date,
    });
    const [additionalPrice, setAdditionalPrice] = React.useState(0);
    const [stockStatus, setStockStatus] = React.useState(product.stock_status);
    // Customizable Options
    const [customizableOptions, setCustomizableOptions] = React.useState([]);
    const [errorCustomizableOptions, setErrorCustomizableOptions] = React.useState([]);
    const [spesificProduct, setSpesificProduct] = React.useState({});

    const checkCustomizableOptionsValue = async () => {
        if (product.options && product.options.length > 0) {
            const requiredOptions = product.options.filter((op) => op.required);
            if (requiredOptions.length > 0) {
                if (customizableOptions.length > 0) {
                    let countError = 0;
                    const optionsError = [];
                    for (let idx = 0; idx < requiredOptions.length; idx += 1) {
                        const op = requiredOptions[idx];
                        const findValue = customizableOptions.find((val) => val.option_id === op.option_id);
                        if (!findValue) {
                            optionsError.push(op);
                            countError += 1;
                        }
                    }
                    if (countError > 0) {
                        await setErrorCustomizableOptions(optionsError);
                        return false;
                    }
                    return true;
                }
                await setErrorCustomizableOptions(requiredOptions);

                return false;
            }
            return true;
        }
        return true;
    };

    React.useEffect(() => {
        if (errorCustomizableOptions && errorCustomizableOptions.length > 0) {
            // eslint-disable-next-line consistent-return
            const errorCustomizable = errorCustomizableOptions.filter((err) => {
                const findValue = customizableOptions.find((op) => op.option_id === err.option_id);
                return !findValue;
            });
            setErrorCustomizableOptions(errorCustomizable);
        }
    }, [customizableOptions]);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const priceData = getPriceFromList(dataPrice, product.id);
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
                    priceProduct && <PriceFormat isQuickView {...priceProduct} additionalPrice={additionalPrice} />
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
                                price: formatPrice(tiers.final_price.value),
                                discount: tiers.discount.percent_off,
                            };
                            return (
                                <>
                                    {priceTiers.quantity > 1 && (
                                        <Typography variant="p" type="regular" key={index}>
                                            {t('product:priceTiers', { priceTiers })}
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

    return (
        <Dialog scroll="body" onClose={handleClose} fullWidth maxWidth="md" open={open}>
            <div className={styles.modal}>
                <IconButton className={styles.btnClose} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <div className={classNames(styles.container, 'row')}>
                    <div className={classNames(styles.headContainer, 'col-xs-12 col-lg-6')}>
                        <Banner
                            data={banner}
                            noLink
                            thumbnail={false}
                            showArrow
                            autoPlay={false}
                            width={600}
                            height={1120}
                            customClassCaraousel={styles.caraousel}
                            storeConfig={storeConfig}
                        >
                            {storeConfig?.pwa?.label_enable && storeConfig?.pwa?.label_weltpixel_enable && (
                                <WeltpixelLabel t={t} weltpixel_labels={weltpixel_labels} categoryLabel={false} />
                            )}
                        </Banner>
                    </div>
                    <div className={classNames(styles.body, 'col-xs-12 col-lg-6')}>
                        <div className={styles.titleContainer}>
                            <div className={styles.titlePriceContainer}>
                                <Typography
                                    variant="title"
                                    type="bold"
                                    letter="capitalize"
                                    className={classNames(styles.title, 'clear-margin-padding')}
                                >
                                    {product.name}
                                </Typography>
                                {// eslint-disable-next-line no-underscore-dangle
                                    product.__typename !== 'AwGiftCardProduct' && generatePrice(priceData, price)
                                }
                            </div>
                        </div>
                        <div className={styles.titleContainer}>
                            <div className={classNames('row', styles.sku)}>
                                <Typography className="clear-margin-padding" variant="p" type="regular" letter="capitalize">
                                    SKU#:
                                    {' '}
                                </Typography>
                                <Typography variant="p" type="bold" letter="none">
                                    {product.sku || ''}
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
                                    {product.review.reviews_count || 0}
                                    {' '}
                                    {t('product:review')}
                                </Typography>
                            </div>
                        </div>

                        <div className={styles.titleContainer}>
                            {generateTiersPrice(priceData, price)}
                        </div>
                        {enableMultiSeller && dataSeller && dataSeller.length > 0 ? (
                            <div className={styles.titleContainer}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Link href={`/seller/${dataSeller[0].id}`}>
                                            <Avatar alt="Remy Sharp" src={dataSeller[0].logo} className={styles.imageContainer} variant="rounded" />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Link href={`/seller/${dataSeller[0].id}`}>
                                            <Box>
                                                <Typography variant="p" type="bold" letter="capitalize" size="14">
                                                    {dataSeller[0].name}
                                                </Typography>
                                                <Typography variant="p" type="regular" letter="capitalize" size="14">
                                                    {citySplit ? citySplit[0] : ''}
                                                </Typography>
                                            </Box>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : null}
                        <div className="row">
                            {storeConfig?.pwa?.label_enable && storeConfig?.pwa?.label_weltpixel_enable && (
                                <WeltpixelLabel t={t} weltpixel_labels={weltpixel_labels || []} categoryLabel={false} onDetailProduct />
                            )}
                        </div>

                        <div className="hidden-desktop">
                            {' '}
                            <div className={styles.desc}>
                                <Typography variant="span" type="regular" size="10">
                                    {product.short_description.html ? (
                                        <span dangerouslySetInnerHTML={{ __html: product.short_description.html }} />
                                    ) : null}
                                </Typography>
                            </div>
                        </div>
                        <div className="hidden-mobile">
                            <DesktopOptions
                                price={price}
                                t={t}
                                data={product}
                                dataPrice={dataPrice}
                                priceData={priceData}
                                setBanner={setBanner}
                                setPrice={setPrice}
                                setStockStatus={setStockStatus}
                                setAdditionalPrice={setAdditionalPrice}
                                customizableOptions={customizableOptions}
                                setCustomizableOptions={setCustomizableOptions}
                                errorCustomizableOptions={errorCustomizableOptions}
                                checkCustomizableOptionsValue={checkCustomizableOptionsValue}
                                additionalPrice={additionalPrice}
                                handleSelecteProduct={setSpesificProduct}
                            />
                            <Button
                                className={classNames(styles.btnGoToProduct)}
                                color="primary"
                                align="left"
                                onClick={() => route.push(`/${product.url_key}`)}
                            >
                                <Typography align="center" type="bold" letter="uppercase" color="white" variant="inherit">
                                    {t('product:goToProduct')}
                                </Typography>
                            </Button>
                            <div className={styles.desktopShareIcon}>
                                <Typography className={styles.shareTitle} variant="title">
                                    {t('product:shareTitle')}
                                </Typography>
                                <ItemShare link={getHost() + route.asPath} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

QuickView.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default QuickView;
