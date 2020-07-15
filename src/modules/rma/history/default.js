import Skeleton from '@modules/rma/history/views/Skeleton';
import CoreBase from '@modules/rma/history/core';
import WarningInfo from '@modules/rma/history/views/Info';
import Content from '@modules/rma/history/views';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';

const Page = (props) => (
    <CoreBase
        Content={Content}
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['rma'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
