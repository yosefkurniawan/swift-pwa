import Skeleton from '@modules/rma/new/views/Skeleton';
import CoreBase from '@modules/rma/new/core';
import WarningInfo from '@modules/rma/new/views/Info';
import Content from '@modules/rma/new/views';
import ItemProduct from '@modules/rma/new/views/ItemProduct';
import ItemField from '@modules/rma/new/views/ItemField';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';

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
