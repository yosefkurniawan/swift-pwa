import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Content from '@core_modules/customer/pages/profile/components';
import Skeleton from '@core_modules/customer/pages/profile/components/skeleton';
import Core from '@core_modules/customer/pages/profile/core';

const Page = (props) => <Core {...props} Content={Content} Skeleton={Skeleton} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
