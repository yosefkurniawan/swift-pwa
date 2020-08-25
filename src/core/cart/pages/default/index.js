import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import dynamic from 'next/dynamic';
import ItemView from './components/item';
import EmptyView from './components/empty';
import CrossSellView from './components/crosssell';
import SkeletonCart from './components/skeleton';
import EditDrawerView from './components/editDrawer';
import CheckoutDrawerView from './components/checkoutBox';
import Content from './components';
import SummaryView from './components/Summary';

const Core = dynamic(() => import('./core'), { ssr: false });

const Page = (props) => (

    <Core
        {...props}
        ItemView={ItemView}
        EmptyView={EmptyView}
        CrossSellView={CrossSellView}
        SkeletonView={SkeletonCart}
        EditDrawerView={EditDrawerView}
        CheckoutDrawerView={CheckoutDrawerView}
        Content={Content}
        SummaryView={SummaryView}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'cart'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
