/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-mixed-operators */
import { useRouter } from 'next/router';
import { formatPrice } from '@helper_currency';

import Drawer from '@material-ui/core/Drawer';
import Skeleton from '@plugin_minicart/components/skeleton';
import ItemCart from '@plugin_minicart/components/product';
import useStyles from '@plugin_minicart/components/style';
import PaypalButtonView from '@plugin_paypalbutton';
import { getCheckoutScv2Url } from '@core_modules/cart/services/graphql';
import { getCartId } from '@helper_cartid';

const MiniComponent = (props) => {
    const router = useRouter();
    const {
        open, setOpen, count, t, loading, data, deleteCart, updateCart, errorCart, storeConfig, currencyCache,
    } = props;
    const styles = useStyles();
    const errorCartItems = data?.errorItems?.length > 0;
    const disabled = errorCartItems || errorCart && errorCart.length > 0;
    const subtotal_including_tax = data?.custom_total_price?.subtotal_including_tax?.value || 0;
    const subtotal_including_tax_currency = data?.custom_total_price?.subtotal_including_tax?.currency || 'IDR';
    const cartId = getCartId();
    const [getScv2Url] = getCheckoutScv2Url();
    
    return (
        <Drawer anchor="right" open={open} onClose={setOpen}>
            <div className={styles.container}>
                <div className={styles.mini_top} id="minicart-top">
                    <span>
                        {count}
                        {' '}
                        Items
                    </span>
                    <span>{t('common:cart:myCart')}</span>
                    <span onClick={setOpen}>{t('common:button:close')}</span>
                </div>
                {loading || !data.items ? <Skeleton /> : <ItemCart data={data.items} t={t} deleteCart={deleteCart} updateCart={updateCart} storeConfig={storeConfig} currencyCache={currencyCache} />}
                {data && data.total_quantity > 0 ? (
                    <div className={styles.mini_bottom}>
                        <div className="sub-total">
                            <span>
                                {t('common:cart:cardTotal')}
                                :
                            </span>
                            <span>{data.custom_total_price ? formatPrice(subtotal_including_tax, subtotal_including_tax_currency, currencyCache) : '-'}</span>
                        </div>
                        <div
                            id="plugin-minicart-editCartBtn"
                            className="edit-cart"
                            onClick={() => {
                                setOpen();
                                router.push('/checkout/cart');
                            }}
                        >
                            {t('common:button:viewandedit')}
                        </div>
                        {!disabled && (
                            <div className="checkout">
                                <div
                                    className="checkout-button"
                                    id="plugin-minicart-checkoutBtn"
                                    onClick={() => {
                                        const minimumOrderEnabled = storeConfig.minimum_order_enable;
                                        const grandTotalValue = data.custom_total_price.grand_total.value;
                                        const minimumOrderAmount = storeConfig.minimum_order_amount;
                                        if (minimumOrderEnabled && grandTotalValue < minimumOrderAmount) {
                                            const errorMessage = {
                                                variant: 'error',
                                                text: `Unable to place order: Minimum order amount is ${formatPrice(minimumOrderAmount, currencyCache)}`,
                                                open: true,
                                            };
                                            window.toastMessage({
                                                ...errorMessage,
                                            });
                                            setTimeout(() => {
                                                router.push('/checkout/cart');
                                            }, 3000);
                                        } else if (subtotal_including_tax) {
                                            if (storeConfig.pwacheckout?.enable === '1'
                                            && storeConfig.pwacheckout?.version === 'V2' && cartId) {
                                                getScv2Url({
                                                    variables: {
                                                        cart_id: cartId,
                                                    },
                                                })
                                                    .then((res) => {
                                                        window.location.replace(res.data.internalGetScv2Url.url);
                                                    })
                                                    .catch(() => {
                                                        window.toastMessage({
                                                            open: true,
                                                            text: t('common:cart:cartError'),
                                                            variant: 'error',
                                                        });
                                                    });
                                            } else {
                                                setOpen();
                                                router.push('/checkout');
                                            }
                                        } else {
                                            window.toastMessage({
                                                open: true,
                                                text: t('common:cart:cartError'),
                                                variant: 'error',
                                            });
                                        }
                                    }}
                                >
                                    {t('common:button:goCheckout')}
                                </div>
                            </div>
                        )}
                        {!disabled && data && (
                            <div className="btn-paypal">
                                <PaypalButtonView
                                    cart={data}
                                    t={t}
                                    storeConfig={storeConfig}
                                />
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        </Drawer>
    );
};

export default MiniComponent;
