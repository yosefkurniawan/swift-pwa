import React from 'react';
import Button from '@common_button';
import { useTranslation } from '@i18n';
import Typography from '@common_typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { getLocalStorage } from '@helper_localstorage';
import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import { breakPointsUp } from '@helper_theme';
import { getRecentlyProduct } from '@core_modules/theme/services/graphql';
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';

const ProductView = (props) => {
    const {
        toggleDrawer, wrapperContent, recentlyBtnContent, desktop, t,
        loading, product, contentFeatured,
        className,
    } = props;

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    marginTop: 20,
                    marginBottom: 20,
                }}
            >
                <Skeleton
                    variant="rect"
                    width={200}
                    height={300}
                    animation="wave"
                />
                <Skeleton
                    variant="rect"
                    width={200}
                    height={300}
                    animation="wave"
                />
                <Skeleton
                    variant="rect"
                    width={200}
                    height={300}
                    animation="wave"
                />
            </div>
        );
    }
    /* eslint-disable */
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
            <div style={
                {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <div className={
                    classNames('row center-xs', contentFeatured)}>
                    <Carousel
                        data={product ? product.products.items : []}
                        showArrow={desktop}
                        slideLg={product ? product.products.items.length <= 4 ? product.products.items.length - 1 : 4 : 0}
                        Item={ProductItem}
                        className={className}
                        enableAddToCart
                        enableQuickView
                    />
                </div>
            </div>
        </div>
    );
    /* eslint-enable */
};
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
            </>
        );
    }
    return null;
};

export default RecentlyViewed;
