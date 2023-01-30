import Route from 'next/router';
import classNames from 'classnames';
import Summary from '@plugin_summary';
import useStyles from '@core_modules/cart/pages/default/components/style';
import dynamic from 'next/dynamic';
import { formatPrice } from '@helper_currency';
import Skeleton from '@material-ui/lab/Skeleton';

const CrossSell = dynamic(() => import('@core_modules/cart/pages/default/components/crosssell'), { ssr: false });
const GimmickBanner = dynamic(() => import('@plugin_gimmickbanner'), { ssr: false });

const Content = (props) => {
    const {
        ItemView, CrossSellView, CheckoutDrawerView, dataCart, t, handleFeed,
        toggleEditMode, editMode, deleteItem, toggleEditDrawer, crosssell, errorCart,
        EditDrawerView, editItem, openEditDrawer, updateItem, SummaryView, PromoModalItemView, handleAddPromoItemToCart,
        applyCoupon, removeCoupon, storeConfig, dataSummary, loadingSummary,
        ...other
    } = props;
    let allData = !loadingSummary ? {...dataCart, ...dataSummary} : null;
    const handleOnCheckoutClicked = () => {
        const minimumOrderEnabled = storeConfig.minimum_order_enable;
        const grandTotalValue = allData.prices.grand_total.value;
        const minimumOrderAmount = storeConfig.minimum_order_amount;

        if (minimumOrderEnabled && grandTotalValue < minimumOrderAmount) {
            const errorMessage = {
                variant: 'error',
                text: `Unable to place order: Minimum order amount is ${formatPrice(minimumOrderAmount)}`,
                open: true,
            };
            window.toastMessage({
                ...errorMessage,
            });
        } else {
            Route.push('/checkout');
        }
    };
    const styles = useStyles();
    return (
        <div className={classNames(styles.mobileBottomSpace, 'row cart-pages')}>
            <div className="col-xs-12">
                <GimmickBanner data={dataCart.promoBanner || []} t={t} {...other} />
            </div>
            <div className="col-xs-12 col-sm-8 col-md-9" style={{ height: '100%' }}>
                <ItemView
                    data={dataCart}
                    t={t}
                    toggleEditMode={toggleEditMode}
                    editMode={editMode}
                    deleteItem={deleteItem}
                    handleFeed={handleFeed}
                    toggleEditDrawer={toggleEditDrawer}
                    storeConfig={storeConfig}
                />
                <CrossSell dataCart={dataCart} {...props} editMode={editMode} View={CrossSellView} />
                {editItem.id ? (
                    <EditDrawerView {...props} {...editItem} open={openEditDrawer} toggleOpen={toggleEditDrawer} updateItem={updateItem} />
                ) : null}
                <div className="hidden-desktop">
                    {
                        !loadingSummary && allData ? (
                        <Summary
                        disabled={errorCart && errorCart.length > 0}
                        isDesktop={false}
                        t={t}
                        dataCart={allData}
                        editMode={editMode}
                        storeConfig={storeConfig}
                        {...other}
                        handleActionSummary={handleOnCheckoutClicked}
                        />
                        ) : null
                    }
                    
                </div>
                {/* commented for now */}
                {/* {modules.promo.enabled ? (
                    <Promo
                        t={t}
                        dataCart={dataCart}
                        PromoModalItemView={PromoModalItemView}
                        handleAddPromoItemToCart={handleAddPromoItemToCart}
                        applyCoupon={applyCoupon}
                        removeCoupon={removeCoupon}
                    />
                ) : null} */}
            </div>
            <div className="col-xs-12 col-sm-4 col-md-3 hidden-mobile">
                {
                    !loadingSummary && allData ? (<Summary
                    disabled={errorCart && errorCart.length > 0}
                    isDesktop
                    t={t}
                    dataCart={allData}
                    editMode={editMode}
                    storeConfig={storeConfig}
                    {...other}
                    handleActionSummary={handleOnCheckoutClicked}
                    isCart
                />) : <Skeleton variant="rect" width="100%" height={200} />}
            </div>
        </div>
    );
};

export default Content;
