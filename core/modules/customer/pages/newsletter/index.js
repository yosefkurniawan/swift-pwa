import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/customer/pages/newsletter/core';
import Content from '@core_modules/customer/pages/newsletter/components';

const Page = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
