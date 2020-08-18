import Link from 'next/link';
import { features } from '@config';
import Carousel from '@common_slider/Carousel';
import Thumbor from '@common_image';
import { breakPointsUp } from '@helpers/theme';
import DesktopView from './DesktopView';
import useStyles from '../style';

const MobileView = ({
    products, url_path, category_image, name,
}) => {
    const styles = useStyles();
    return (
        <>
            {category_image && (
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
            <div className={styles.slider}>
                <Carousel data={products} />
            </div>
        </>
    );
};

const FeaturedView = ({ data = [] }) => {
    const desktop = breakPointsUp('sm');
    return (
        <>
            {
                desktop ? (
                    <div className="hidden-xs">
                        <DesktopView data={data} />
                    </div>
                ) : (
                    <div className="hidden-sm hidden-md hidden-lg" style={{ width: '100%' }}>
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
                )
            }
        </>
    );
};

export default FeaturedView;
