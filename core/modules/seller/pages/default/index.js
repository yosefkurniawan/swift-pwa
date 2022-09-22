import TabView from '@common_tabs';
import Content from '@core_modules/seller/pages/default/components';
import Core from '@core_modules/seller/pages/default/core';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import DetailProductView from '@plugin_productitem/components/Detail';
import ImageProductView from '@plugin_productitem/components/Image';
import dynamic from 'next/dynamic';

const ErrorMessage = dynamic(() => import('@plugin_productlist/components/ErrorMessage'), { ssr: false });
const ProductListSkeleton = dynamic(() => import('@plugin_productlist/components/ProductListSkeleton'), { ssr: false });
const FilterView = dynamic(() => import('@plugin_productlist/components/Filter/view'), { ssr: false });
const FilterModalView = dynamic(() => import('@plugin_productlist/components/Filter/FilterDialog'), { ssr: false });

const Page = (props) => (
    <Core
        Content={Content}
        ErrorMessage={ErrorMessage}
        ProductListSkeleton={ProductListSkeleton}
        ImageProductView={ImageProductView}
        DetailProductView={DetailProductView}
        TabView={TabView}
        FilterView={FilterView}
        FilterModalView={FilterModalView}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'seller'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
