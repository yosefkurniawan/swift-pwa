import { withApollo } from '@lib_apollo';
import Loader from '@common_loaders/Backdrop';
import { withTranslation } from 'next-i18next';
import Core from '@core_modules/emailconfirmation/pages/default/core';

const Content = () => <Loader open />;

const Page = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
