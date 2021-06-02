/* eslint-disable react/destructuring-assignment */
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/readwishlist/core';
import Content from '@core_modules/customer/pages/readwishlist/components';

const Page = (props) => (
    <Core
        {...props}
        Content={Content}
        pageConfig={{
            title: props.t('customer:wishlist:pageTitle'),
            header: false, // available values: "absolute", "relative", false (default)
            bottomNav: 'home',
            pageType: 'home',
        }}
    />
);

Page.getInitialProps = () => ({
    namespacesRequired: ['common', 'catalog', 'customer', 'validate', 'product'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
