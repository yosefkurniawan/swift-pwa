import Grid from '@material-ui/core/Grid';
import Delivery from './delivery';
import Email from './email';
import Summary from './summary';
import Address from './address';
import Shipping from './shipping';
import PaymentList from './payment';
import Promo from './promo';
import GiftCard from './giftcard';
import RewardPoint from './rewardpoint';
import Credit from './credit';
import PickupInfo from './PickupInformation';

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
        handleOpenMessage,
        EmailView,
        config,
        updateFormik,
        AddressView,
        ShippingView,
        PaymentView,
        PromoView,
        GiftCardView,
        SummaryView,
        RewardPointView,
        StoreCreditView,
        modules,
        HeaderView,
    } = props;
    return (
        <div className="row">
            <div className="col-xs-12 center hidden-mobile">
                <HeaderView t={t} storeConfig={storeConfig} />
            </div>
            <div className="col-xs-12 col-sm-8 col-md-9" style={containerStyle || {}}>
                {
                    checkout.data.cart && checkout.data.cart.applied_cashback.is_cashback && (
                        <CashbackInfoView
                            message={chasbackMessage}
                            price={checkout.data.cart.applied_cashback.data[0].amount}
                            currency={storeConfig.base_currency_code}
                            promo_name={checkout.data.cart.applied_cashback.data[0].promo_name}
                        />
                    )
                }
                <>
                    {
                        storeConfig.pickup_store ? (
                            <Delivery
                                t={t}
                                DeliveryView={DeliveryView}
                                Skeleton={DeliverySkeleton}
                                formik={formik}
                                checkout={checkout}
                                setCheckout={setCheckout}
                                handleOpenMessage={handleOpenMessage}
                                storeConfig={storeConfig}
                            />
                        ) : null
                    }
                    <Email
                        t={t}
                        formik={formik}
                        EmailView={EmailView}
                        checkout={checkout}
                        config={config}
                    />
                    {
                        checkout.selected.delivery === 'home' ? (
                            <Address
                                checkout={checkout}
                                t={t}
                                setCheckout={setCheckout}
                                defaultAddress={checkout.data.defaultAddress}
                                updateFormik={updateFormik}
                                AddressView={AddressView}
                            />
                        ) : (
                            <PickupInfo
                                t={t}
                                formik={formik}
                                checkout={checkout}
                                setCheckout={setCheckout}
                            />
                        )
                    }
                    <Shipping
                        t={t}
                        checkout={checkout}
                        setCheckout={setCheckout}
                        updateFormik={updateFormik}
                        formik={formik}
                        handleOpenMessage={handleOpenMessage}
                        storeConfig={storeConfig}
                        ShippingView={ShippingView}
                    />
                    <PaymentList
                        checkout={checkout}
                        setCheckout={setCheckout}
                        updateFormik={updateFormik}
                        handleOpenMessage={handleOpenMessage}
                        t={t}
                        storeConfig={storeConfig}
                        PaymentView={PaymentView}
                    />
                    {modules.promo.enabled ? (
                        <Promo
                            t={t}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            formik={formik}
                            storeConfig={storeConfig}
                            PromoView={PromoView}
                        />
                    ) : null }
                    {modules.giftcard.enabled ? (
                        <GiftCard
                            t={t}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            formik={formik}
                            storeConfig={storeConfig}
                            GiftCardView={GiftCardView}
                        />
                    ) : null }
                    <Grid container spacing={2}>
                        {modules.rewardpoint.enabled ? (
                            <Grid item xs={12} sm={12} md={6} xl={6}>
                                <RewardPoint
                                    t={t}
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    handleOpenMessage={handleOpenMessage}
                                    formik={formik}
                                    storeConfig={storeConfig}
                                    RewardPointView={RewardPointView}
                                />
                            </Grid>
                        ) : null}
                        {modules.storecredit.enabled ? (
                            <Grid item xs={12} sm={12} md={6} xl={6}>
                                <Credit
                                    t={t}
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    handleOpenMessage={handleOpenMessage}
                                    formik={formik}
                                    storeConfig={storeConfig}
                                    StoreCreditView={StoreCreditView}
                                />
                            </Grid>
                        ) : null}
                    </Grid>
                </>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-3">
                <Summary
                    {...props}
                    loading={checkout.loading.order}
                    disabled={checkout.loading.all}
                    checkout={checkout}
                    updateFormik={updateFormik}
                    setCheckout={setCheckout}
                    handleOpenMessage={handleOpenMessage}
                    formik={formik}
                    storeConfig={storeConfig}
                    SummaryView={SummaryView}
                />
            </div>
        </div>
    );
};

export default Content;
