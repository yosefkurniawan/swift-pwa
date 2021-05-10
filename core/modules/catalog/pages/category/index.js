import Banner from '@common_image/LazyImage';
import BreadcrumbView from '@common_breadcrumb';
import TabView from '@common_tabs';
import { withTranslation } from '@i18n';
import Error from '@core_modules/error/pages/default';
import Core from '@core_modules/catalog/pages/category/core';
import SkeletonView from '@core_modules/catalog/pages/category/components/Skeleton';
import Content from '@core_modules/catalog/pages/category/components';

const CategoryPage = (props) => (
    <Core
        BannerView={Banner}
        BreadcrumbView={BreadcrumbView}
        TabView={TabView}
        SkeletonView={SkeletonView}
        Content={Content}
        ErrorView={Error}
        {...props}
    />
);

export default withTranslation()(CategoryPage);
