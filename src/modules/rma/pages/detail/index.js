import CoreBase from '@modules/rma/pages/detail/core';
import Skeleton from '@modules/rma/pages/detail/components/Skeleton';
import WarningInfo from '@modules/rma/pages/detail/components/Info';
import ItemProduct from '@modules/rma/pages/detail/components/ItemProduct';
import ListMessage from '@modules/rma/pages/detail/components/ListMessage';
import ItemFieldView from '@modules/rma/pages/detail/components/ItemField/view';
import FormComment from '@modules/rma/pages/detail/components/FormComment';
import Detail from '@modules/rma/pages/detail/components/Detail';
import Footer from '@modules/rma/pages/detail/components/Footer';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';

const Page = (props) => (
    <CoreBase
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        ItemProduct={ItemProduct}
        ListMessage={ListMessage}
        ItemFieldView={ItemFieldView}
        FormComment={FormComment}
        Detail={Detail}
        Footer={Footer}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['rma'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
