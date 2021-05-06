import TabView from '@common_tabs';
import CoreBase from '@plugin_productlist/core';
import ErrorMessage from '@plugin_productlist/components/ErrorMessage';
import ProductListSkeleton from '@plugin_productlist/components/ProductListSkeleton';
import ImageProductView from '@plugin_productitem/components/Image';
import DetailProductView from '@plugin_productitem/components/Detail';
import FilterView from '@plugin_productlist/components/Filter/view';
import FilterModalView from '@plugin_productlist/components/Filter/FilterDialog';

const Page = (props) => (
    <CoreBase
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

export default Page;
