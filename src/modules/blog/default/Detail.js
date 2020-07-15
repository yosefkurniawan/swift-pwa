/* eslint-disable no-nested-ternary */
import React from 'react';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import DefaultContent from '../views/Details';
import CoreBase from '../core/Detail';
import Loader from '../views/Loader/LoaderDetail';
import WarningInfo from '../views/Info';

const DetailPage = (props) => (
    <CoreBase
        Content={DefaultContent}
        Loader={Loader}
        WarningInfo={WarningInfo}
        {...props}
    />
);

DetailPage.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
});

export default withApollo({ ssr: true })(withTranslation()(DetailPage));
