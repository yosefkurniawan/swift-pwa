import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Core from './core';
import Content from './views';
import Skeleton from './views/skeleton';
import ErrorView from './views/error';

const DefaultOrder = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} ErrorView={ErrorView} />
);

DefaultOrder.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
