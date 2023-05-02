/* eslint-disable array-callback-return */
import { useQuery, useReactiveVar } from '@apollo/client';
import { debuging, features, modules } from '@config';
import generateSchemaOrg from '@core_modules/product/helpers/schema.org';
import Header from '@core_modules/product/pages/default/components/header';
import Loading from '@core_modules/product/pages/default/components/Loader';
import {
    addProductsToCompareList,
    addWishlist as mutationAddWishlist,
    getProduct,
    getProductLabel,
    getSeller,
    getProductPrice,
    smartProductTabs,
} from '@core_modules/product/services/graphql';
import { getCustomerUid } from '@core_modules/productcompare/service/graphql';
import { getCookies } from '@helper_cookies';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import { StripHtmlTags } from '@helper_text';
import Layout from '@layout';
import { localCompare } from '@services/graphql/schema/local';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';
import TagManager from 'react-gtm-module';
import { priceVar, currencyVar } from '@root/core/services/graphql/cache';

const getPrice = (cachePrice, generateIdentifier, dataPrice) => {
    let productPrice = [];

    if (
        cachePrice[generateIdentifier]
        && cachePrice[generateIdentifier].products
        && cachePrice[generateIdentifier].products.items
    ) {
        productPrice = cachePrice[generateIdentifier].products.items;
    } else if (dataPrice && dataPrice.products && dataPrice.products.items) {
        productPrice = dataPrice.products.items;
    }

    return productPrice;
};

