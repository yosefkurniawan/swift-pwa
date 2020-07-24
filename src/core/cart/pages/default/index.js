import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import dynamic from 'next/dynamic';
import ItemView from './components/item';
import EmptyView from './components/empty';
import CrossSellView from './components/crosssell';
import SkeletonCart from './components/skeleton';
import EditDrawerView from './components/editDrawer';
import CheckoutDrawerView from './components/checkoutBox';

const Core = dynamic(() => import('./core'), { ssr: false });

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('cart:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('cart:pageTitle'),
        headerBackIcon: 'close', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'cart',
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Core
                {...props}
                ItemView={ItemView}
                EmptyView={EmptyView}
                CrossSellView={CrossSellView}
                SkeletonView={SkeletonCart}
                EditDrawerView={EditDrawerView}
                CheckoutDrawerView={CheckoutDrawerView}
            />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'cart'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
