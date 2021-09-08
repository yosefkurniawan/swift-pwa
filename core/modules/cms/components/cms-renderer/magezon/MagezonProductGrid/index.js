/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

import { useQuery } from '@apollo/client';
import PriceFormat from '@common_priceformat';
import RatingStar from '@common_ratingstar';
import { debuging, features, modules } from '@config';
import { getCookies } from '@core/helpers/cookies';
import { localCompare } from '@core/services/graphql/schema/local';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/MagezonProductGrid/style';
import { getProductList } from '@core_modules/cms/services/graphql';
import CustomButton from '@core_modules/commons/Button';
import Typography from '@core_modules/commons/Typography';
import OptionItem from '@core_modules/product/plugins/OptionItem';
import { addProductsToCompareList, addWishlist as mutationAddWishlist } from '@core_modules/product/services/graphql';
import { getCompareList, getCustomerUid } from '@core_modules/productcompare/service/graphql';
import { getLoginInfo } from '@helper_auth';
import { useTranslation } from '@i18n';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import { generateThumborUrl } from '@root/core/helpers/image';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

const getProductListConditions = (conditions) => {
    const newConditions = {
        aggregator: '',
        attributes: [],
    };

    if (conditions) {
        const parsedConditions = JSON.parse(conditions);

        for (const condition_index in parsedConditions) {
            const condition_item = parsedConditions[condition_index];

            if (condition_index.split('--').length === 1 && condition_item.aggregator && condition_item.aggregator === 'all') {
                newConditions.aggregator = 'all';
            }

            if (condition_index.split('--').length === 2 && condition_item.attribute) {
                newConditions.attributes.push(condition_item);
            }
        }
    }

    return newConditions;
};

const generateQueries = (variables) => {
    const queryVariables = {
        filter: {},
    };
    variables.attributes.forEach((variable) => {
        const { attribute, operator, value } = variable;
        let newValue;

        // prettier-ignore
        switch (operator) {
        case '<':
            newValue = Number(value - 1).toString();
            break;
        case '>':
            newValue = Number(value + 1).toString();
            break;

        default:
            newValue = value;
        }

        if (attribute === 'price') {
            if (operator === '>' || operator === '>=') {
                queryVariables.filter.price = { ...queryVariables.filter.price, from: operator === '>' ? newValue : value };
            }
            if (operator === '<' || operator === '<=') {
                queryVariables.filter.price = { ...queryVariables.filter.price, to: operator === '<' ? newValue : value };
            }
            if (operator === '==') {
                queryVariables.filter.price = { ...queryVariables.filter.price, from: newValue, to: newValue };
            }
        }

        if (attribute === 'category_ids') {
            if (operator === '==') {
                queryVariables.filter.category_id = { ...queryVariables.filter.category_id, in: [value] };
            }
        }
    });
    return queryVariables;
};

