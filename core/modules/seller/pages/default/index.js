import Content from '@core_modules/seller/pages/default/components';
import Core from '@core_modules/seller/pages/default/core';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';

const Page = (props) => (<Core {...props} Content={Content} />);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'seller'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
