import Link from 'next/link';
import { imageSize } from '@config';
import Carousel from '@common_slider/Carousel';
import Thumbor from '@common_image';
import useStyles from '../style';

const FeaturedView = ({
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
                    <a style={{
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
                            width={imageSize.category.width}
                            height={imageSize.category.height}
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

export default FeaturedView;