const ContentDetail = ({
    t, product, keyProduct, Content, isLogin, weltpixel_labels, dataProductTabs, storeConfig, dataPrice, loadPrice, errorPrice, currencyCache,
}) => {
    const item = product.items[keyProduct];
    const route = useRouter();
    const reviewValue = parseInt(item.review.rating_summary, 0) / 20;
    const [getUid, { data: dataUid, refetch: refetchCustomerUid }] = getCustomerUid();
    const [addProductCompare] = addProductsToCompareList();
    const { data: dataCompare, client } = useQuery(localCompare);
    const { data: dSeller, loading: loadSeller } = getSeller({
        fetchPolicy: 'no-cache',
        variables: {
            input: {
                seller_id: [parseFloat(item.seller_id)],
            },
        },
    });
    const mount = React.useRef(null);

    let enableMultiSeller = false;
    if (storeConfig) {
        enableMultiSeller = storeConfig.enable_oms_multiseller === '1';
    }

    let itemData;
    if (!loadSeller && dSeller && enableMultiSeller) {
        itemData = dSeller.getSeller;
    }

    React.useEffect(() => {
        if (isLogin && !dataUid && modules.productcompare.enabled) {
            getUid();
        }
    }, [isLogin, dataUid]);

    const [showChat, setShowChat] = React.useState(false);
    const handleChat = () => {
        if (isLogin && isLogin === 1) {
            setShowChat(!showChat);
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: 'to continue chat, please log in first',
            });
        }
    };

    React.useEffect(() => {
        let categoryProduct = '';
        let categoryOne = '';
        // eslint-disable-next-line no-unused-expressions
        item.categories.length > 0
            && ((categoryOne = item.categories[0].name),
            item.categories.map(({ name }, indx) => {
                if (indx > 0) categoryProduct += `/${name}`;
                else categoryProduct += name;
            }));
        // GTM UA dayaLayer
        const tagManagerArgs = {
            dataLayer: {
                pageName: item.name,
                pageType: 'product',
                ecommerce: {
                    detail: {
                        product: [
                            {
                                name: item.name,
                                id: item.sku,
                                price: item.price_range.minimum_price.regular_price.value || 0,
                                category: categoryProduct,
                                dimensions4: item.stock_status,
                                dimensions5: reviewValue,
                                dimensions6: item.review.reviews_count,
                                dimensions7: item.sale === 0 ? 'NO' : 'YES',
                            },
                        ],
                    },
                    currencyCode: item.price_range.minimum_price.regular_price.currency || 'USD',
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: item.name,
            },
        };
        // GA 4 dataLayer
        const tagManagerArgsGA4 = {
            dataLayer: {
                pageName: item.name,
                pageType: 'product',
                ecommerce: {
                    items: [
                        {
                            item_name: item.name,
                            item_id: item.sku,
                            price: item.price_range.minimum_price.regular_price.value || 0,
                            item_category: categoryOne,
                            currency: item.price_range.minimum_price.regular_price.currency || 'USD',
                            item_stock_status: item.stock_status,
                            item_reviews_score: reviewValue,
                            item_reviews_count: item.review.reviews_count,
                            item_sale_product: item.sale === 0 ? 'NO' : 'YES',
                        },
                    ],
                },
                event: 'view_item',
            },
        };
        // Clear the previous ecommerce object.
        TagManager.dataLayer({ dataLayer: { ecommerce: null } });
        TagManager.dataLayer(tagManagerArgs);
        // Clear the previous ecommerce object.
        TagManager.dataLayer({ dataLayer: { ecommerce: null } });
        TagManager.dataLayer(tagManagerArgsGA4);
    }, []);

    const bannerData = React.useMemo(() => {
        const bannerResult = [];
        if (item.media_gallery.length > 0) {
            // eslint-disable-next-line array-callback-return
            item.media_gallery.map((media) => {
                bannerResult.push({
                    link: '#',
                    imageUrl: media.url,
                    videoUrl: media && media.video_content,
                    imageAlt: media.label,
                });
            });
        } else {
            bannerResult.push({
                link: '#',
                imageUrl: item.image.url,
                videoUrl: '#',
                imageAlt: item.image.label,
            });
        }

        return bannerResult;
    }, [item?.media_gallery, item?.image]);

    const [openOption, setOpenOption] = React.useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openShare, setOpenShare] = React.useState(false);
    const [openImageDetail, setOpenImageDetail] = React.useState(false);
    const [selectedImgIdx, setSelectedImgIdx] = React.useState(false);
    const [banner, setBanner] = React.useState(bannerData);
    const [price, setPrice] = React.useState({
        priceRange: item.price_range,
        priceTiers: item.price_tiers,
        // eslint-disable-next-line no-underscore-dangle
        productType: item.__typename,
        specialFromDate: item.special_from_date,
        specialToDate: item.special_to_date,
    });
    const [additionalPrice, setAdditionalPrice] = React.useState(0);
    const [stockStatus, setStockStatus] = React.useState(item.stock_status);
    const [wishlist, setWishlist] = React.useState(false);

    // Customizable Options
    const [customizableOptions, setCustomizableOptions] = React.useState([]);
    const [errorCustomizableOptions, setErrorCustomizableOptions] = React.useState([]);

    React.useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        };
    }, []);

    React.useEffect(() => {
        if (mount.current) {
            setPrice({
                priceRange: item.price_range,
                priceTiers: item.price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: item.__typename,
                specialFromDate: item.special_from_date,
                specialToDate: item.special_to_date,
            });
            setBanner(bannerData);
        }
    }, [item]);

    const [addWishlist] = mutationAddWishlist();
    const handleWishlist = () => {
        if (isLogin && isLogin === 1) {
            // GTM UA dataLayer
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: item.name,
                    label: item.name,
                    ecommerce: {
                        currencyCode: item.price_range.minimum_price.regular_price.currency || 'USD',
                        add: {
                            products: [
                                {
                                    name: item.name,
                                    id: item.sku,
                                    price: item.price_range.minimum_price.regular_price.value || 0,
                                    category: item.categories.length > 0 ? item.categories[0].name : '',
                                    list: item.categories.length > 0 ? item.categories[0].name : '',
                                    dimensions4: item.stock_status,
                                },
                            ],
                        },
                    },
                },
            });
            // GA 4 dataLayer
            TagManager.dataLayer({
                dataLayer: {
                    ecommerce: {
                        action: {
                            items: [
                                {
                                    currency: item.price_range.minimum_price.regular_price.currency,
                                    item_name: item.name,
                                    item_id: item.sku,
                                    price: item.price_range.minimum_price.regular_price.value || 0,
                                    item_category: item.categories.length > 0 ? item.categories[0].name : '',
                                    item_stock_status: item.stock_status,
                                },
                            ],
                        },
                    },
                    event: 'add_to_wishlist',
                },
            });
            addWishlist({
                variables: {
                    productId: item.id,
                },
            })
                .then(async () => {
                    await setWishlist(!wishlist);
                    await window.toastMessage({ open: true, variant: 'success', text: t('common:message:feedSuccess') });
                    route.push('/wishlist');
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

    let expandData = [];
    if (item.description.html) {
        expandData = [
            ...expandData,
            {
                title: 'Detail',
                type: 'html',
                content: item.description.html,
            },
        ];
    }
    if (item.more_info && item.more_info.length > 0) {
        expandData = [
            ...expandData,
            {
                title: 'More Info',
                type: 'array',
                content: item.more_info,
            },
        ];
    }

    const breadcrumbsData = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            let breadCrumbResult = [];
            const lastCategory = getCookies('lastCategory');
            const cat = item.categories.filter(({ url_path }) => url_path === lastCategory);
            if (cat.length > 0) {
                if (cat[0].breadcrumbs && cat[0].breadcrumbs.length > 0) {
                    breadCrumbResult = cat[0].breadcrumbs.map((bc) => ({
                        label: bc.category_name,
                        link: `/${bc.category_url_path}`,
                        active: false,
                        id: bc.category_id,
                    }));
                }
                breadCrumbResult.push({
                    label: cat[0].name,
                    link: `/${cat[0].url_path}`,
                    active: false,
                    id: cat[0].id,
                });
            }

            breadCrumbResult.push({
                label: item.name,
                link: '#',
                active: true,
            });
            return breadCrumbResult;
        }
        return [];
    }, [item]);

    const handleOption = () => {
        const { productAvailableToCart } = features;
        // eslint-disable-next-line no-underscore-dangle
        if (productAvailableToCart[item.__typename]) {
            setOpenOption(true);
        } else {
            window.toastMessage({
                variant: 'warning',
                text: t('product:productNotAvailable'),
                open: true,
            });
        }
    };

    const handleSetCompareList = (id_compare) => {
        window.backdropLoader(true);
        const uid_product_compare = getCookies('uid_product_compare');
        const uids = [];
        let uid_customer = '';
        uids.push(id_compare.toString());
        if (isLogin) {
            /* eslint-disable */
            uid_customer = dataUid ? (dataUid.customer.compare_list ? dataUid.customer.compare_list.uid : '') : '';
            /* eslint-enable */
        }
        let isExist = false;
        if (dataCompare && dataCompare.items && dataCompare.items.length > 0) {
            dataCompare.items.map((itemCompare) => {
                if (itemCompare.uid === id_compare.toString()) {
                    isExist = true;
                }
                return null;
            });
        }
        if (!isExist) {
            addProductCompare({
                variables: {
                    uid: isLogin ? uid_customer : uid_product_compare,
                    products: uids,
                },
            })
                .then(async (res) => {
                    client.writeQuery({
                        query: localCompare,
                        data: {
                            item_count: res.data.addProductsToCompareList.item_count,
                            items: res.data.addProductsToCompareList.items,
                        },
                    });
                    if (isLogin) {
                        refetchCustomerUid();
                    }
                    window.backdropLoader(false);
                    window.toastMessage({ open: true, variant: 'success', text: t('common:productCompare:successCompare') });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: debuging.originalError ? e.message.split(':')[1] : t('common:productCompare:failedCompare'),
                    });
                });
        } else {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('common:productCompare:existProduct'),
            });
        }
    };

    const handleOpenImageDetail = React.useCallback((e, idx) => {
        e.preventDefault();
        setOpenImageDetail(!openImageDetail);
        setSelectedImgIdx(idx);
    }, [openImageDetail]);

    const checkCustomizableOptionsValue = React.useCallback(async () => {
        if (item.options && item.options.length > 0) {
            const requiredOptions = item.options.filter((op) => op.required);
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
    }, [item?.options, customizableOptions]);

    React.useEffect(() => {
        if (mount.current && errorCustomizableOptions && errorCustomizableOptions.length > 0) {
            // eslint-disable-next-line consistent-return
            const errorCustomizable = errorCustomizableOptions.filter((err) => {
                const findValue = customizableOptions.find((op) => op.option_id === err.option_id);
                return !findValue;
            });
            setErrorCustomizableOptions(errorCustomizable);
        }
    }, [customizableOptions]);

    let enablePopupImage = false;
    if (storeConfig && storeConfig.pwa) {
        enablePopupImage = storeConfig.pwa.popup_detail_image_enable;
    }

    return (
        <Content
            dataSeller={itemData}
            data={{
                ...product.items[keyProduct],
                weltpixel_labels,
            }}
            t={t}
            openOption={openOption}
            handleOption={handleOption}
            setOpenOption={setOpenOption}
            setBanner={setBanner}
            setPrice={setPrice}
            openShare={openShare}
            setOpenShare={setOpenShare}
            route={route}
            banner={banner}
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            breadcrumbsData={breadcrumbsData}
            price={price}
            loadPrice={loadPrice}
            errorPrice={errorPrice}
            dataPrice={dataPrice}
            handleWishlist={handleWishlist}
            reviewValue={reviewValue}
            wishlist={wishlist}
            expandData={expandData}
            features={features}
            config={modules.catalog.pdp}
            openImageDetail={openImageDetail}
            handleOpenImageDetail={handleOpenImageDetail}
            selectedImgIdx={selectedImgIdx}
            stockStatus={stockStatus}
            setStockStatus={setStockStatus}
            customizableOptions={customizableOptions}
            setCustomizableOptions={setCustomizableOptions}
            errorCustomizableOptions={errorCustomizableOptions}
            checkCustomizableOptionsValue={checkCustomizableOptionsValue}
            additionalPrice={additionalPrice}
            setAdditionalPrice={setAdditionalPrice}
            smartProductTabs={dataProductTabs}
            isLogin={isLogin}
            handleSetCompareList={handleSetCompareList}
            enablePopupImage={enablePopupImage}
            enableMultiSeller={enableMultiSeller}
            storeConfig={storeConfig}
            handleChat={handleChat}
            showChat={showChat}
            currencyCache={currencyCache}
        />
    );
};

