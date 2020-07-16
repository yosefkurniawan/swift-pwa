import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Skeleton from './components/Skeleton';
import CoreBase from './core';
import WarningInfo from './components/Info';
import Content from './components';
import ItemProduct from './components/ItemProduct';
import ItemField from './components/ItemField';

const Page = (props) => (
    <CoreBase
        Content={Content}
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        ItemProduct={ItemProduct}
        ItemField={ItemField}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['rma'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
