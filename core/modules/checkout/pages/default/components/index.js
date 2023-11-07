import Button from '@common_button';
import Modal from '@common_confirmdialog';
import Typography from '@common_typography';
import Address from '@core_modules/checkout/pages/default/components/address';
import Confirmation from '@core_modules/checkout/pages/default/components/Confirmation';
import Credit from '@core_modules/checkout/pages/default/components/credit';
import Delivery from '@core_modules/checkout/pages/default/components/delivery';
import Email from '@core_modules/checkout/pages/default/components/email';
import ExtraFee from '@core_modules/checkout/pages/default/components/ExtraFee';
import GiftCard from '@core_modules/checkout/pages/default/components/giftcard';
import InStorePickup from '@core_modules/checkout/pages/default/components/instorepickup';
import OrderComment from '@core_modules/checkout/pages/default/components/OrderComment';
import PaymentList from '@core_modules/checkout/pages/default/components/payment';
import PickupInfo from '@core_modules/checkout/pages/default/components/PickupInformation';
import Promo from '@core_modules/checkout/pages/default/components/promo';
import PromoModalItem from '@core_modules/checkout/pages/default/components/PromoModalItem';
import RewardPoint from '@core_modules/checkout/pages/default/components/rewardpoint';
import Shipping from '@core_modules/checkout/pages/default/components/shipping';
import useStyles from '@core_modules/checkout/pages/default/components/style';
import Summary from '@core_modules/checkout/pages/default/components/summary';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { useState } from 'react';

const GimmickBanner = dynamic(() => import('@plugin_gimmickbanner'), { ssr: false });

