import BannerView from '@common_banner';
import BreadcrumbView from '@common_breadcrumb';
import TabView from '@common_tabs';
import { withTranslation } from '@i18n';
import Core from './core';
import Sekeltonview from './components/Skeleton';

const CategoryPage = (props) => (
    <Core
        BannerView={BannerView}
        BreadcrumbView={BreadcrumbView}
        TabView={TabView}
        Sekeltonview={Sekeltonview}
        {...props}
    />
);

export default withTranslation()(CategoryPage);
