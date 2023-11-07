import Content from '@core_modules/seller/pages/default/components';
import ContentProducts from '@core_modules/seller/pages/default/components/Products';
import Core from '@core_modules/seller/pages/default/core';
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';

const Page = (props) => <Core Content={Content} ContentProducts={ContentProducts} {...props} />;

export default withApollo({ ssr: true })(withTranslation()(Page));