const ProductContent = (props) => {
    // prettier-ignore
    const {
        product, t,
        product_addtocart, product_compare,
        product_image, product_price, product_review,
        product_swatches, product_wishlist, product_name,
        item_xl, item_lg, item_md, item_sm, item_xs,
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

    const getCol5Classes = () => {
        let classes = '';
        if (item_xl === 5) {
            classes += 'col-xl-5 ';
        }
        if (item_lg === 5) {
            classes += 'col-lg-5 ';
        }
        if (item_md === 5) {
            classes += 'col-md-5 ';
        }
        if (item_sm === 5) {
            classes += 'col-sm-5 ';
        }
        if (item_xs === 5) {
            classes += 'col-xs-5 ';
        }

        return classes;
    };

    return (
        <>
            <Grid
                item
                container
                direction="column"
                className={getCol5Classes()}
                xl={item_xl !== 5 && 12 / item_xl}
                lg={item_lg !== 5 && 12 / item_lg}
                md={item_md !== 5 && 12 / item_md}
                sm={item_sm !== 5 && 12 / item_sm}
                xs={item_xs !== 5 && 12 / item_xs}
            >
                {product_image && (
                    <Grid item xs container justify="center" alignItems="center">
                        <div style={{ width: features.imageSize.product.width, maxWidth: '100%' }}>
                            <img
                                data-pagespeed-no-defer
                                src={generateThumborUrl(product.small_image.url, 0, 0)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/assets/img/placeholder.png';
                                }}
                                alt="mediaimage"
                            />
                        </div>
                    </Grid>
                )}
                <Grid item xs container direction="column" alignItems="center">
                    {product_name && (
                        <Grid item>
                            <Typography variant="h4">{name}</Typography>
                        </Grid>
                    )}
                    {product_review && (
                        <Grid item container justify="center">
                            <RatingStar value={review_count} />
                            <Typography variant="p" type="regular" letter="capitalize">
                                {review_count || 0} {review_count > 1 ? `${t('product:review')}s` : t('product:review')}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item container justify="center">
                        <Grid item>
                            {product_price && (
                                <div className="mgz-product-grid-price">
                                    <PriceFormat {...price} />
                                </div>
                            )}
                            {product_swatches && (
                                <div className="mgz-product-grid-option-item">
                                    {__typename === 'GroupedProduct'
                                        ? (
                                            <CustomButton className={styles.btnAddToCard} onClick={handleClick}>
                                                <Typography
                                                    align="center"
                                                    type="bold"
                                                    letter="uppercase"
                                                    color="white"
                                                    variant="inherit"
                                                >
                                                    {t('product:addToCart')}
                                                </Typography>
                                            </CustomButton>
                                        )
                                        : (
                                            <OptionItem
                                                data={product}
                                                setPrice={setPrice}
                                                t={t}
                                                noLabel
                                                noValidate
                                                customPos
                                                disabled={false}
                                                showAddToCart={product_addtocart}
                                                showQty={false}
                                                handleAddToCart={handleClick}
                                                customButton={(
                                                    <CustomButton className={styles.btnAddToCard} onClick={handleClick}>
                                                        <Typography
                                                            align="center"
                                                            type="bold"
                                                            letter="uppercase"
                                                            color="white"
                                                            variant="inherit"
                                                        >
                                                            {t('product:addToCart')}
                                                        </Typography>
                                                    </CustomButton>
                                                )}
                                            />
                                        )}
                                </div>
                            )}
                        </Grid>
                        <Grid item container justify="center">
                            {product_wishlist && (
                                <IconButton className={styles.btnShare} onClick={handleAddtowishlist}>
                                    {favoritIcon}
                                </IconButton>
                            )}
                            {product_compare && (
                                <IconButton className={styles.btnShare} onClick={() => handleSetCompareList(id)}>
                                    <CompareArrowsIcon className={styles.iconShare} />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <style jsx>
                {`
                    @media (max-width: 600px) {
                        .mgz-product-grid-option-item :global(div[role='radiogroup'] > div) {
                            margin: 2px 5px;
                        }
                        .mgz-product-grid-option-item :global(div[role='radiogroup'] > div > span) {
                            font-size: 11px;
                        }
                        .mgz-product-grid-option-item :global(div[class*='btnAdd'] button) {
                            font-size: 9px;
                            height: 31px;
                        }
                    }
                    .mgz-product-grid-price {
                        text-align: center;
                        margin: 5px 0;
                    }
                `}
            </style>
        </>
    );
};

const MagezonProductGrid = (props) => {
    // prettier-ignore
    const {
        condition, description, show_line,
        line_color, line_position, line_width,
        item_xl, item_lg, item_md, item_sm, item_xs,
        max_items, product_addtocart,
        product_background, product_compare, product_image, product_name,
        product_price, product_review, product_swatches, product_wishlist,
        title, title_align, title_tag,
    } = props;
    const { t } = useTranslation();
    const showLineClass = show_line ? 'mgz-product-grid-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-product-grid-heading-line--bottom' : '';
    const dataCondition = useMemo(() => getProductListConditions(condition), [condition]);
    const dataFilter = generateQueries(dataCondition);
    const { data } = getProductList({ ...dataFilter, pageSize: max_items });

    return (
        <>
            <div className="mgz-product-grid">
                <div className={`mgz-product-grid-heading ${showLineClass} ${linePosClass}`}>
                    <div className="mgz-product-grid-heading-title">
                        <Typography variant={title_tag} align={title_align}>
                            {title.toUpperCase()}
                        </Typography>
                    </div>
                    <div className="mgz-product-grid-heading-description">{description}</div>
                </div>
                <div className="mgz-product-grid-content">
                    <Grid container>
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
                                item_xl={item_xl}
                                item_lg={item_lg}
                                item_md={item_md}
                                item_sm={item_sm}
                                item_xs={item_xs}
                            />
                        ))}
                    </Grid>
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-product-grid-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-product-grid-heading-line:before {
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
                    .mgz-product-grid-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-product-grid-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-product-grid :global(.MuiGrid-item h4) {
                        margin: 0;
                    }
                    .mgz-product-grid :global(img) {
                        max-width: 100%;
                    }
                    @media (max-width: 575px) {
                        .mgz-product-grid :global(.col-xs-5) {
                            flex: 1 20%;
                            max-width: 20%;
                        }
                    }
                    @media (min-width: 576px) and (max-width: 767px) {
                        .mgz-product-grid :global(.col-sm-5) {
                            flex: 1 20%;
                            max-width: 20%;
                        }
                    }
                    @media (min-width: 768px) and (max-width: 991px) {
                        .mgz-product-grid :global(.col-md-5) {
                            flex: 1 20%;
                            max-width: 20%;
                        }
                    }
                    @media (min-width: 992px) and (max-width: 1200px) {
                        .mgz-product-grid :global(.col-lg-5) {
                            flex: 1 20%;
                            max-width: 20%;
                        }  
                    }
                    @media (min-width: 1200px) {
                        .mgz-product-grid :global(.col-xl-5) {
                            flex: 1 20%;
                            max-width: 20%;
                        }  
                    }
                `}
            </style>
        </>
    );
};

export default MagezonProductGrid;
