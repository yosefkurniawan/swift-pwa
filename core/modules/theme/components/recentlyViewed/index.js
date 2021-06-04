import React from 'react';
import Button from '@common_button';
import { useTranslation } from '@i18n';
import Typography from '@common_typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { getLocalStorage } from '@helper_localstorage';
import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import { breakPointsUp } from '@helper_theme';

const ProductView = (props) => {
    const {
        toggleDrawer, wrapperContent, recentlyBtnContent, viewedProduct, desktop, t,
    } = props;
    return (
        <div
            className={wrapperContent}
        >
            <Button
                onClick={toggleDrawer(false)}
                className={recentlyBtnContent}
            >
                <Typography
                    variant="title"
                    type="bold"
                    style={{
                        fontSize: 12,
                        color: 'black',
                        textTransform: 'uppercase',
                    }}
                >
                    {t('common:recentlyView:title')}
                </Typography>
            </Button>
            <Carousel
                data={viewedProduct}
                showArrow={desktop}
                slideLg={6}
                Item={ProductItem}
                enableAddToCart
                enableQuickView
            />
        </div>
    );
};
const RecentlyViewed = (props) => {
    const { t } = useTranslation();
    const { recentlyBtn } = props;
    const desktop = breakPointsUp('sm');
    const viewedProduct = getLocalStorage('recently_viewed_product');
    const [openViewBar, setViewBar] = React.useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setViewBar(open);
    };

    return (
        <>
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
                                        fontSize: 12,
                                        color: 'black',
                                        textTransform: 'uppercase',
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
                        viewedProduct={viewedProduct}
                        desktop={desktop}
                        t={t}
                    />
                </SwipeableDrawer>
            </div>
        </>
    );
};

export default RecentlyViewed;
