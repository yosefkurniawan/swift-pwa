import Skeleton from '@modules/rma/pages/history/components/Skeleton';
import CoreBase from '@modules/rma/pages/history/core';
import WarningInfo from '@modules/rma/pages/history/components/Info';
import Content from '@modules/rma/pages/history/components';
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
