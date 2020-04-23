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

// eslint-disable-next-line camelcase
const getVariants = (configurable_options) => {
    const size = [];
    const color = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < configurable_options.length; index++) {
        if (configurable_options[index].label.toLowerCase() === 'size') {
            for (
                let sizeIdx = 0;
                sizeIdx < configurable_options[index].values.length;
                // eslint-disable-next-line no-plusplus
                sizeIdx++
            ) {
                const SizeValue = configurable_options[index].values;
                if (size.indexOf(SizeValue[sizeIdx].label) === -1) {
                    size.push(SizeValue[sizeIdx].label);
                }
            }
        }
        if (configurable_options[index].label.toLowerCase() === 'color') {
            for (
                let sizeIdx = 0;
                sizeIdx < configurable_options[index].values.length;
                // eslint-disable-next-line no-plusplus
                sizeIdx++
            ) {
                const SizeValue = configurable_options[index].values;
                if (color.indexOf(SizeValue[sizeIdx].label) === -1) {
                    color.push(SizeValue[sizeIdx].label);
                }
            }
        }
    }

    return {
        size,
        color,
    };
};

const ProductItem = (props) => {
    const {
        name,
        image,
        // eslint-disable-next-line camelcase
        price_range,
        // eslint-disable-next-line camelcase
        price_tiers,
        __typename,
        variants = [],
        configurable_options = [],
        showListColor = false,
        showListSize = false,
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

    const { size, color } = getVariants(configurable_options);
    const selectedVariant = (key, value) => {
        const options = selected;
        options[key] = value;
        setSpesificProduct(ProductByVariant(options, variants));
        setSelected(options);
    };

    return (
        <div className={styles.itemContainer}>
            <div className={styles.imgItem}>
                <Link href="/[...slug]" as="/strive-shoulder-pack">
                    <a>
                        <img
                            // eslint-disable-next-line no-nested-ternary
                            src={spesificProduct.id ? spesificProduct.image.url
                                : image && image.url
                                    ? image.url
                                    : '/assets/img/sample/product.png'}
                            className={styles.imgProduct}
                            alt={image && image.url ? image.label : 'Product'}
                        />
                    </a>
                </Link>
            </div>
            <div className={styles.detailItem}>
                <div className={styles.descItem}>
                    <Link href="/[...slug]" as="/strive-shoulder-pack">
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
                    <div className={styles.colorContainer}>
                        {showListColor
                            && color.map((clr, index) => (
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
                    <div className={styles.colorContainer}>
                        {showListSize
                            && size.map((sz, index) => (
                                <ListSize
                                    value={selected.size}
                                    onClick={selectedVariant}
                                    data={sz}
                                    key={index}
                                    width={16}
                                    className={styles.btnColor}
                                />
                            ))}
                    </div>
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
