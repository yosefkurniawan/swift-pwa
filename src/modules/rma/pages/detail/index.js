import Skeleton from '@modules/rma/pages/detail/components/Skeleton';
import CoreBase from '@modules/rma/pages/detail/core';
import WarningInfo from '@modules/rma/pages/detail/components/Info';
import Content from '@modules/rma/pages/detail/components';
import ItemProduct from '@modules/rma/pages/detail/components/ItemProduct';
import ListMessage from '@modules/rma/pages/detail/components/ListMessage';
import ItemField from '@modules/rma/pages/detail/components/ItemField';
import FormComment from '@modules/rma/pages/detail/components/FormComment';
import Detail from '@modules/rma/pages/detail/components/Detail';
import Footer from '@modules/rma/pages/detail/components/Footer';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';

const Page = (props) => (
    <CoreBase
        Content={Content}
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        ItemProduct={ItemProduct}
        ListMessage={ListMessage}
        ItemField={ItemField}
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
