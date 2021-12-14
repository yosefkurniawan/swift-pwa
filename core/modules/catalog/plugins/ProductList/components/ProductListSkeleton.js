/* eslint-disable max-len */
import Grid from '@material-ui/core/Grid';
import { drawerFilterOnDesktopConfig } from '@services/graphql/repository/pwa_config';
import ProductItemSkeleton from '@plugin_productitem/components/Skeleton';

const ProductListSkeleton = () => {
    let drawerFilterOnDesktop = {};

    const { data: dataDrawerFilterOnDesktop, loading: loadingDrawerFilterOnDesktop } = drawerFilterOnDesktopConfig();

    if (!loadingDrawerFilterOnDesktop && dataDrawerFilterOnDesktop && dataDrawerFilterOnDesktop.storeConfig && dataDrawerFilterOnDesktop.storeConfig.pwa) {
        drawerFilterOnDesktop = {
            ...dataDrawerFilterOnDesktop.storeConfig.pwa,
        };
    }

    const getClassNames = (el) => {
        if (el <= 2) return 'hidden-xs';
        if (el <= 4) return 'hidden-xs hidden-sm';
        return '';
    };
    return (
        <Grid
            container
        >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
                <Grid key={el} item xs={6} sm={4} md={drawerFilterOnDesktop.drawer_filter_on_desktop_enable ? 3 : 2} className={getClassNames(el)}>
                    <ProductItemSkeleton />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductListSkeleton;