const PageDetail = (props) => {
    let weltpixel_labels = [];
    const {
        slug, Content, t, isLogin, pageConfig, CustomHeader, storeConfig,
    } = props;

    const context = isLogin && isLogin === 1 ? { request: 'internal' } : {};

    /**
     * Check if partial data exists, AKA being navigated from a PLP or search page.
     */
    const router = useRouter();
    const routePaths = router.asPath.substr(1);
    const routeKey = routePaths.split('?');
    const productProps = router.query.productProps ? JSON.parse(router.query.productProps) : {};
    const productVariables = Object.keys(productProps).length > 0
        ? {
            variables: {
                includeName: productProps.name && productProps.name !== '',
                includePrice: productProps.price && true,
                includeImg: productProps.small_image?.url && true,
                url: slug[0],
            },
        }
        : {
            variables: {
                url: slug[0],
            },
        };

    const labels = getProductLabel(storeConfig, { context, variables: { url: slug[0] } });
    const { loading, data, error } = getProduct(storeConfig, { ...productVariables });
    const [getProdPrice, { data: dataPrice, loading: loadPrice, error: errorPrice }] = getProductPrice(
        storeConfig.pwa || {},
    );
    const [getProductTabs, { data: dataProductTabs }] = smartProductTabs();

    const product = React.useMemo(() => {
        let productResult = {};
        let temporaryArr = [];
        let productByUrlMemo;
        if (data) {
            productResult = data.products;
            if (Object.keys(productProps).length > 0) {
                for (let i = 0; i < productResult.items.length; i += 1) {
                    if (routeKey[0] === productResult.items[i].url_key) {
                        productByUrlMemo = [i];
                    }
                }
                productResult = {
                    ...productResult,
                    items: [
                        {
                            ...productResult.items[productByUrlMemo],
                            name: productProps.name || '',
                            small_image: productProps.small_image || {},
                            price: productProps.price || {},
                            price_range: { ...productProps.price.priceRange },
                            price_tiers: { ...productProps.price.priceTiers },
                            special_from_date: { ...productProps.price.specialFromDate },
                            special_to_date: { ...productProps.price.specialToDate },
                        },
                    ],
                };
            }
            if (typeof window !== 'undefined') {
                if (productResult.items.length > 0) {
                    for (let i = 0; i < productResult.items.length; i += 1) {
                        if (routeKey[0] === productResult.items[i].url_key) {
                            productByUrlMemo = [i];
                        }
                    }
                    const item = productResult.items[productByUrlMemo];
                    let isExist = false;
                    const viewedProduct = getLocalStorage('recently_viewed_product_pwa');

                    if (viewedProduct) {
                        temporaryArr = viewedProduct;
                        if (viewedProduct.length > 0) {
                            viewedProduct.map((val) => {
                                if (val.url_key === item.url_key) {
                                    isExist = true;
                                }
                                return null;
                            });
                        }
                    }
                    if (isExist === false) {
                        temporaryArr = [];

                        const newItem = {
                            url_key: item.url_key,
                        };
                        temporaryArr.push(newItem);
                        setLocalStorage('recently_viewed_product_pwa', temporaryArr);
                    }
                }
            }
        }

        return productResult;
    }, [data, productProps]);

    const productByUrl = React.useMemo(() => {
        let productByUrlResult;
        if (product?.items) {
            for (let i = 0; i < product.items.length; i += 1) {
                if (routeKey[0] === product.items[i].url_key) {
                    productByUrlResult = [i];
                }
            }
        }
        return productByUrlResult;
    }, [product]);

    const productTab = React.useMemo(() => {
        let productTabResult = {
            tab_1: {
                label: null,
                content: null,
            },
        };
        const productItem = dataProductTabs?.products;
        if (productItem?.items?.length > 0) {
            productTabResult = productItem.items[0].smartProductTabs
                ? productItem.items[0].smartProductTabs
                : {
                    tab_1: {
                        label: null,
                        content: null,
                    },
                };
        }
        return productTabResult;
    }, [dataProductTabs]);

    // cache currency
    const currencyCache = useReactiveVar(currencyVar);

    // cache price
    const cachePrice = useReactiveVar(priceVar);

    React.useEffect(() => {
        if (slug[0] !== '') {
            getProductTabs({
                variables: {
                    filter: {
                        url_key: {
                            eq: slug[0],
                        },
                    },
                },
            });
        }
    }, [slug[0]]);

    const generateIdentifier = slug[0].replace(/ /g, '-');

    React.useEffect(() => {
        if (!cachePrice[generateIdentifier]) {
            getProdPrice({
                context,
                variables: {
                    url: slug[0],
                },
            });
        }
    }, [data, slug]);

    React.useEffect(() => {
        if (dataPrice) {
            const identifier = generateIdentifier;
            const dataTemp = cachePrice;
            dataTemp[identifier] = dataPrice;
            priceVar({
                ...cachePrice,
            });
        }
    }, [dataPrice, slug]);

    if (error || loading || !data) {
        return (
            <Layout pageConfig={{}} CustomHeader={CustomHeader ? <CustomHeader /> : <Header />} {...props}>
                <Loading
                    name={productProps.name || ''}
                    price={productProps.price || 0}
                    banner={productProps.small_image ? [{ link: '#', imageUrl: productProps.small_image?.url, videoUrl: '#' }] : []}
                    storeConfig={storeConfig}
                />
            </Layout>
        );
    }

    if (product?.items?.length === 0) return <Error statusCode={404} />;

    if (labels.data && labels.data.products && labels.data.products.items.length > 0 && labels.data.products.items[0].weltpixel_labels) {
        weltpixel_labels = labels.data.products.items[0].weltpixel_labels;
    }

    const schemaOrg = generateSchemaOrg(product.items[productByUrl]);
    let keywords = {};
    if (product.items[productByUrl]?.meta_keywords) {
        keywords = {
            type: 'meta',
            value: product.items[productByUrl]?.meta_keywords,
        };
    }
    const config = {
        title: product.items[productByUrl].meta_title || product.items[productByUrl].name || '',
        bottomNav: false,
        header: 'absolute', // available values: "absolute", "relative", false (default)
        pageType: 'product',
        ogContent: {
            description: {
                type: 'meta',
                value: StripHtmlTags(product.items[productByUrl].meta_description || product.items[productByUrl].description.html),
            },
            keywords,
            'og:image': product.items[productByUrl].small_image.url,
            'og:image:type': 'image/jpeg',
            'og:description': StripHtmlTags(product.items[productByUrl].description.html),
            'og:image:width': storeConfig?.pwa?.image_product_width,
            'og:image:height': storeConfig?.pwa?.image_product_height,
            'og:image:alt': product.items[productByUrl].name || '',
            'og:type': 'product',
            'product:availability': product.items[productByUrl].stock_status,
            'product:category':
                product.items[productByUrl].categories
                && product.items[productByUrl].categories.length > 0
                && product.items[productByUrl].categories[0].name,
            'product:condition': 'new',
            'product:price:currency': product.items[productByUrl].price_range.minimum_price.final_price.currency,
            'product:price:amount': product.items[productByUrl].price_range.minimum_price.final_price.value,
            'product:pretax_price:currency': product.items[productByUrl].price_range.minimum_price.final_price.currency,
            'product:pretax_price:amount': product.items[productByUrl].price_range.minimum_price.final_price.value,
            'og:title': product.items[productByUrl].meta_title || product.items[productByUrl].name,
        },
        schemaOrg,
    };

    return (
        <Layout
            isShowChat={false}
            pageConfig={pageConfig || config}
            CustomHeader={CustomHeader ? <CustomHeader /> : <Header />}
            {...props}
            data={data}
            isPdp
        >
            <ContentDetail
                keyProduct={productByUrl}
                product={product}
                dataPrice={getPrice(cachePrice, generateIdentifier, dataPrice)}
                loadPrice={loadPrice}
                errorPrice={errorPrice}
                t={t}
                Content={Content}
                isLogin={isLogin}
                weltpixel_labels={weltpixel_labels}
                dataProductTabs={productTab}
                storeConfig={storeConfig}
                currencyCache={currencyCache}
            />
        </Layout>
    );
};

export default PageDetail;
