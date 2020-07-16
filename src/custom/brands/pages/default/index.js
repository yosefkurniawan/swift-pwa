import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Brand from '@core/brands/pages/default/core';

// your custom components import

import Skeleton from '@core/brands/pages/default/components/skeleton';

// sample overide function
import generateAllData from '../../helpers/generateAllData';
import Content from './components';

const BrandsPage = (props) => (
    // generate brands page from module
    <Brand {...props} Content={Content} Skeleton={Skeleton} generateAllData={generateAllData} />
);

BrandsPage.getInitialProps = async () => ({
    namespacesRequired: ['brands'],
});

export default withApollo({ ssr: true })(withTranslation()(BrandsPage));
