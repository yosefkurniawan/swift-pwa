import { withApollo } from '@lib_apollo';
import { withTranslation } from 'next-i18next';
import Core from '@core_modules/customer/pages/address/core';
import Content from '@core_modules/customer/pages/address/components';

const Page = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
