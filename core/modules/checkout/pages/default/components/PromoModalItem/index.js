/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React from 'react';
import { getProductBySku } from '../../../../../product/services/graphql';
import { addProductToCartPromo } from '../../../../services/graphql';

const PromoModalItem = (props) => {
    const {
        t, checkout, setCheckout, PromoModalItemView,
    } = props;
    const dataArray = [];

    const [open, setOpen] = React.useState(false);
    const [mutationAddToCart] = addProductToCartPromo();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleAddToCart = async (data) => {
        let state = {
            ...checkout,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: true,
                extraFee: false,
                order: true,
            },
        };
        await setCheckout(state);
        await window.backdropLoader(true);
        await handleClose();
        mutationAddToCart({
            variables: {
                cart_id: checkout.data.cart.id,
                cart_items: [{
                    quantity: 1,
                    sku: data.sku,
                    promo_item_data: {
                        ruleId: data.freeItemsData.promo_item_data.ruleId,
                        minimalPrice: data.freeItemsData.promo_item_data.minimalPrice,
                        discountItem: data.freeItemsData.promo_item_data.discountItem,
                        isDeleted: data.freeItemsData.promo_item_data.isDeleted,
                        qtyToProcess: data.freeItemsData.promo_item_data.qtyToProcess,
                    },
                }],
            },
        }).then(async (res) => {
            state = {
                ...checkout,
            };
            if (res && res.data && res.data.addProductsToCartPromo && res.data.addProductsToCartPromo.cart) {
                state.data.cart = {
                    ...state.data.cart,
                    ...res.data.addProductsToCartPromo.cart,
                };
            }
            await setCheckout(state);
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('checkout:message:addFreeItemPromoSuccess'),
                variant: 'success',
            });
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('checkout:message:addFreeItemPromoFailed'),
                variant: 'error',
            });
        });

        const finalState = {
            ...checkout,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: false,
                extraFee: false,
                order: false,
            },
        };
        await setCheckout(finalState);
    };

    if (checkout && checkout.data) {
        if (checkout.data.cart) {
            if (checkout.data.cart.available_free_items) {
                if (checkout.data.cart.available_free_items.length > 0) {
                    for (const [key, value] of Object.entries(checkout.data.cart.available_free_items)) {
                        // console.log(value.sku, key);
                        dataArray.push(value.sku);
                    }
                }
            }
        }
    }
    let itemsData = [];
    if (dataArray) {
        const { data } = getProductBySku({ variables: { sku: dataArray } });
        if (data && data.products) {
            if (data.products.items.length > 0) {
                const items = [];
                let qtyFreeItem = 0;
                for (let idx = 0; idx < data.products.items.length; idx += 1) {
                    const item = data.products.items[idx];
                    const product = checkout.data.cart.items.filter((pd) => pd.product.sku === item.sku);
                    const freeItemsData = checkout.data.cart.available_free_items.filter((val) => val.sku === item.sku);
                    if (product && product.length > 0) {
                        if (product && product.length > 0 && product[0].quantity) {
                            qtyFreeItem += product[0].quantity;
                        }
                    }
                    items.push({
                        freeItemsData: freeItemsData[0],
                        ...item,
                    });
                }

                if (qtyFreeItem < checkout.data.cart.available_free_items[0].quantity) {
                    itemsData = items;
                }
            }
        }
    }

    if (itemsData && itemsData.length > 0) {
        return (
            <PromoModalItemView
                {...props}
                items={itemsData}
                handleAddToCart={handleAddToCart}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
            />
        );
    }

    return null;
};

export default PromoModalItem;
