/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */

import { useQuery } from '@apollo/client';
import Thumbor from '@common_image';
import PriceFormat from '@common_priceformat';
import RatingStar from '@common_ratingstar';
import Typography from '@common_typography';
import { debuging, features, modules } from '@config';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/MagezonProductList/style';
// import getProductListConditions from '@core_modules/cms/helpers/getProductListConditions';
import { getProductList } from '@core_modules/cms/services/graphql';
import OptionItem from '@core_modules/product/plugins/OptionItem/index';
import { addProductsToCompareList, addWishlist as mutationAddWishlist } from '@core_modules/product/services/graphql';
import { getCompareList, getCustomerUid } from '@core_modules/productcompare/service/graphql';
import { getLoginInfo } from '@helper_auth';
import { useTranslation } from '@i18n';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import { getCookies } from '@root/core/helpers/cookies';
import { localCompare } from '@services/graphql/schema/local';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

const ProductContent = (props) => {
    // prettier-ignore
    const {
        product, t,
        product_addtocart, product_compare, product_shortdescription,
        product_image, product_price, product_review,
        product_swatches, product_wishlist, product_name,
    } = props;
    // prettier-ignore
    const {
        name, url_key, id, __typename,
        price_range, price_tiers,
        special_from_date, special_to_date, review_count,
    } = product;
    const [wishlist, setWishlist] = useState(false);
    const styles = useStyles();
    const router = useRouter();
    const [addWishlist] = mutationAddWishlist();
    const isLogin = getLoginInfo();
    const [price, setPrice] = useState({
        priceRange: price_range,
        priceTiers: price_tiers,
        productType: __typename,
        specialFromDate: special_from_date,
        specialToDate: special_to_date,
    });
    const [getProductCompare, { data: compareList, refetch }] = getCompareList();
    const [getUid, { data: dataUid, refetch: refetchCustomerUid }] = getCustomerUid();
    const [addProductCompare] = addProductsToCompareList();
    const { client } = useQuery(localCompare);

    const favoritIcon = wishlist ? <Favorite className={styles.iconShare} /> : <FavoriteBorderOutlined className={styles.iconShare} />;

    React.useEffect(() => {
        if (!compareList && modules.productcompare.enabled) {
            const uid_product = getCookies('uid_product_compare');
            if (uid_product) {
                getProductCompare({
                    variables: {
                        uid: uid_product,
                    },
                });
            }
        }
    }, [compareList]);

    React.useEffect(() => {
        if (isLogin && !dataUid && modules.productcompare.enabled) {
            getUid();
        }
    }, [isLogin, dataUid]);

    const handleClick = () => {
        router.push(url_key);
    };

    const handleAddtowishlist = () => {
        if (isLogin && isLogin === 1) {
            addWishlist({
                variables: {
                    productId: id,
                },
            })
                .then(async () => {
                    await setWishlist(!wishlist);
                    await window.toastMessage({ open: true, variant: 'success', text: t('common:message:feedSuccess') });
                    router.push('/wishlist');
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: debuging.originalError ? e.message.split(':')[1] : t('common:message:feedFailed'),
                    });
                });
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('catalog:wishlist:addWithoutLogin'),
            });
        }
    };

    const handleSetCompareList = (id_compare) => {
        const uid_product_compare = getCookies('uid_product_compare');
        const uids = [];
        let uid_customer = '';
        uids.push(id_compare.toString());
        if (isLogin) {
            uid_customer = dataUid ? (dataUid.customer.compare_list ? dataUid.customer.compare_list.uid : '') : '';
        }
        let isExist = false;
        if (compareList) {
            compareList.compareList.items.map((res) => {
                if (res.uid === id_compare.toString()) {
                    isExist = true;
                }
                return null;
            });
            if (!isExist) {
                addProductCompare({
                    variables: {
                        uid: isLogin ? uid_customer : uid_product_compare,
                        products: uids,
                    },
                })
                    .then(async (res) => {
                        await window.toastMessage({ open: true, variant: 'success', text: t('common:productCompare:successCompare') });
                        client.writeQuery({
                            query: localCompare,
                            data: {
                                item_count: res.data.addProductsToCompareList.item_count,
                            },
                        });
                        refetch();
                        if (isLogin) {
                            refetchCustomerUid();
                        }
                    })
                    .catch((e) => {
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: debuging.originalError ? e.message.split(':')[1] : t('common:productCompare:failedCompare'),
                        });
                    });
            } else {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: t('common:productCompare:existProduct'),
                });
            }
        }
    };

    return (
        <>
            <Grid container spacing={4}>
                {product_image && (
                    <Grid item xs={4}>
                        <div style={{ height: features.imageSize.product.height, width: features.imageSize.product.width, maxWidth: '100%' }}>
                            <Thumbor
                                src={product.small_image.url}
                                width={features.imageSize.product.width}
                                height={features.imageSize.product.height}
                            />
                        </div>
                    </Grid>
                )}
                <Grid item xs={8} sm container direction="column">
                    {product_name && (
                        <Grid item>
                            <Typography variant="h4">{name}</Typography>
                        </Grid>
                    )}
                    {product_review && (
                        <Grid item container>
                            <RatingStar value={review_count} />
                            <Typography variant="p" type="regular" letter="capitalize">
                                {review_count || 0}
                                {' '}
                                {review_count > 1 ? `${t('product:review')}s` : t('product:review')}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item container direction="row">
                        <Grid item>
                            {product_price && <PriceFormat {...price} />}
                            {product_swatches && (
                                <div className="mgz-product-list-option-item">
                                    <OptionItem
                                        data={product}
                                        setPrice={setPrice}
                                        t={t}
                                        noLabel
                                        noValidate
                                        customPos
                                        disabled={false}
                                        showAddToCart={product_addtocart}
                                        handleAddToCart={handleClick}
                                    />
                                </div>
                            )}
                        </Grid>
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
                            {product_shortdescription && (
                                <IconButton>
                                    <Link href={url_key}>
                                        <Typography variant="h4">Learn More</Typography>
                                    </Link>
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <style jsx>
                {`
                    @media (max-width: 600px) {
                        .mgz-product-list-option-item :global(div[role='radiogroup'] > div) {
                            margin: 2px 5px;
                        }
                        .mgz-product-list-option-item :global(div[role='radiogroup'] > div > span) {
                            font-size: 11px;
                        }
                        .mgz-product-list-option-item :global(div[class*='btnAdd'] button) {
                            font-size: 11px;
                            height: 31px;
                        }
                    }
                `}
            </style>
        </>
    );
};

const MagezonProductList = (props) => {
    // prettier-ignore
    const {
        condition, description, show_line, source,
        line_color, line_position, line_width,
        max_items, orer_by, product_addtocart, product_shortdescription,
        product_background, product_compare, product_image, product_name,
        product_price, product_review, product_swatches, product_wishlist,
        title, title_align, title_tag,
    } = props;
    const { t } = useTranslation();
    const { data } = getProductList({ search: 'kenobi', pageSize: max_items });
    const showLineClass = show_line ? 'mgz-product-list-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-product-list-heading-line--bottom' : '';

    // const dataCondition = useMemo(() => getProductListConditions(condition), [condition]);

    console.log(props);
    return (
        <>
            <div className="mgz-product-list">
                <div className={`mgz-product-list-heading ${showLineClass} ${linePosClass}`}>
                    <div className="mgz-product-list-heading-title">
                        <Typography variant={title_tag} align={title_align}>
                            {title.toUpperCase()}
                        </Typography>
                    </div>
                    <div className="mgz-product-list-heading-description">{description}</div>
                </div>
                <div className="mgz-product-list-content">
                    {data?.products?.items.map((product, index) => (
                        <ProductContent
                            key={index}
                            product={product}
                            t={t}
                            product_addtocart={product_addtocart}
                            product_background={product_background}
                            product_compare={product_compare}
                            product_image={product_image}
                            product_price={product_price}
                            product_review={product_review}
                            product_swatches={product_swatches}
                            product_wishlist={product_wishlist}
                            product_name={product_name}
                            product_shortdescription={product_shortdescription}
                        />
                    ))}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-product-list-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-product-list-heading-line:before {
                        content: '';
                        z-index: 0;
                        display: block;
                        position: absolute;
                        bottom: 0;
                        top: 40%;
                        width: 100%;
                        height: ${line_width}px;
                        background-color: ${line_color};
                    }
                    .mgz-product-list-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-product-list-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-product-list :global(.MuiGrid-item h4) {
                        margin: 0;
                    }
                `}
            </style>
        </>
    );
};
export default MagezonProductList;
