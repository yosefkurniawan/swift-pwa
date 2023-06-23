import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';

import Content from '@core_modules/storelocator/pages/default/components';
import Core from '@core_modules/storelocator/pages/default/core';

const StoreLocator = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: true })(withTranslation()(StoreLocator));
