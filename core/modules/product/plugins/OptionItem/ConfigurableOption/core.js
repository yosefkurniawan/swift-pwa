/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { modules } from '@config';
import {
    addConfigurableProductsToCart, getConfigurableProduct, getCustomerCartId, getGuestCartId as queryGetGuestCartId,
} from '@core_modules/product/services/graphql';
import { getLoginInfo } from '@helper_auth';
import { getCartId, setCartId } from '@helper_cartid';
import ProductByVariant, { generateAvailableCombination, generateValue, handleSelected } from '@helper_productbyvariant';
import Router from 'next/router';
import React from 'react';
import TagManager from 'react-gtm-module';

const OptionsItemConfig = (props) => {
    const {
        setBanner = () => {},
        setPrice = () => {},
        t,
        data,
        dataPrice,
        setOpen = () => {},
        ConfigurableView,
        Footer,
        setStockStatus = () => {},
        stockStatus = '',
        handleAddToCart: CustomAddToCart,
        View,
        loading: customLoading,
        setLoading: setCustomLoading,
        checkCustomizableOptionsValue,
        errorCustomizableOptions,
        customizableOptions,
        handleSelecteProduct = () => {},
        isGrid,
        noValidate = false,
        ...other
    } = props;
    // console.log('dataPrice', dataPrice);
    // console.log('isi data', data);

    const { storeConfig = {} } = props;

    const {
        __typename, sku, media_gallery, image, price_range, price_tiers, small_image, name, categories, url_key, stock_status, review, sale,
    } = data;

    const reviewValue = parseInt(review?.rating_summary, 0) / 20;
    const [selectConfigurable, setSelectConfigurable] = React.useState({});
    const [selectedProduct, setSelectedProduct] = React.useState({});
    const [qty, setQty] = React.useState(1);
    let [loading, setLoading] = React.useState(false);
    const mount = React.useRef(null);

    if (typeof customLoading !== 'undefined' && typeof setCustomLoading === 'function') {
        loading = customLoading;
        setLoading = setCustomLoading;
    }

    const configProduct = getConfigurableProduct(storeConfig, { variables: { sku } });

    const [firstSelected, setFirstSelected] = React.useState({});
    const [combination, setCombination] = React.useState({});
    const [options, setOptions] = React.useState([]);

    const handleSelect = async (value, key) => {
        const selectedOption = handleSelected(selectConfigurable, key, value);
        const comb = configProduct.data && generateAvailableCombination(selectedOption, configProduct.data.products.items[0]);
        setCombination({ ...comb });
        setSelectConfigurable({
            ...selectedOption,
        });
        const product = await ProductByVariant(selectedOption, configProduct.data.products.items[0].variants);
        const productPrice = await ProductByVariant(selectedOption, dataPrice[0].variants);
        if (product && JSON.stringify(product) !== '{}') {
            setSelectedProduct({
                ...product,
                ...productPrice,
            });
            handleSelecteProduct({
                ...product,
                ...productPrice,
            });
            const bannerData = [];
            if (product.media_gallery.length > 0) {
                // eslint-disable-next-line array-callback-return
                product.media_gallery.map((media) => {
                    bannerData.push({
                        link: '#',
                        imageUrl: media.url,
                    });
                });
            } else {
                let imageUrl = '';
                if (product.image) {
                    imageUrl = product.image.url;
                } else if (product.small_image) {
                    imageUrl = product.small_image.url;
                }
                bannerData.push({
                    link: '#',
                    imageUrl,
                });
            }
            setBanner(bannerData);
            setPrice({
                priceRange: productPrice.price_range,
                priceTiers: productPrice.price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: product.__typename,
            });
            setStockStatus(product.stock_status);
        } else {
            const bannerData = [];
            if (media_gallery && media_gallery.length > 0) {
                // eslint-disable-next-line array-callback-return
                media_gallery.map((media) => {
                    bannerData.push({
                        link: '#',
                        imageUrl: media.url,
                    });
                });
            } else {
                let imageUrl = '';
                if (image) {
                    imageUrl = image.url;
                } else if (small_image) {
                    imageUrl = small_image.url;
                }
                bannerData.push({
                    link: '#',
                    imageUrl,
                });
            }
            setBanner(bannerData);
            setPrice({
                priceRange: price_range,
                priceTiers: price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: __typename,
            });
            setStockStatus(stock_status);
            handleSelecteProduct({ ...data });
        }

        firstSelected.code = key;
        firstSelected.value = value;
        await setFirstSelected({ ...firstSelected });
    };

    let cartId = '';
    let isLogin = 0;

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }

    const [addConfigurableProducts] = addConfigurableProductsToCart();
    const [getGuestCartId] = queryGetGuestCartId();
    const cartUser = getCustomerCartId();

    const [error, setError] = React.useState({});

    const addToCart = async () => {
        let customizable_options = [];
        const entered_options = [];
        const uids = [];
        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            customizableOptions.map((op) => {
                if (customizable_options.length > 0) {
                    /**
                     * Marking this as potential unused code
                     */
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
                    } else if (op.__typename === 'CustomizableFieldValue' || op.__typename === 'CustomizableAreaValue') {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        uids.push(op.uid);
                    }
                }
                /** Mark ends here */
                if (customizable_options.length === 0) {
                    if (
                        op.__typename === 'CustomizableFieldValue'
                        || op.__typename === 'CustomizableAreaValue'
                        || op.__typename === 'CustomizableDateValue'
                    ) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        uids.push(op.uid);
                    }
                }
                return op;
            });
        }
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        const errorData = {};
        if (!noValidate) {
            // eslint-disable-next-line array-callback-return
            configProduct.data.products.items[0].configurable_options.map((option) => {
                if (selectConfigurable[option.attribute_code] === '' || !selectConfigurable[option.attribute_code]) {
                    errorData[option.attribute_code] = `${option.attribute_code} ${t('validate:required')}`;
                }
            });
        }
        setError(errorData);

        // prettier-ignore
        /**
         * Find attributes that have the same 'selectConfigurable' values
         * eg: color with the value of 52, size with the value of 24, etc.
         */
        const selectedVariantAttrs = configProduct.data.products.items[0].variants
            .find((variant) => variant.attributes
                .every((attr) => Object.keys(selectConfigurable)
                    .some((sc) => sc === attr.code && selectConfigurable[sc] === attr.value_index)));

        if (JSON.stringify(errorData) === '{}') {
            if (CustomAddToCart && typeof CustomAddToCart === 'function') {
                CustomAddToCart({
                    parentProduct: {
                        ...data,
                        qty: parseFloat(qty),
                    },
                    childProduct: {
                        ...selectedProduct,
                        qty: parseFloat(qty),
                    },
                    customizable_options,
                    entered_options,
                });
            } else {
                setLoading(true);
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
                                setLoading(false);
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
                if (__typename === 'ConfigurableProduct') {
                    const variables = {
                        cartId,
                        cartItems: [
                            {
                                quantity: parseFloat(qty),
                                sku,
                                selected_options: [...selectedVariantAttrs.attributes.map((selectedOpt) => selectedOpt.uid), ...uids],
                                entered_options,
                            },
                        ],
                    };

                    // GTM UA dataLayer
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
                                            dimensions4: stockStatus,
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
                                            item_stock_status: stockStatus,
                                            item_reviews_score: reviewValue,
                                            item_reviews_count: review?.reviews_count,
                                            item_sale_product: sale === 0 ? 'NO' : 'YES',
                                        },
                                    ],
                                },
                            },
                        },
                    });

                    addConfigurableProducts({
                        variables,
                    })
                        .then(() => {
                            window.reloadCartQty = true;
                            window.toastMessage({ variant: 'success', text: t('product:successAddCart'), open: true });
                            setLoading(false);
                            setOpen(false);
                        })
                        .catch((e) => {
                            const originalError = e.message.includes(':') ? e.message.split(':')[1] : e.message;
                            if (e.message === "The product's required option(s) weren't entered. Make sure the options are entered and try again.") {
                                Router.push(`/${url_key}`);
                            }
                            setLoading(false);
                            window.toastMessage({
                                ...errorMessage,
                                text: originalError || errorMessage.text,
                            });
                        });
                }
            }
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

    /**
     * [useEffect] for react lifecycle
     */
    React.useEffect(() => {
        mount.current = true;
        // eslint-disable-next-line no-return-assign
        return () => (mount.current = false);
    }, []);

    React.useEffect(() => {
        if (mount.current) {
            if (
                configProduct.data
                && configProduct.data.products.items.length > 0
                && options.length === 0
                && configProduct.data.products.items[0].configurable_options
            ) {
                const op = generateValue(selectConfigurable, configProduct.data.products.items[0].configurable_options, combination);
                setOptions(op);
            }
        }
    }, [configProduct]);

    React.useMemo(() => {
        // eslint-disable-next-line max-len
        if (mount.current && configProduct.data && configProduct.data.products.items.length > 0 && configProduct.data.products.items[0].configurable_options) {
            const op = generateValue(selectConfigurable, configProduct.data.products.items[0].configurable_options, combination);
            setOptions(op);
        }
    }, [selectConfigurable]);

    return (
        <View
            options={options}
            handleSelect={handleSelect}
            error={error}
            configProduct={configProduct}
            selected={selectConfigurable}
            qty={qty}
            handleAddToCart={handleAddToCart}
            setQty={setQty}
            t={t}
            loading={loading || configProduct.loading}
            disabled={!selectedProduct || !selectedProduct.sku || stockStatus === 'OUT_OF_STOCK'}
            isGrid={isGrid}
            disableItem={stock_status === 'OUT_OF_STOCK'}
            {...other}
        />
    );
};

export default OptionsItemConfig;
