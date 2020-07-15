import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Core from './core';
import Content from './views';

const DefaultOrder = (props) => (
    <Core {...props} Content={Content} />
);

DefaultOrder.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
