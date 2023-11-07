import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';

import Core from '@core_modules/customer/pages/account/core';
import Skeleton from '@core_modules/customer/pages/account/components/Skeleton';
import CustomerView from '@core_modules/customer/pages/account/components/Customer/view';
import GuestView from '@core_modules/customer/pages/account/components/Guest';

const Page = (props) => (
    <Core
        {...props}
        CustomerView={CustomerView}
        Skeleton={Skeleton}
        GuestView={GuestView}
    />
);

export default withApollo({ ssr: true })(withTranslation()(Page));
