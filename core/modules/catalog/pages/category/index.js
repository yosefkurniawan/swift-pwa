import Banner from '@common_image/LazyImage';
import BreadcrumbView from '@common_breadcrumb';
import TabView from '@common_tabs';
import { withTranslation } from '@i18n';
import Error from '@core_modules/error/pages/default';
import Core from './core';
import SkeletonView from './components/Skeleton';
import Content from './components';

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
