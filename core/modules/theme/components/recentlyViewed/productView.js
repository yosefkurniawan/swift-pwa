import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import SkeletonRecently from '@core_modules/theme/components/recentlyViewed/skeleton';
import classNames from 'classnames';
import Button from '@common_button';
import Typography from '@common_typography';

const ProductView = (props) => {
    const {
        toggleDrawer, wrapperContent, recentlyBtnContent, desktop, t,
        loading, product, contentFeatured,
        className,
    } = props;

    if (loading) {
        return <SkeletonRecently />;
    }

    return (
        <div className={wrapperContent}>
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
            <div className={classNames('row center-xs', contentFeatured)}>
                <Carousel
                    data={product ? product.products.items : []}
                    showArrow={desktop}
                    slideLg={6}
                    Item={ProductItem}
                    className={className}
                    enableAddToCart
                    enableQuickView
                />
            </div>
        </div>
    );
    /* eslint-enable */
};

export default ProductView;
