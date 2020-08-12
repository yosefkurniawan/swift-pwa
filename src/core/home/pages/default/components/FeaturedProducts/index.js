/* eslint-disable consistent-return */
import { modules } from '@config';
import gqlService from '../../../../service/graphql';

const FeaturedProducts = ({
    t, ErrorInfo, FeaturedSkeleton, FeaturedView,
}) => {
    const { home } = modules;
    const { loading, data, error } = gqlService.getFeaturedProducts({
        url_key: home.featuresProduct.url_key,
    });

    if (loading && !data) return <FeaturedSkeleton />;
    if (error) {
        return (
            <ErrorInfo variant="error" text={t('home:errorFetchData')} />
        );
    }
    if (!data || data.categoryList.length === 0) {
        return (
            <ErrorInfo variant="warning" text={t('home:nullData')} />
        );
    }

    if (!loading && data && data.categoryList.length > 0) {
        return (
            <>
                {data.categoryList[0].children.map((category, i) => {
                    const products = category.products.items.map((product) => ({
                        ...product,
                        name: product.name,
                        url: product.url_key,
                        imageSrc: product.small_image.url,
                        price: product.price_range.minimum_price.regular_price.value,
                    }));
                    return (
                        <FeaturedView
                            key={i}
                            url_path={category.url_path}
                            products={products}
                            category_image={category.image_path}
                            name={category.name}
                        />
                    );
                })}
            </>
        );
    }
};

export default FeaturedProducts;
