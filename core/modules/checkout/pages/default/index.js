/* eslint-disable react/destructuring-assignment */
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { modules } from '@config';
import { getStoreHost } from '@helpers/config';
import Core from './core';
import CashbackInfo from './components/CashbackInfo';
import EmailView from './components/email/view';
import DeliveryView from './components/delivery/view';
import DeliverySkeleton from './components/delivery/skeleton';
import SummaryView from './components/summary/view';
import AddressView from './components/address/view';
import ShippingView from './components/shipping/view';
import PaymentView from './components/payment/view';
import GiftCardView from './components/giftcard/view';
import FieldPointView from '../../components/fieldcode';
import RewardPointView from './components/rewardpoint/view';
import StoreCreditView from './components/credit/view';
import ExtraFeeView from './components/ExtreeFee/view';
import Content from './components';
import HeaderView from './components/Header';
import PromoModalItemView from './components/PromoModalItem/view';

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

Page.getInitialProps = async (ctx) => {
    const {
        req,
    } = ctx;

    const { checkoutOnly } = modules.checkout;
    const data = typeof window === 'undefined' ? req.cookies : Cookies.getJSON();
    const cartId = data.nci || null;
    if (data && data.spwa && !data.spwa.allow_guest_checkout && !data.isLogin) {
        const redirectLogin = 'customer/account/login?redirect=/checkout&error=guest';
        if (ctx.res) {
            ctx.res.statusCode = 302;
            ctx.res.setHeader('Location', redirectLogin);
            return { props: {}, namespacesRequired: ['common', 'validate', 'login'] };
        }
    }

    let urlRedirect = '/checkout/cart';
    if (checkoutOnly) {
        urlRedirect = getStoreHost();
    }

    if (!cartId) {
        if (ctx.res) {
            ctx.res.statusCode = 302;
            ctx.res.setHeader('Location', urlRedirect);
            return { props: {}, namespacesRequired: ['common', 'checkout', 'customer', 'validate'] };
        }
        if (typeof window !== 'undefined') Router.push(urlRedirect);
    }

    return {
        namespacesRequired: ['common', 'checkout', 'customer', 'validate'],
        cartId,
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));