const Content = (props) => {
    const {
        containerStyle,
        checkout,
        storeConfig,
        CashbackInfoView,
        chasbackMessage,
        DeliveryView,
        DeliverySkeleton,
        formik,
        t,
        setCheckout,
        isOnlyVirtualProductOnCart,
        handleOpenMessage,
        EmailView,
        config,
        updateFormik,
        AddressView,
        ShippingView,
        PaymentView,
        PromoView,
        GiftCardView,
        OrderCommentView,
        SummaryView,
        RewardPointView,
        StoreCreditView,
        modules,
        HeaderView,
        manageCustomer,
        ExtraFeeView,
        cartId,
        PromoModalItemView,
        paypalTokenData,
        paypalHandlingProps,
        setInitialOptionPaypal,
        initialOptionPaypal,
        setTokenData,
        refetchDataCart,
        refetchItemCart,
        ConfirmationView,
        checkoutTokenState,
        setCheckoutTokenState,
        setLoadingSellerInfo,
        loadingSellerInfo,
        currencyCache,
    } = props;

    const styles = useStyles();
    const SummaryRef = React.createRef();
    const { order: loading, all: disabled } = checkout.loading;
    const isSelectedPurchaseOrder = checkout.selected.payment === 'purchaseorder';
    // prettier-ignore
    const isPurchaseOrderApply = isSelectedPurchaseOrder && checkout.status.purchaseOrderApply;
    const travelokaPayRef = React.useRef();
    const stripeRef = React.useRef();
    const [clientSecret, setClientSecret] = useState(null);

    const [displayHowToPay, setDisplayHowToPay] = useState(false);
    const enableMultiSeller = storeConfig.enable_oms_multiseller === '1';
    const errorItems = checkout?.data?.errorItems;

    /**
     * [METHOD] handle click for place order
     */
    const handleClick = () => {
        if (stripeRef && stripeRef.current && clientSecret) {
            stripeRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        } else if (SummaryRef.current) {
            SummaryRef.current.handlePlaceOrder();
        }
    };

    /**
     * [VIEW]
     */
    return (
        <div id="checkout" className={classNames(styles.mobileBottomSpace, 'row between-lg')}>
            <div className="col-xs-12 center hidden-mobile">
                <HeaderView storeConfig={storeConfig} />
            </div>
            <Typography variant="h1" style={{ display: 'none' }}>
                Checkout
            </Typography>
            <Modal
                open={checkoutTokenState}
                handleYes={() => {
                    setCheckoutTokenState(!checkoutTokenState);
                    Router.reload();
                }}
                handleCancel={() => {
                    setCheckoutTokenState(!checkoutTokenState);
                    Router.push('/checkout/cart');
                }}
                yesNo
                message={`${t('checkout:invalidToken')}`}
                confirmationMessage={`${t('checkout:invalidTokenConfirmation')}`}
            />
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 center">
                {checkout && checkout.data && checkout.data.cart && checkout.data.cart.promoBanner.length > 0 && (
                    <GimmickBanner data={checkout.data.cart.promoBanner || []} />
                )}
            </div>
            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8" style={containerStyle || {}}>
                {modules.checkout.cashback.enabled && checkout.data.cart && checkout.data.cart.applied_cashback.is_cashback && (
                    <CashbackInfoView
                        message={chasbackMessage}
                        price={checkout.data.cart.applied_cashback.data[0].amount}
                        currency={storeConfig.base_currency_code}
                        promo_name={checkout.data.cart.applied_cashback.data[0].promo_name}
                    />
                )}

                {/* {modules.checkout.inStorePickup.enabled && (
                    <div className="row col-xs-12">
                        <div className="col-xs-6">
                            <Button onClick={() => setInStore(false)}>Shipping</Button>
                        </div>
                        <div className="col-xs-6">
                            <Button onClick={() => setInStore(true)}>In Store Pickup</Button>
                        </div>
                    </div>
                )} */}

                <>
                    {modules.checkout.pickupStore.enabled || modules.checkout.inStorePickup.enabled ? (
                        <Delivery
                            t={t}
                            DeliveryView={DeliveryView}
                            Skeleton={DeliverySkeleton}
                            formik={formik}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            storeConfig={storeConfig}
                            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                            checkoutTokenState={checkoutTokenState}
                            setCheckoutTokenState={setCheckoutTokenState}
                        />
                    ) : null}
                    <Email
                        t={t}
                        formik={formik}
                        EmailView={EmailView}
                        checkout={checkout}
                        config={config}
                        setCheckout={setCheckout}
                        handleOpenMessage={handleOpenMessage}
                        cartId={cartId}
                        checkoutTokenState={checkoutTokenState}
                        setCheckoutTokenState={setCheckoutTokenState}
                    />
                    {/* eslint-disable */ }
                    {checkout.selected.delivery === 'home' ? (
                        <Address
                            checkout={checkout}
                            t={t}
                            setCheckout={setCheckout}
                            defaultAddress={checkout.data.defaultAddress}
                            updateFormik={updateFormik}
                            AddressView={AddressView}
                            manageCustomer={manageCustomer}
                            storeConfig={storeConfig}
                            formik={formik}
                            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                            refetchDataCart={refetchDataCart}
                            refetchItemCart={refetchItemCart}
                            checkoutTokenState={checkoutTokenState}
                            setCheckoutTokenState={setCheckoutTokenState}
                            setLoadingSellerInfo={setLoadingSellerInfo}
                        />
                    ) : checkout.selected.delivery === 'pickup' ? (
                        <PickupInfo t={t} formik={formik} checkout={checkout} setCheckout={setCheckout} />
                    ) : (
                        <InStorePickup handleOpenMessage={handleOpenMessage} t={t} checkout={checkout} setCheckout={setCheckout} />
                    )}
                    <Shipping
                        t={t}
                        checkout={checkout}
                        setCheckout={setCheckout}
                        updateFormik={updateFormik}
                        formik={formik}
                        handleOpenMessage={handleOpenMessage}
                        storeConfig={storeConfig}
                        ShippingView={ShippingView}
                        isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                        checkoutTokenState={checkoutTokenState}
                        setCheckoutTokenState={setCheckoutTokenState}
                        setLoadingSellerInfo={setLoadingSellerInfo}
                        loadingSellerInfo={loadingSellerInfo}
                        currencyCache={currencyCache}
                    />

                    <div className={classNames(styles.block)}>
                        <Typography variant="h2" type="bold" letter="uppercase">
                            {t('checkout:feePromoLabel')}
                        </Typography>
                        <div className="row">
                            {modules.checkout.extraFee.enabled ? (
                                <ExtraFee
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    updateFormik={updateFormik}
                                    handleOpenMessage={handleOpenMessage}
                                    t={t}
                                    storeConfig={storeConfig}
                                    ExtraFeeView={ExtraFeeView}
                                    currencyCache={currencyCache}
                                />
                            ) : null}
                            {modules.promo.enabled ? (
                                <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                    <Promo
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        PromoView={PromoView}
                                    />
                                </div>
                            ) : null}
                            {modules.giftcard.enabled ? (
                                <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                    <GiftCard
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        GiftCardView={GiftCardView}
                                    />
                                </div>
                            ) : null}
                            {modules.rewardpoint.enabled ? (
                                <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6">
                                    <RewardPoint
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        RewardPointView={RewardPointView}
                                        currencyCache={currencyCache}
                                    />
                                </div>
                            ) : null}
                            {modules.storecredit.enabled ? (
                                <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6">
                                    <Credit
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        StoreCreditView={StoreCreditView}
                                        currencyCache={currencyCache}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <PaymentList
                        checkout={checkout}
                        setCheckout={setCheckout}
                        formik={formik}
                        updateFormik={updateFormik}
                        handleOpenMessage={handleOpenMessage}
                        t={t}
                        storeConfig={storeConfig}
                        PaymentView={PaymentView}
                        modules={modules}
                        paypalTokenData={paypalTokenData}
                        paypalHandlingProps={paypalHandlingProps}
                        setInitialOptionPaypal={setInitialOptionPaypal}
                        initialOptionPaypal={initialOptionPaypal}
                        setTokenData={setTokenData}
                        travelokaPayRef={travelokaPayRef}
                        stripeRef={stripeRef}
                        clientSecret={clientSecret}
                        setClientSecret={setClientSecret}
                        displayHowToPay={displayHowToPay}
                        setDisplayHowToPay={setDisplayHowToPay}
                        checkoutTokenState={checkoutTokenState}
                        refSummary={SummaryRef}
                        setCheckoutTokenState={setCheckoutTokenState}
                        config={config}
                    />

                    <Confirmation t={t} checkout={checkout} setCheckout={setCheckout} storeConfig={storeConfig} ConfirmationView={ConfirmationView} />
                    
                    {!enableMultiSeller ? (
                        <div className={classNames(styles.block)}>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                <OrderComment
                                    t={t}
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    handleOpenMessage={handleOpenMessage}
                                    formik={formik}
                                    storeConfig={storeConfig}
                                    OrderCommentView={OrderCommentView}
                                />
                            </div>
                        </div>
                    ) : null}
                </>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                <PromoModalItem
                    t={t}
                    storeConfig={storeConfig}
                    checkout={checkout}
                    setCheckout={setCheckout}
                    PromoModalItemView={PromoModalItemView}
                />
                <Summary
                    {...props}
                    loading={loading}
                    disabled={disabled}
                    checkout={checkout}
                    updateFormik={updateFormik}
                    setCheckout={setCheckout}
                    handleOpenMessage={handleOpenMessage}
                    formik={formik}
                    storeConfig={storeConfig}
                    SummaryView={SummaryView}
                    refSummary={SummaryRef}
                    isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                    travelokaPayRef={travelokaPayRef}
                    checkoutTokenState={checkoutTokenState}
                    setCheckoutTokenState={setCheckoutTokenState}
                />
            </div>
            <div className="col-xs-12 col-sm-8 hidden-mobile center">
                <Button
                    customRootStyle={{ marginBottom: 80, marginTop: 50 }}
                    onClick={handleClick}
                    fullWidth
                    loading={loading}
                    disabled={
                        errorItems ||
                        disabled ||
                        checkout.error.shippingAddress ||
                        (isSelectedPurchaseOrder && !isPurchaseOrderApply) ||
                        (storeConfig.minimum_order_enable && checkout.data.cart.prices.grand_total.value < storeConfig.minimum_order_amount)
                    }
                    className={classNames(styles.placeOrderDesktop, 'checkout-placeOrder-btn')}
                >
                    <Typography variant="span" letter="uppercase" type="bold" color="white">
                        {t('checkout:placeOrder')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default Content;