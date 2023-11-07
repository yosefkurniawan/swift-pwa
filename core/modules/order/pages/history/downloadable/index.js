import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/order/pages/history/downloadable/core';
import Content from '@core_modules/order/pages/history/components/downloadable';
import Skeleton from '@core_modules/order/pages/history/components/skeleton';
import ErrorView from '@core_modules/order/pages/history/components/error';

const DefaultOrder = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} ErrorView={ErrorView} />
);

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
