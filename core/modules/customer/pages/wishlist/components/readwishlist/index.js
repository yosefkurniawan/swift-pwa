/* eslint-disable react/destructuring-assignment */
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/wishlist/components/readwishlist/core';
import Content from '@core_modules/customer/pages/wishlist/components/readwishlist/components';

const Page = (props) => (
    <Core
        {...props}
        Content={Content}
        pageConfig={{
            title: 'Wishlist',
            header: false, // available values: "absolute", "relative", false (default)
            bottomNav: 'home',
            pageType: 'home',
        }}
    />
);

Page.getInitialProps = () => ({
    namespacesRequired: ['common', 'checkout', 'customer', 'validate'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
