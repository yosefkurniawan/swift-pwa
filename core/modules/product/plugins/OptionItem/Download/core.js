/* eslint-disable no-bitwise */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import { getCartId, setCartId } from '@helper_cartid';
import { getLoginInfo } from '@helper_auth';
import { handleSelectedDownload } from '@helper_productbyvariant';
import { modules } from '@config';
import Router from 'next/router';
import React from 'react';
import TagManager from 'react-gtm-module';
import {
    addDownloadProductToCart,
    getDownloadroduct,
    getGuestCartId as queryGetGuestCartId,
    getCustomerCartId,
} from '@core_modules/product/services/graphql';

const OptionsItemDownload = ({
    setOpen,
    setPrice,
    t,
    data,
    View,
    price,
    loading: customLoading,
    setLoading: setCustomLoading,
    checkCustomizableOptionsValue,
    errorCustomizableOptions,
    customizableOptions,
    priceData = [],
    ...other
}) => {
    const [qty, setQty] = React.useState(1);
    let cartId = '';
    let isLogin = 0;

    const {
        __typename, sku, name, categories, price_range, stock_status, url_key, review, sale,
    } = data;

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }

    const reviewValue = parseInt(review.rating_summary, 0) / 20;
    const [addCartDownload] = addDownloadProductToCart();
    const [getGuestCartId] = queryGetGuestCartId();
    const [items, setItems] = React.useState([]);
    const [selectDownloadable, setSelectDownloadable] = React.useState({});
    const cartUser = getCustomerCartId();
    const downloadProduct = getDownloadroduct(sku);
    const { loading } = downloadProduct;

    let [loadingAdd, setLoadingAdd] = React.useState(false);

    if (typeof customLoading !== 'undefined' && typeof setCustomLoading === 'function') {
        loadingAdd = customLoading;
        setLoadingAdd = setCustomLoading;
    }

    React.useEffect(() => {
        if (items.length === 0 && downloadProduct.data && downloadProduct.data.products) {
            setItems([...downloadProduct.data.products.items[0].downloadable_product_links]);
        }
    }, [downloadProduct.data]);

    const handleOption = (id, price_value) => {
        const initPrice = priceData[0]?.price_range?.minimum_price?.regular_price?.value;
        let final_price_sum = initPrice || 0;
        const selectedOption = handleSelectedDownload(selectDownloadable, id, price_value);
        setSelectDownloadable({
            ...selectedOption,
        });
        for (const [key, value] of Object.entries(selectedOption)) {
            final_price_sum += value;
        }
        const final_price_value = {
            ...price,
            priceRange: {
                ...price.priceRange,
                minimum_price: {
                    ...price.priceRange.minimum_price,
                    regular_price: {
                        ...price.priceRange.minimum_price.regular_price,
                        value: final_price_sum,
                    },
                    final_price: {
                        ...price.priceRange.minimum_price.final_price,
                        value: final_price_sum,
                    },
                },
            },
            update: true,
        };
        setPrice(final_price_value);
    };

    const addToCart = async () => {
        let customizable_options = [];
        const entered_options = [];
        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            customizableOptions.map((op) => {
                if (customizable_options.length > 0) {
                    const findOptions = customizable_options.find((item) => item.id === op.option_id);
                    if (findOptions) {
                        customizable_options = customizable_options.filter((item) => item.id !== op.option_id);
                        if (op.isEnteredOption) {
                            entered_options.push({
                                uid: op.uid,
                                value: `${findOptions.value_string},${op.value}`,
                            });
                        } else {
                            customizable_options.push({
                                id: op.option_id,
                                value_string: `${findOptions.value_string},${op.value}`,
                            });
                        }
                    } else if (op.isEnteredOption) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        customizable_options.push({
                            id: op.option_id,
                            value_string: op.value,
                        });
                    }
                }
                if (customizable_options.length === 0) {
                    if (op.isEnteredOption) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        customizable_options.push({
                            id: op.option_id,
                            value_string: op.value,
                        });
                    }
                }
                return op;
            });
        }
        const options = [];
        for (const [key, value] of Object.entries(selectDownloadable)) {
            options.push({ link_id: parseFloat(key) });
        }
        setLoadingAdd(true);
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        if (!cartId || cartId === '' || cartId === undefined) {
            if (!isLogin) {
                await getGuestCartId()
                    .then((res) => {
                        const token = res.data.createEmptyCart;
                        cartId = token;
                        setCartId(token);
                    })
                    .catch((e) => {
                        const originalError = e.message.includes(':') ? e.message.split(':')[1] : e.message;
                        setLoadingAdd(false);
                        window.toastMessage({
                            ...errorMessage,
                            text: originalError || errorMessage.text,
                        });
                    });
            } else if (cartUser.data && cartUser.data.customerCart) {
                const token = cartUser.data.customerCart.id || '';
                cartId = token;
                setCartId(token);
            }
        }
        if (__typename === 'DownloadableProduct') {
            // GTM UA dataaLayer
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToCart',
                    eventLabel: name,
                    ecommerce: {
                        currencyCode: price_range.minimum_price.regular_price.currency || 'USD',
                        add: {
                            products: [
                                {
                                    name,
                                    id: sku,
                                    price: price_range.minimum_price.regular_price.value || 0,
                                    category: categories?.length > 0 ? categories[0].name : '',
                                    list: categories?.length > 0 ? categories[0].name : '',
                                    quantity: qty,
                                    dimensions4: stock_status,
                                },
                            ],
                        },
                    },
                },
            });
            // GA 4 dataLayer
            TagManager.dataLayer({
                dataLayer: {
                    event: 'add_to_cart',
                    ecommerce: {
                        action: {
                            items: [
                                {
                                    item_name: name,
                                    item_id: sku,
                                    price: price_range.minimum_price.regular_price.value || 0,
                                    item_category: categories?.length > 0 ? categories[0].name : '',
                                    item_list_name: categories?.length > 0 ? categories[0].name : '',
                                    quantity: qty,
                                    currency: price_range.minimum_price.regular_price.currency || 'USD',
                                    item_stock_status: stock_status,
                                    item_reviews_score: reviewValue,
                                    item_reviews_count: review?.reviews_count,
                                    item_sale_product: sale === 0 ? 'NO' : 'YES',
                                },
                            ],
                        },
                    },
                },
            });
            addCartDownload({
                variables: {
                    cartId,
                    sku,
                    qty: parseFloat(qty),
                    download_product_link: options,
                    customizable_options,
                    entered_options,
                },
            })
                .then(() => {
                    window.reloadCartQty = true;
                    window.toastMessage({
                        variant: 'success',
                        text: t('product:successAddCart'),
                        open: true,
                    });
                    setLoadingAdd(false);
                    setOpen(false);
                })
                .catch((e) => {
                    const originalError = e.message.includes(':') ? e.message.split(':')[1] : e.message;
                    if (e.message === "The product's required option(s) weren't entered. Make sure the options are entered and try again.") {
                        Router.push(`/${url_key}`);
                    }
                    setLoadingAdd(false);
                    window.toastMessage({
                        ...errorMessage,
                        text: originalError || errorMessage.text,
                    });
                });
        }
    };

    const handleAddToCart = async () => {
        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            const check = await checkCustomizableOptionsValue();
            if (check) {
                addToCart();
            }
        } else {
            addToCart();
        }
    };

    return (
        <View
            items={items}
            handleAddToCart={handleAddToCart}
            handleOption={handleOption}
            t={t}
            qty={qty}
            setQty={setQty}
            loading={loadingAdd | loading}
            disabled={stock_status === 'OUT_OF_STOCK'}
        />
    );
};

export default OptionsItemDownload;
