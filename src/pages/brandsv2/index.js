import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Brand from '../../modules/brands/core';
// import Content from '../../modules/brands/components/index';
import Content from './template';
import Skeleton from '../../modules/brands/views/skeleton';

// sample overide function
import generateAllData from './models/generateAllData';

const BrandsPage = (props) => (
    <Brand {...props} Content={Content} Skeleton={Skeleton} generateAllData={generateAllData} />
);

BrandsPage.getInitialProps = async () => ({
    namespacesRequired: ['brands'],
});

export default withApollo({ ssr: true })(withTranslation()(BrandsPage));
