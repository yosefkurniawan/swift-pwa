import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';

import Content from '@core_modules/storecredit/pages/default/components';
import Core from '@core_modules/storecredit/pages/default/core';

const StoreCredit = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: true })(withTranslation()(StoreCredit));
