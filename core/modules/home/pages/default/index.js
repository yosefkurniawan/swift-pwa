import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';
import { modules } from '@config';

const Page = dynamic(() => ((!modules.checkout.checkoutOnly)
    ? import('./main')
    : import('@core_modules/checkout/pages/default')));

Page.getInitialProps = async () => ({
    namespacesRequired: modules.checkout.checkoutOnly
        ? ['common', 'checkout', 'customer', 'validate']
        : ['common', 'home'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
