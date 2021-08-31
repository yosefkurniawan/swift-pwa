/* eslint-disable no-unused-vars */
import Thumbor from '@common_image';
import Typography from '@common_typography';
import { features } from '@config';
import { getProductList } from '@core_modules/cms/services/graphql';
import OptionItem from '@core_modules/product/plugins/OptionItem/index';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from '@i18n';

const ProductItem = (props) => {
    const { data } = props;
    const { t } = useTranslation();

    return (
        <>
            {data?.products?.items.map((product, index) => {
                const { name } = product;
                const { currency, value } = product.price_range.maximum_price.regular_price;
                const updatedProduct = { ...product };
                updatedProduct.configurable_options = [...updatedProduct.configurable_options].sort((a, b) => a.position - b.position);
                // updatedProduct.configurable_options.sort();
                console.log('updated product', updatedProduct);

                return (
                    <Grid container spacing={4} key={index}>
                        <Grid item>
                            <div style={{ height: features.imageSize.product.height, width: features.imageSize.product.width }}>
                                <Thumbor
                                    src={product.small_image.url}
                                    width={features.imageSize.product.width}
                                    height={features.imageSize.product.height}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm container direction="column">
                            <Grid item>{name}</Grid>
                            <Grid item>
                                {currency}
                                {value}
                                <div className="mgz-product-list-option-item">
                                    <OptionItem data={updatedProduct} t={t} noLabel customPos />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            })}
        </>
    );
};

const MagezonProductList = (props) => {
    // prettier-ignore
    const {
        condition, description, show_line, source,
        line_color, line_position, line_width,
        max_items, orer_by, product_addtocart,
        product_background, product_equalheight, product_padding,
        product_compare, product_image, product_name,
        product_price, product_review, product_swatches, product_wishlist,
        title, title_align, title_tag,
    } = props;

    const { data, loading } = getProductList({ search: 'chaz', pageSize: max_items });
    const showLineClass = show_line ? 'mgz-product-list-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-product-list-heading-line--bottom' : '';

    console.log(props);
    console.log(data);
    // console.log('condition', JSON.parse(props.condition));

    return (
        <>
            <div className="mgz-product-list">
                <div className={`mgz-product-list-heading ${showLineClass} ${linePosClass}`}>
                    <div className="mgz-product-list-heading-title">
                        <Typography variant={title_tag} align={title_align}>
                            {title.toUpperCase()}
                        </Typography>
                    </div>
                    <div className="mgz-product-list-heading-description">{description}</div>
                </div>
                <div className="mgz-product-list-content">
                    <ProductItem data={data} />
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-product-list-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-product-list-heading-line:before {
                        content: '';
                        z-index: 0;
                        display: block;
                        position: absolute;
                        bottom: 0;
                        top: 40%;
                        width: 100%;
                        height: ${line_width}px;
                        background-color: ${line_color};
                    }
                    .mgz-product-list-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-product-list-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                `}
            </style>
        </>
    );
};
export default MagezonProductList;
