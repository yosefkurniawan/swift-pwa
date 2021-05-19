import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import { breakPointsUp } from '@helper_theme';
import Typography from '@common_typography';
import useStyles from '@core_modules/blog/components/RelatedProduct/style';

const RelatedProduct = ({ relatedProduct, t }) => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    if (relatedProduct.length > 0) {
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
