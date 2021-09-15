/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import PriceFormat from '@common_priceformat';
import RatingStar from '@common_ratingstar';
import { features, modules } from '@config';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import { useProduct } from '@core_modules/cms/components/cms-renderer/magezon/MagezonProductList/helpers/useProduct';
import Button from '@core_modules/commons/Button';
import Typography from '@core_modules/commons/Typography';
import OptionItem from '@core_modules/product/plugins/OptionItem';
import { useTranslation } from '@i18n';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import { generateThumborUrl } from '@root/core/helpers/image';
import Link from 'next/link';

const CustomButton = (props) => {
    const { t, styles, handleClick } = props;

    return (
        <Button className={styles.btnAddToCard} onClick={handleClick}>
            <Typography align="center" type="bold" letter="uppercase" color="white" variant="inherit">
                {t('product:addToCart')}
            </Typography>
        </Button>
    );
};

const SingleProduct = (props) => {
    // prettier-ignore
    const {
        product, product_display,
        product_addtocart, product_compare, product_shortdescription,
        product_image, product_price, product_review,
        product_swatches, product_wishlist, product_name,
    } = props;
    const isGrid = product_display && product_display === 'grid';
    const { t } = useTranslation();
    // prettier-ignore
    const {
        name, url_key, id, __typename, review_count,
        short_description, small_image,
    } = product;
    // prettier-ignore
    const {
        styles, wishlist,
        price, setPrice,
        handleAddtowishlist, handleClick, handleSetCompareList,
    } = useProduct({ product, t });

    const favoritIcon = wishlist ? <Favorite className={styles.iconShare} /> : <FavoriteBorderOutlined className={styles.iconShare} />;

    return (
        <>
            <Grid container direction={isGrid ? 'column' : 'row'} alignItems={isGrid ? 'center' : 'stretch'} className="mgz-single-product-card">
                {product_image && (
                    <Grid item xs={isGrid ? 6 : 3} container justify="center">
                        <div onClick={handleClick} style={{ width: features.imageSize.product.width, maxWidth: '100%' }}>
                            <img
                                data-pagespeed-no-defer
                                src={generateThumborUrl(small_image.url, features.imageSize.product.width, features.imageSize.product.height)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/assets/img/placeholder.png';
                                }}
                                alt="mediaimage"
                            />
                        </div>
                    </Grid>
                )}
                <Grid item xs container direction="column" alignItems={isGrid ? 'center' : 'stretch'}>
                    {product_name && (
                        <Grid item>
                            <Typography variant="h4">{name}</Typography>
                        </Grid>
                    )}
                    {product_review && (
                        <Grid item container justify={isGrid ? 'center' : 'flex-start'}>
                            <RatingStar value={review_count} />
                            <Typography variant="p" type="regular" letter="capitalize">
                                {review_count || 0} {review_count > 1 ? `${t('product:review')}s` : t('product:review')}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item container justify={isGrid ? 'center' : 'flex-start'}>
                        <Grid item>
                            {product_price && (
                                <div className="mgz-single-product-price">
                                    <PriceFormat {...price} />
                                </div>
                            )}
                            {product_shortdescription && (
                                <Link href={url_key}>
                                    <CmsRenderer content={short_description.html} />
                                </Link>
                            )}
                            <div className="mgz-single-product-option-item">
                                {__typename === 'GroupedProduct' ? (
                                    <CustomButton t={t} styles={styles} handleClick={handleClick} />
                                ) : (
                                    <OptionItem
                                        data={product}
                                        setPrice={setPrice}
                                        t={t}
                                        noLabel
                                        noValidate
                                        customPos
                                        showSwatches={product_swatches}
                                        showQty={false}
                                        disabled={false}
                                        showAddToCart={product_addtocart}
                                        handleAddToCart={handleClick}
                                        customButton={<CustomButton t={t} styles={styles} handleClick={handleClick} />}
                                    />
                                )}
                            </div>
                        </Grid>
                        {!isGrid && (
                            <Grid item style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                {product_wishlist && (
                                    <IconButton className={styles.btnShare} onClick={handleAddtowishlist}>
                                        {favoritIcon}
                                    </IconButton>
                                )}
                                {modules.productcompare.enabled && product_compare && (
                                    <IconButton className={styles.btnShare} onClick={() => handleSetCompareList(id)}>
                                        <CompareArrowsIcon className={styles.iconShare} />
                                    </IconButton>
                                )}
                            </Grid>
                        )}
                    </Grid>
                    {isGrid && (
                        <Grid item>
                            {product_wishlist && (
                                <IconButton className={styles.btnShare} onClick={handleAddtowishlist}>
                                    {favoritIcon}
                                </IconButton>
                            )}
                            {modules.productcompare.enabled && product_compare && (
                                <IconButton className={styles.btnShare} onClick={() => handleSetCompareList(id)}>
                                    <CompareArrowsIcon className={styles.iconShare} />
                                </IconButton>
                            )}
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <style jsx>
                {`
                    .mgz-single-product-option-item {
                        margin-top: 10px;
                    }
                    .mgz-single-product-option-item :global(> div:not(div[class*='btnAdd'])) {
                    }
                    .mgz-single-product-option-item :global(div[role='radiogroup']) {
                        ${isGrid ? 'justify-content: center;' : ''}
                    }
                    .mgz-single-product-price {
                        ${isGrid ? 'text-align: center;' : ''}
                    }
                    @media (max-width: 600px) {
                        .mgz-single-product-option-item :global(div[role='radiogroup'] > div) {
                            margin: 2px 5px;
                        }
                        .mgz-single-product-option-item :global(div[role='radiogroup'] > div > span) {
                            font-size: 11px;
                        }
                        .mgz-single-product-option-item :global(div[class*='btnAdd'] button) {
                            font-size: 11px;
                            height: 31px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default SingleProduct;
