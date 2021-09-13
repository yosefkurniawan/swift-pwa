/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import { useQuery } from '@apollo/client';
import PriceFormat from '@common_priceformat';
import RatingStar from '@common_ratingstar';
import Typography from '@common_typography';
import { debuging, features, modules } from '@config';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/MagezonProductSlider/style';
import { getProductList } from '@core_modules/cms/services/graphql';
import CustomButton from '@core_modules/commons/Button';
import OptionItem from '@core_modules/product/plugins/OptionItem/index';
import { addProductsToCompareList, addWishlist as mutationAddWishlist } from '@core_modules/product/services/graphql';
import { getCompareList, getCustomerUid } from '@core_modules/productcompare/service/graphql';
import { getLoginInfo } from '@helper_auth';
import { useTranslation } from '@i18n';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import { getCookies } from '@root/core/helpers/cookies';
import { generateThumborUrl } from '@root/core/helpers/image';
import { localCompare } from '@services/graphql/schema/local';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';

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

const SliderContent = (props) => {
    // prettier-ignore
    const {
        product,
        product_addtocart, product_compare, product_shortdescription,
        product_image, product_price, product_review,
        product_swatches, product_wishlist, product_name,
    } = props;

    // prettier-ignore
    const {
        name, url_key, id, __typename,
        price_range, price_tiers,
        special_from_date, special_to_date, review_count,
        short_description,
    } = product;

    const { t } = useTranslation();
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
            <Grid container direction="column" alignItems="center">
                {product_image && (
                    <Grid item xs>
                        <div onClick={handleClick} style={{ width: features.imageSize.product.width, maxWidth: '100%' }}>
                            <img
                                data-pagespeed-no-defer
                                src={generateThumborUrl(product.small_image.url, features.imageSize.product.height, features.imageSize.product.width)}
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
                            {product_price && <PriceFormat {...price} />}
                            {product_shortdescription && (
                                <Link href={url_key}>
                                    <CmsRenderer content={short_description.html} />
                                </Link>
                            )}
                            <div className="mgz-product-list-option-item">
                                {__typename === 'GroupedProduct' ? (
                                    <CustomButton className={styles.btnAddToCart} onClick={handleClick}>
                                        <Typography align="center" type="bold" letter="uppercase" color="white" variant="inherit">
                                            {t('product:addToCart')}
                                        </Typography>
                                    </CustomButton>
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
                                        customButton={
                                            <CustomButton className={styles.btnAddToCart} onClick={handleClick}>
                                                <Typography align="center" type="bold" letter="uppercase" color="white" variant="inherit">
                                                    {t('product:addToCart')}
                                                </Typography>
                                            </CustomButton>
                                        }
                                    />
                                )}
                            </div>
                        </Grid>
                    </Grid>
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
                </Grid>
            </Grid>
        </>
    );
};

const MagezonProductSlider = (props) => {
    // prettier-ignore
    const {
        description, condition,
        line_color, line_position, line_width,
        owl_auto_height, owl_autoplay_timeout, owl_dots, owl_dots_speed,
        owl_item_xl, owl_item_lg, owl_item_md, owl_item_sm, owl_item_xs,
        owl_lazyload, owl_loop, owl_nav, owl_nav_position,
        owl_nav_size, owl_stage_padding, show_line,
        owl_active_background_color, owl_slide_by,
        owl_background_color, owl_color,
        owl_hover_background_color, owl_hover_color,
        owl_autoplay, owl_autoplay_hover_pause,
        max_items,
        title, title_align, title_color, title_tag,
        product_addtocart, product_compare, product_shortdescription,
        product_image, product_price, product_review,
        product_swatches, product_wishlist, product_name,
    } = props;

    const showLineClass = show_line ? 'mgz-product-slider-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-product-slider-heading-line--bottom' : '';
    const dataCondition = useMemo(() => getProductListConditions(condition), [condition]);
    const dataFilter = generateQueries(dataCondition);
    const { data, loading } = getProductList({ ...dataFilter, pageSize: max_items });
    const navSize = owl_nav_size === 'mini' ? 10 : owl_nav_size === 'small' ? 15 : owl_nav_size === 'normal' ? 20 : 25;
    const [showNav, setShowNav] = useState(true);
    const isXl = useMediaQuery('(min-width:1200px)');
    const isLg = useMediaQuery('(min-width:992px) and (max-width:1199px)');
    const isMd = useMediaQuery('(min-width:768px) and (max-width:991px)');
    const isSm = useMediaQuery('(min-width:576px) and (max-width:767px)');
    const isXs = useMediaQuery('(max-width:576px)');
    let sliderRef = useRef();

    const getItemsToShow = () => {
        let itemsToShow;

        if (isXl) itemsToShow = owl_item_xl;
        if (isLg) itemsToShow = owl_item_lg;
        if (isMd) itemsToShow = owl_item_md;
        if (isSm) itemsToShow = owl_item_sm;
        if (isXs) itemsToShow = owl_item_xs;

        return itemsToShow;
    };

    const settings = {
        autoplay: owl_autoplay,
        autoplaySpeed: owl_autoplay_timeout,
        speed: owl_dots_speed || 1000,
        dots: owl_dots,
        infinite: owl_loop,
        arrows: false,
        lazyload: owl_lazyload ? 'ondemand' : null,
        pauseOnHover: owl_autoplay_hover_pause,
        adaptiveHeight: owl_auto_height,
        customPaging: (i) => (
            <a key={i}>
                <div className="custom-slick-dots" />
            </a>
        ),
        slidesToShow: getItemsToShow(),
        slidesToScroll: owl_slide_by,
        onReInit: () => {
            if (document.querySelector('.slick-dots')) {
                setShowNav(true);
            } else {
                setShowNav(false);
            }
        },
    };

    if (loading) return null;

    return (
        <>
            <div className="mgz-product-slider">
                <div className={`mgz-product-slider-heading ${showLineClass} ${linePosClass}`}>
                    <div className="mgz-product-slider-heading-title">
                        <Typography variant={title_tag} align={title_align}>
                            {title.toUpperCase()}
                        </Typography>
                    </div>
                    <div>{description}</div>
                </div>
                <div className="mgz-product-slider-content">
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {data?.products?.items.map((product, index) => (
                            <SliderContent
                                key={index}
                                product={product}
                                product_addtocart={product_addtocart}
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
                    </Slider>
                    {owl_nav && showNav && (
                        <div className="mgz-product-slider-nav">
                            <div className="mgz-product-slider-nav--btn" onClick={() => sliderRef.slickPrev()}>
                                <LeftArrowIcon />
                            </div>
                            <div className="mgz-product-slider-nav--btn" onClick={() => sliderRef.slickNext()}>
                                <RightArrowIcon />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-product-slider {
                        ${isSm ? 'min-height: 600px;' : isXs ? 'min-height: 700px;' : ''}
                    }
                    .mgz-product-slider :global(img) {
                        max-width: 100%;
                    }
                    .mgz-product-slider :global(.slick-slide) {
                        height: auto;
                    }
                    .mgz-product-slider :global(.slick-slider) {
                        padding: 0 ${owl_stage_padding}px;
                    }
                    .mgz-product-slider :global(.slick-list) {
                    }
                    .mgz-product-slider :global(.slick-dots) {
                        position: relative;
                        bottom: -70px;
                    }
                    .mgz-product-slider :global(.slick-track) {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: stretch;
                    }
                    .mgz-product-slider :global(.custom-slick-dots) {
                        width: 10px;
                        height: 10px;
                        background-color: ${owl_background_color || '#eee'};
                        border-radius: 50px;
                    }
                    .mgz-product-slider :global(.slick-active .custom-slick-dots) {
                        background-color: ${owl_active_background_color || '#000000'};
                    }
                    .mgz-product-slider :global(.slick-slider li:not(.slick-active) .custom-slick-dots:hover) {
                        background-color: ${owl_hover_background_color || '#000000'};
                    }
                    .mgz-product-slider-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-product-slider-heading-line:before {
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
                    .mgz-product-slider-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-product-slider-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-product-slider-heading-title :global(*[class*='Typography']) {
                        ${title_color ? `color: ${title_color};` : ''}
                    }
                    .mgz-product-slider-content {
                        text-align: center;
                        ${owl_nav_position.includes('bottom') && (isXs || isSm) ? 'position: relative;' : ''}
                    }
                    .mgz-product-slider-nav {
                        position: absolute;
                        top: ${owl_nav_position.includes('top') ? (isXs || isSm ? '2%' : '10%') : '50%'};
                        bottom: ${owl_nav_position.includes('bottom') ? '-10%' : '50%'};
                        display: flex;
                        width: 100%;
                        justify-content: ${owl_nav_position === 'top_left' || owl_nav_position === 'bottom_left'
                            ? 'flex-start'
                            : owl_nav_position === 'top_right' || owl_nav_position === 'bottom_right'
                            ? 'flex-end'
                            : 'space-between'};
                    }
                    .mgz-product-slider-nav--btn {
                        display: flex;
                        z-index: 1;
                        margin: 0 2px;
                        ${owl_nav_position === 'center_split' ? 'opacity: 0;' : ''}
                        align-items: center;
                        justify-content: center;
                        width: ${navSize * 2}px;
                        height: ${navSize * 2}px;
                        background-color: ${owl_background_color || '#eee'};
                        transition: opacity 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;
                    }
                    .mgz-product-slider:hover .mgz-product-slider-nav--btn {
                        ${owl_nav_position === 'center_split' ? 'opacity: 1;' : ''}
                    }
                    .mgz-product-slider-nav--btn:hover {
                        cursor: pointer;
                        border: 1px solid black;
                        background-color: ${owl_hover_background_color};
                    }
                    .mgz-product-slider-nav--btn :global(svg) {
                        font-size: 15px;
                        color: ${owl_color};
                    }
                    .mgz-product-slider-nav--btn:hover :global(svg) {
                        color: ${owl_hover_color};
                    }
                    .mgz-product-slider-dots {
                        display: flex;
                        justify-content: center;
                        margin: 5px;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonProductSlider;
