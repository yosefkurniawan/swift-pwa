import { withTranslation } from '@i18n';
import Core from '@core_modules/cms/pages/default/core';

const Page = (props) => (<Core {...props} />);

export default withTranslation()(Page);
