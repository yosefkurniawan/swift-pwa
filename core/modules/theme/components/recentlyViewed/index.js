import React from 'react';
import Button from '@common_button';
import { useTranslation } from '@i18n';
import Typography from '@common_typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { getLocalStorage } from '@helper_localstorage';
import ProductView from '@core_modules/theme/components/recentlyViewed/productView';
import { breakPointsUp } from '@helper_theme';
import { getRecentlyProduct } from '@core_modules/theme/services/graphql';

const RecentlyViewed = (props) => {
    const { t } = useTranslation();
    const { recentlyBtn, isActive } = props;
    const desktop = breakPointsUp('sm');
    const viewedProduct = getLocalStorage('recently_viewed_product');
    const [openViewBar, setViewBar] = React.useState(false);
    const [getProduct, { data: product, loading }] = getRecentlyProduct();
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        const url_keys = [];
        if (viewedProduct && viewedProduct.length) {
            viewedProduct.map((item) => {
                url_keys.push(item.url_key);
                return null;
            });
            getProduct({
                variables: {
                    filter: {
                        url_key: {
                            in: url_keys,
                        },
                    },
                },
            });
        }
        setViewBar(open);
    };
    if (isActive) {
        return (
            <div>
                {
                    !openViewBar && viewedProduct && viewedProduct.length > 0
                        ? (
                            <Button
                                onClick={toggleDrawer(true)}
                                className={recentlyBtn}
                            >
                                <Typography
                                    variant="title"
                                    type="bold"
                                    style={{
                                        color: 'black',
                                        textTransform: 'uppercase',
                                        fontSize: desktop ? 12 : '3vw',
                                    }}
                                >
                                    {t('common:recentlyView:title')}
                                </Typography>
                            </Button>
                        ) : null
                }
                <SwipeableDrawer
                    anchor="bottom"
                    open={openViewBar}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <ProductView
                        toggleDrawer={toggleDrawer}
                        {...props}
                        desktop={desktop}
                        loading={loading}
                        product={product}
                        t={t}
                    />
                </SwipeableDrawer>
            </div>
        );
    }
    return null;
};

export default RecentlyViewed;
