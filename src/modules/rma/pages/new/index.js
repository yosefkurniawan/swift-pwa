import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Skeleton from './components/Skeleton';
import CoreBase from './core';
import WarningInfo from './components/Info';
import ItemProductView from './components/templates/ItemProductView';
import ItemField from './components/ItemField';

const Page = (props) => (
    <CoreBase
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        ItemProductView={ItemProductView}
        ItemField={ItemField}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['rma'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
