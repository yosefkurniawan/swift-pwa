import Button from '@components/Button';
import Typography from '@components/Typography';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import PriceFormat from '@components/PriceFormat';
import useStyles from './style';
import ConfigurableOpt from './component/configurable';

const ProductItem = (props) => {
    const {
        name,
        small_image,
        // eslint-disable-next-line camelcase
        price_range,
        // eslint-disable-next-line camelcase
        price_tiers,
        url_key = '',
        __typename,
        variants = [],
        configurable_options = [],
        showFeed = true,
    } = props;
    const styles = useStyles();
    const [feed, setFeed] = React.useState(false);
    const [spesificProduct, setSpesificProduct] = React.useState({});
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const FeedIcon = feed ? (
        <Favorite className={classFeedActive} />
    ) : (
        <FavoriteBorderOutlined className={styles.iconFeed} />
    );

    return (
        <div className={styles.itemContainer}>
            <div className={styles.imgItem}>
                <Link href="/[...slug]" as={`/${url_key}`}>
                    <a>
                        <img
                            // eslint-disable-next-line no-nested-ternary
                            src={spesificProduct.id ? spesificProduct.image.url
                                : small_image && small_image.url
                                    ? small_image.url
                                    : '/assets/img/placeholder.png'}
                            className={styles.imgProduct}
                            onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                            alt={small_image && small_image.url ? small_image.label : 'Product'}
                        />
                    </a>
                </Link>
            </div>
            <div className={styles.detailItem}>
                <div className={styles.descItem}>
                    <Link href="/[...slug]" as={`/${url_key}`}>
                        <a>
                            <Typography
                                variant="p"
                                className={styles.clearMarginPadding}
                                letter="capitalize"
                            >
                                {name}
                            </Typography>
                        </a>
                    </Link>
                    <PriceFormat
                        // eslint-disable-next-line camelcase
                        priceRange={spesificProduct.price_range ? spesificProduct.price_range : price_range}
                        // eslint-disable-next-line camelcase
                        priceTiers={spesificProduct.price_tiers ? spesificProduct.price_tiers : price_tiers}
                        productType={__typename}
                    />
                </div>
                <ConfigurableOpt
                    configurable_options={configurable_options}
                    variants={variants}
                    setSpesificProduct={setSpesificProduct}
                />
                {showFeed && (
                    <Button
                        className={styles.btnFeed}
                        variant="text"
                        onClick={() => setFeed(!feed)}
                    >
                        {FeedIcon}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProductItem;
