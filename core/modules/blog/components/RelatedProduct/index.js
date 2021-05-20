import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import { breakPointsUp } from '@helper_theme';
import Typography from '@common_typography';
import useStyles from '@core_modules/blog/components/RelatedProduct/style';
import GridList from '@common_gridlist';
import LabelView from '@plugin_productitem/components/LabelView';

const RelatedProduct = ({ relatedProduct, t }) => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    const isGrid = true;
    if (relatedProduct.length > 0) {
        if (isGrid) {
            return (
                <div>
                    <GridList
                        data={relatedProduct}
                        ItemComponent={ProductItem}
                        className="grid"
                        itemProps={{
                            LabelView,
                            isGrid,
                            catalogList: true,
                            className: 'grid-item',
                        }}
                        gridItemProps={{
                            xs: 6, sm: 4, md: 2,
                        }}
                    />
                </div>
            );
        }
        return (
            <div className={styles.relatedContainer}>
                <Typography variant="p" letter="uppercase">
                    {t('blog:relatedProducts')}
                </Typography>
                <Carousel
                    data={relatedProduct}
                    showArrow={desktop}
                    slideLg={6}
                    Item={ProductItem}
                    enableAddToCart
                    enableQuickView
                />
            </div>
        );
    }
    return null;
};

export default RelatedProduct;
