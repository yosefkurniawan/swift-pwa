/* eslint-disable operator-linebreak */
import Typography from '@common_typography';
import Skeleton from '@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/Skeleton';
import ProductSlider from '@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/Slider';
import SingleProduct from '@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/SingleProduct';
import { generateQueries, getProductListConditions } from '@core_modules/cms/helpers/getProductListConditions';
import { getProductList, getProductPrice } from '@core_modules/cms/services/graphql';
import { useTranslation } from '@i18n';
import Grid from '@material-ui/core/Grid';
import ErrorMessage from '@plugin_productlist/components/ErrorMessage';
import React, {
    useEffect, useMemo, useRef, useState,
} from 'react';
import { useRouter } from 'next/router';
import { priceVar } from '@root/core/services/graphql/cache';
import { useReactiveVar } from '@apollo/client';

const MagezonProductList = (props) => {
    // prettier-ignore
    const {
        type, condition, border_hover_color,
        description, show_line,
        line_color, line_position, line_width,
        max_items, orer_by, product_addtocart, product_shortdescription,
        product_compare, product_image, product_name,
        product_price, product_review, product_swatches, product_wishlist, product_sku, product_display,
        title, title_align, title_tag, title_color,
        item_xl, item_lg, item_md, item_sm, item_xs,
        ...rest
    } = props;
    const { storeConfig } = props;
    const { t } = useTranslation(['common', 'catalog']);

    const productProps = {
        type,
        product_addtocart,
        product_compare,
        product_image,
        product_price,
        product_review,
        product_swatches,
        product_wishlist,
        product_name,
        product_shortdescription,
        product_display,
        item_xl,
        item_lg,
        item_md,
        item_sm,
        item_xs,
        storeConfig,
    };
    const router = useRouter();
    let content = '';
    const showLineClass = show_line ? 'mgz-product-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-product-heading-line--bottom' : '';
    const dataCondition = useMemo(() => getProductListConditions(condition), [condition]);
    const dataFilter = generateQueries(type, type === 'single_product' ? { sku: { eq: product_sku } } : dataCondition, orer_by);
    // const context = type !== 'single_product' && dataFilter.sort.random ? { request: 'internal' } : {};
    const [fetchProductList, { data, loading, error }] = getProductList();
    const [fetchProductPrice, { data: dataPrice, loading: loadingPrice, error: errorPrice }] = getProductPrice();
    // cache price
    const cachePrice = useReactiveVar(priceVar);
    const magezonProductRef = useRef();
    const [display, setDisplay] = useState(false);

    const generateIdentifier = () => {
        let identifier = `${router.asPath}-${title}`;
        identifier = identifier.replace(/ /g, '-');
        return identifier;
    };

    React.useEffect(() => {
        fetchProductList({
            variables: { ...dataFilter, pageSize: max_items },
        });
    }, []);

    React.useEffect(() => {
        if (!cachePrice[generateIdentifier()]) {
            fetchProductPrice({
                variables: { ...dataFilter, pageSize: max_items },
            });
        }
    }, [data]);

    React.useEffect(() => {
        if (dataPrice) {
            const identifier = generateIdentifier();
            const dataTemp = cachePrice;
            dataTemp[identifier] = dataPrice;
            priceVar({
                ...cachePrice,
            });
        }
    }, [dataPrice]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries?.length > 0 && entries[0].isIntersecting && !display) {
                setDisplay(true);
            }
        });

        if (magezonProductRef.current) {
            observer.observe(magezonProductRef.current);
        }

        return () => observer.disconnect();
    }, [magezonProductRef]);

    const getPrice = () => {
        let productPrice = [];

        if (cachePrice[generateIdentifier()] && cachePrice[generateIdentifier()].products && cachePrice[generateIdentifier()].products.items) {
            productPrice = cachePrice[generateIdentifier()].products.items;
        } else if (dataPrice && dataPrice.products && dataPrice.products.items) {
            productPrice = dataPrice.products.items;
        }

        return productPrice;
    };

    if (type === 'single_product' && data && data.products && data.products.items) {
        content = data?.products?.items[0] && (
            <SingleProduct
                product={data.products.items[0]}
                {...productProps}
                dataPrice={getPrice()}
                loadingPrice={loadingPrice}
                errorPrice={errorPrice}
            />
        );
    }

    if (type === 'product_list' && data && data.products && data.products.items) {
        content = data?.products?.items.map((product, index) => (
            <SingleProduct
                key={index}
                product={product}
                {...productProps}
                dataPrice={getPrice()}
                loadingPrice={loadingPrice}
                errorPrice={errorPrice}
            />
        ));
    }

    if (type === 'product_grid' && data && data.products && data.products.items) {
        content = (
            <Grid container>
                {data?.products?.items.map((product, index) => (
                    <SingleProduct
                        key={index}
                        product={product}
                        {...productProps}
                        dataPrice={getPrice()}
                        loadingPrice={loadingPrice}
                        errorPrice={errorPrice}
                    />
                ))}
            </Grid>
        );
    }

    if (type === 'product_slider' && data && data.products && data.products.items) {
        content = (
            <ProductSlider {...rest}>
                {data?.products?.items.map((product, index) => (
                    <SingleProduct key={index} product={product} {...productProps} dataPrice={getPrice()} />
                ))}
            </ProductSlider>
        );
    }

    return (
        <>
            <div className="mgz-product" ref={magezonProductRef}>
                {(title || description) && (
                    <div className={`mgz-product-heading ${showLineClass} ${linePosClass}`}>
                        {title && (
                            <div className="mgz-product-heading-title">
                                <Typography variant={title_tag} align={title_align}>
                                    {title.toUpperCase()}
                                </Typography>
                            </div>
                        )}
                        <div>{description}</div>
                    </div>
                )}
                <div className="mgz-product-content">
                    {loading || !display ? (
                        <Skeleton />
                    ) : content}
                </div>
                {error && (
                    <>
                        <div className="mgz-product-error">
                            <ErrorMessage variant="warning" text={t('catalog:emptyProductSearchResult')} open />
                        </div>
                    </>
                )}
            </div>
            <style jsx>
                {`
                    .mgz-product-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-product-heading-line:before {
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
                    .mgz-product-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-product-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-product-heading-title :global(*[class*='Typography']) {
                        ${title_color ? `color: ${title_color};` : ''}
                    }
                    .mgz-product :global(.MuiGrid-item h4) {
                        ${type === 'product_list' &&
                        `
                            margin: 0;
                        `}
                    }
                    .mgz-product-content > :global(div) {
                        margin-bottom: 20px;
                    }
                    .mgz-product-content > :global(div:hover) {
                        ${type !== 'product_grid' &&
                        type !== 'product_slider' &&
                        `
                            box-shadow: 0px 20px 50px -20px rgb(0 0 0 / 50%) !important;
                            border: 1px solid ${border_hover_color || '#ffffff'} !important;
                        `}
                    }
                    .mgz-product-content :global(.mgz-single-product-card) {
                        padding: 20px 0;
                    }
                    .mgz-product-content :global(.mgz-single-product-card img) {
                        max-width: 100%;
                        cursor: pointer;
                    }
                    .mgz-product-error {
                        padding: 20px 0;
                    }
                    @media (max-width: 575px) {
                        .mgz-product :global(.col-xs-5) {
                            flex: 1 20%;
                            max-width: 20%;
                        }
                    }
                    @media (min-width: 576px) and (max-width: 767px) {
                        .mgz-product :global(.col-sm-5) {
                            flex: 1 20%;
                            max-width: 20%;
                        }
                    }
                    @media (min-width: 768px) and (max-width: 991px) {
                        .mgz-product :global(.col-md-5) {
                            flex: 1 20%;
                            max-width: 20%;
                        }
                    }
                    @media (min-width: 992px) and (max-width: 1200px) {
                        .mgz-product :global(.col-lg-5) {
                            flex: 1 20%;
                            max-width: 20%;
                        }
                    }
                    @media (min-width: 1200px) {
                        .mgz-product :global(.col-xl-5) {
                            flex: 1 20%;
                            max-width: 20%;
                        }
                    }
                `}
            </style>
        </>
    );
};
export default MagezonProductList;
