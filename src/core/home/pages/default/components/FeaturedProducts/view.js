import Link from 'next/link';
import { features } from '@config';
import Carousel from '@common_slick/Caraousel';
import Thumbor from '@common_image';
import { breakPointsUp } from '@helpers/theme';
import Typography from '@common_typography';
import useStyles from '../style';

const MobileView = ({
    products, url_path, category_image, name,
}) => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    return (
        <div className={styles.features}>
            {(category_image && !desktop) && (
                <Link
                    href="[...slug]"
                    as={url_path}
                >
                    <a
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                    >
                        <Thumbor
                            src={category_image}
                            alt={name}
                            style={{
                                width: '100%',
                                maxWidth: '100%',
                                maxHeight: '100%',
                            }}
                            width={features.imageSize.category.width}
                            height={features.imageSize.category.height}
                            quality={80}
                        />
                    </a>
                </Link>
            )}
            {
                desktop && (
                    <Typography letter="capitalize" type="bold" className={styles.labelCategory}>
                        {name || ''}
                    </Typography>
                )
            }
            <div className={styles.slider}>
                <Carousel data={products} />
            </div>
        </div>
    );
};

const FeaturedView = ({ data = [] }) => (
    <>
        <div style={{ width: '100%', height: '100%' }}>
            {
                data.map((category, i) => {
                    const products = category.products.items.map((product) => ({
                        ...product,
                        name: product.name,
                        url: product.url_key,
                        imageSrc: product.small_image.url,
                        price: product.price_range.minimum_price.regular_price.value,
                    }));
                    return (
                        <MobileView
                            key={i}
                            url_path={category.url_path}
                            products={products}
                            category_image={category.image_path}
                            name={category.name}
                        />
                    );
                })
            }
        </div>
    </>
);

export default FeaturedView;
