import Button from '@components/Button';
import Typography from '@components/Typography';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import PriceFormat from '@components/PriceFormat';
import ProductByVariant from '@helpers/productByVariant';
import useStyles from './style';
import ListSize from './ListSize';
import ListColor from './ListColor';

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
    const [selected, setSelected] = React.useState({});
    const [spesificProduct, setSpesificProduct] = React.useState({});
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const FeedIcon = feed ? (
        <Favorite className={classFeedActive} />
    ) : (
        <FavoriteBorderOutlined className={styles.iconFeed} />
    );

    const selectedVariant = (key, value) => {
        const options = selected;
        options[key] = value;
        setSpesificProduct(ProductByVariant(options, variants));
        setSelected(options);
    };

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
                    {configurable_options.map((conf, idx) => {
                        const value = [];
                        for (
                            let valIdx = 0;
                            valIdx < conf.values.length;
                            // eslint-disable-next-line no-plusplus
                            valIdx++
                        ) {
                            if (value.indexOf(conf.values[valIdx].label) === -1) {
                                value.push(conf.values[valIdx].label);
                            }
                        }
                        if (conf.attribute_code === 'color') {
                            return (
                                <div className={styles.colorContainer} key={idx}>
                                    {value.map((clr, index) => (
                                        <ListColor
                                            value={selected.color}
                                            onClick={selectedVariant}
                                            key={index}
                                            color={clr}
                                            size={16}
                                            className={styles.btnColor}
                                        />
                                    ))}
                                </div>
                            );
                        }
                        return (
                            <div className={styles.colorContainer} key={idx}>
                                {value.map((sz, index) => (
                                    <ListSize
                                        value={selected[conf.attribute_code]}
                                        code={conf.attribute_code}
                                        onClick={selectedVariant}
                                        data={sz}
                                        key={index}
                                        width={16}
                                        className={styles.btnColor}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>
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
