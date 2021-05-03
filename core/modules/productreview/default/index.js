import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';

import Content from './components';
import Core from './core';

const MyProductReview = (props) => <Core {...props} Content={Content} />;

MyProductReview.getInitialProps = async () => ({
    namespacesRequired: ['common', 'productreview', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(MyProductReview));
