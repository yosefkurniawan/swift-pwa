/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useApolloClient } from '@apollo/client';
import { getLoginInfo } from '@helper_auth';
import { getCartId, setCartId } from '@helper_cartid';
import { formatPrice } from '@helper_currency';
import TagManager from 'react-gtm-module';
import { localTotalCart } from '@services/graphql/schema/local';
import {
    addBundleProductsToCart,
    getBundleProduct,
    getGuestCartId as queryGetGuestCartId,
    getCustomerCartId,
} from '../../../../../../services/graphql';

const generateBundlePrice = (items, isDynamicPrice) => {
    let price = 0;
    let currency = 'USD';
    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const qty = element.qty ? element.qty : 1;
        for (let idx = 0; idx < element.options.length; idx++) {
            const opt = element.options[idx];
            const final_price = isDynamicPrice === false ? opt.price : opt.product.price_range.minimum_price.final_price.value;
            currency = opt.product.price_range.minimum_price.final_price.currency;
            if (opt.is_default) {
                price += opt.quantity * final_price * qty;
            }
        }
    }

    return formatPrice(price, currency);
};

const changeSelectedOption = (position, id, items) => {
    const result = [];
    for (let index = 0; index < items.length; index++) {
        // need to create new object because read only from graph ql
        const element = { ...items[index] };
        const optionArr = [];
        if (element.position === parseInt(position)) {
            for (let idx = 0; idx < element.options.length; idx++) {
                const opt = { ...element.options[idx] };
                if (element.type === 'radio' || element.type === 'select') {
                    opt.is_default = opt.id === parseInt(id);
                } else if ((element.type === 'checkbox' || element.type === 'multi') && opt.id === parseInt(id)) {
                    opt.is_default = !opt.is_default;
                }
                optionArr.push(opt);
            }
            element.options = optionArr;
        }

        result.push(element);
    }

    return result;
};

const changeQtyOption = (position, qty, items) => {
    const result = [];
    for (let index = 0; index < items.length; index++) {
        // need to create new object because read only from graph ql
        const element = { ...items[index] };
        if (element.position === parseInt(position)) {
            element.qty = qty;
        }
        result.push(element);
        // element.qty = qty;
    }

    return result;
};

const OptionsItemsBundle = (props) => {
    const {
        t,
        data: {
            __typename, sku, name, categories, price_range, stock_status, review, sale,
        },
        BundleView,
        Footer,
    } = props;
    const reviewValue = parseInt(review.rating_summary, 10) / 20;
    const client = useApolloClient();
    const [items, setItems] = React.useState([]);
    const [loadingAdd, setLoadingAdd] = React.useState(false);

    const configProduct = getBundleProduct(sku);
    const { loading } = configProduct;
    let cartId = '';
    let isLogin = 0;

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }

    React.useEffect(() => {
        if (items.length === 0 && configProduct.data && configProduct.data.products) {
            setItems([...configProduct.data.products.items[0].items]);
        }
    }, [configProduct.data]);

    const [addCartBundle] = addBundleProductsToCart();
    const [getGuestCartId] = queryGetGuestCartId();
    const cartUser = getCustomerCartId();

    const handleAddToCart = async (qty) => {
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        if (!cartId || cartId === '' || cartId === undefined) {
            if (!isLogin) {
                setLoadingAdd(true);
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
            } else {
                const token = cartUser.data.customerCart.id || '';
                cartId = token;
                setCartId(token);
            }
        }
        if (__typename === 'BundleProduct') {
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
                                    category: categories.length > 0 ? categories[0].name : '',
                                    list: categories.length > 0 ? categories[0].name : '',
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
                                    item_category: categories.length > 0 ? categories[0].name : '',
                                    item_list_name: categories.length > 0 ? categories[0].name : '',
                                    quantity: qty,
                                    currency: price_range.minimum_price.regular_price.currency || 'USD',
                                    item_stock_status: stock_status,
                                    item_reviews_score: reviewValue,
                                    item_reviews_count: review.reviews_count,
                                    item_sale_product: sale === 0 ? 'NO' : 'YES',
                                },
                            ],
                        },
                    },
                },
            });

            const options = [];
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                const value = [];
                for (let idx = 0; idx < element.options.length; idx++) {
                    const opt = element.options[idx];
                    if (opt.is_default) {
                        value.push(opt.id.toString());
                    }
                }
                options.push({
                    id: element.option_id,
                    quantity: element.qty || 1,
                    value,
                });
            }

            const cartItems = { data: { sku, quantity: qty }, bundle_options: options };
            setLoadingAdd(true);
            addCartBundle({
                variables: {
                    cartId,
                    cartItems,
                },
            })
                .then((res) => {
                    client.writeQuery({ query: localTotalCart, data: { totalCart: res.data.addBundleProductsToCart.cart.total_quantity } });
                    window.toastMessage({
                        variant: 'success',
                        text: t('product:successAddCart'),
                        open: true,
                    });
                    setLoadingAdd(false);
                })
                .catch((e) => {
                    const originalError = e.message.includes(':') ? e.message.split(':')[1] : e.message;
                    setLoadingAdd(false);
                    window.toastMessage({
                        ...errorMessage,
                        text: originalError || errorMessage.text,
                    });
                });
        }
    };

    const selectOptions = React.useCallback((group, id) => {
        const itemsUpdate = changeSelectedOption(group.position, id, items);
        setItems([...itemsUpdate]);
    }, [items]);

    const changeQty = React.useCallback((position, qty) => {
        const itemsUpdate = changeQtyOption(position, qty, items);
        setItems([...itemsUpdate]);
    }, [items]);

    return (
        <BundleView
            data={configProduct.data}
            items={items}
            selectOptions={selectOptions}
            changeQty={changeQty}
            generateBundlePrice={generateBundlePrice}
            handleAddToCart={handleAddToCart}
            loading={loading || loadingAdd}
            t={t}
            disabled={stock_status === 'OUT_OF_STOCK'}
        />
    );
};

export default OptionsItemsBundle;
