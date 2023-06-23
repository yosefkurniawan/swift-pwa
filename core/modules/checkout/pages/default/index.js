/* eslint-disable react/destructuring-assignment */
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/checkout/pages/default/core';
import CashbackInfo from '@core_modules/checkout/pages/default/components/CashbackInfo';
import EmailView from '@core_modules/checkout/pages/default/components/email/view';
import DeliveryView from '@core_modules/checkout/pages/default/components/delivery/view';
import DeliverySkeleton from '@core_modules/checkout/pages/default/components/delivery/skeleton';
import SummaryView from '@core_modules/checkout/pages/default/components/summary/view';
import AddressView from '@core_modules/checkout/pages/default/components/address/view';
import ShippingView from '@core_modules/checkout/pages/default/components/shipping/view';
import PaymentView from '@core_modules/checkout/pages/default/components/payment/view';
import GiftCardView from '@core_modules/checkout/pages/default/components/giftcard/view';
import FieldPointView from '@core_modules/checkout/components/fieldcode';
import RewardPointView from '@core_modules/checkout/pages/default/components/rewardpoint/view';
import StoreCreditView from '@core_modules/checkout/pages/default/components/credit/view';
import ExtraFeeView from '@core_modules/checkout/pages/default/components/ExtraFee/view';
import Content from '@core_modules/checkout/pages/default/components';
import HeaderView from '@core_modules/checkout/pages/default/components/Header';
import PromoModalItemView from '@core_modules/checkout/pages/default/components/PromoModalItem/view';
import OrderCommentView from '@core_modules/checkout/pages/default/components/OrderComment/view';
import ConfirmationView from '@core_modules/checkout/pages/default/components/Confirmation/view';

const Page = (props) => (
    <Core
        {...props}
        CashbackInfoView={CashbackInfo}
        EmailView={EmailView}
        DeliveryView={DeliveryView}
        DeliverySkeleton={DeliverySkeleton}
        SummaryView={SummaryView}
        AddressView={AddressView}
        ShippingView={ShippingView}
        PaymentView={PaymentView}
        PromoView={FieldPointView}
        GiftCardView={GiftCardView}
        RewardPointView={RewardPointView}
        StoreCreditView={StoreCreditView}
        Content={Content}
        HeaderView={HeaderView}
        ExtraFeeView={ExtraFeeView}
        PromoModalItemView={PromoModalItemView}
        OrderCommentView={OrderCommentView}
        ConfirmationView={ConfirmationView}
        pageConfig={{
            title: props.t('checkout:pageTitle'),
            header: 'relative', // available values: "absolute", "relative", false (default)
            headerTitle: props.t('checkout:pageTitle'),
            headerDesktop: false,
            footer: false,
            bottomNav: false,
            pageType: 'checkout',
        }}
    />
);

export default withApollo({ ssr: true })(withTranslation()(Page));
