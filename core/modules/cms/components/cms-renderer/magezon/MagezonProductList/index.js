import Typography from '@common_typography';
import ProductContent from '@core_modules/cms/components/cms-renderer/magezon/MagezonProductList/productContent';
import { generateQueries, getProductListConditions } from '@core_modules/cms/helpers/getProductListConditions';
import { getProductList } from '@core_modules/cms/services/graphql';
import { useTranslation } from '@i18n';
import { useMemo } from 'react';

const MagezonProductList = (props) => {
    // prettier-ignore
    const {
        condition, description, show_line,
        line_color, line_position, line_width,
        max_items, product_addtocart, product_shortdescription,
        product_background, product_compare, product_image, product_name,
        product_price, product_review, product_swatches, product_wishlist,
        title, title_align, title_tag,
        // source, orer_by,
    } = props;
    const { t } = useTranslation();
    const dataCondition = useMemo(() => getProductListConditions(condition), [condition]);
    const dataFilter = generateQueries(dataCondition);
    const { data } = getProductList({ ...dataFilter, pageSize: max_items });
    const showLineClass = show_line ? 'mgz-product-list-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-product-list-heading-line--bottom' : '';

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
                    {data?.products?.items.map((product, index) => (
                        <ProductContent
                            key={index}
                            product={product}
                            t={t}
                            product_addtocart={product_addtocart}
                            product_background={product_background}
                            product_compare={product_compare}
                            product_image={product_image}
                            product_price={product_price}
                            product_review={product_review}
                            product_swatches={product_swatches}
                            product_wishlist={product_wishlist}
                            product_name={product_name}
                            product_shortdescription={product_shortdescription}
                        />
                    ))}
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
                    .mgz-product-list :global(.MuiGrid-item h4) {
                        margin: 0;
                    }
                `}
            </style>
        </>
    );
};
export default MagezonProductList;
