import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Loading from '@common_loaders/Backdrop';
import Content from './components';
import ErrorInfo from './components/ErrorInfo';
import Core from './core';

const Page = (props) => (<Core {...props} Content={Content} ErrorInfo={ErrorInfo} Skeleton={Loading} />);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'contact', 'validate'] });

export default withApollo({ ssr: true })(withTranslation()(Page));
