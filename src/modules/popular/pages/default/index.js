import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from './components';
import Core from './core';

const Page = (props) => (<Core {...props} Content={Content} />);

export default withApollo({ ssr: true })(withTranslation()(Page));
