import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Core from './core';
import Content from './components';
import Skeleton from './components/skeleton';

const Page = (props) => (
    <Core
        {...props}
        Content={Content}
        Skeleton={Skeleton}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'notification'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
