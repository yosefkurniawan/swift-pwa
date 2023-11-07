import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Skeleton from '@core_modules/contact/pages/default/components/skeleton';
import Content from '@core_modules/contact/pages/default/components';
import ErrorInfo from '@core_modules/contact/pages/default/components/ErrorInfo';
import Core from '@core_modules/contact/pages/default/core';

const Page = (props) => (<Core {...props} Content={Content} ErrorInfo={ErrorInfo} Skeleton={Skeleton} />);

export default withApollo({ ssr: true })(withTranslation()(Page));
