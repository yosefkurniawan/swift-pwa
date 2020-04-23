import Button from '@components/Button';
import Typography from '@components/Typography';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import PriceFormat from '@components/PriceFormat';
import useStyles from './style';
import ListSize from './ListSize';
import ListColor from './ListColor';

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
        showListColor = false,
        color = [],
        showListSize = false,
        showFeed = true,
    } = props;
    const styles = useStyles();
    const [feed, setFeed] = React.useState(false);
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const FeedIcon = feed ? (
        <Favorite className={classFeedActive} />
    ) : (
        <FavoriteBorderOutlined className={styles.iconFeed} />
    );
    const size = [];

    // eslint-disable-next-line no-plusplus
    // for (let index = 0; index < variants.length; index++) {
    //     const attributes = variants[index].attributes;
    // }

    return (
        <div className={styles.itemContainer}>
            <div className={styles.imgItem}>
                <Link href="/[...slug]" as="/strive-shoulder-pack">
                    <a>
                        <img
                            src={image && image.url ? image.url : '/assets/img/sample/product.png'}
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
                        priceRange={price_range}
                        // eslint-disable-next-line camelcase
                        priceTiers={price_tiers}
                        productType={__typename}
                    />
                    <div className={styles.colorContainer}>
                        {showListColor
                            && color.map((clr, index) => (
                                <ListColor
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
