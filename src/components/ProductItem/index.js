import Button from '@components/Button';
import Typography from '@components/Typography';
import currency from '@helpers/currency';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import ListSize from './ListSize';
import ListColor from './ListColor';
import useStyles from './style';

const ProductItem = ({
    showListColor = false,
    color = [],
    showListSize = false,
    size = [],
    showFeed = true,
}) => {
    const styles = useStyles();
    const [feed, setFeed] = React.useState(false);
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const FeedIcon = feed ? (
        <Favorite className={classFeedActive} />
    ) : (
        <FavoriteBorderOutlined className={styles.iconFeed} />
    );

    return (
        <div className={styles.itemContainer}>
            <div className={styles.imgItem}>
                <Link href="/product/[id]" as="/product/product-123">
                    <a>
                        <img
                            src="/assets/img/sample/product.png"
                            className={styles.imgProduct}
                            alt="product"
                        />
                    </a>
                </Link>
            </div>
            <div className={styles.detailItem}>
                <div className={styles.descItem}>
                    <Link href="/product/[id]" as="/product/product-123">
                        <a>
                            <Typography
                                variant="p"
                                className={styles.clearMarginPadding}
                                letter="capitalize"
                            >
                                Product
                            </Typography>
                        </a>
                    </Link>
                    <Typography
                        variant="p"
                        className={styles.clearMarginPadding}
                        letter="uppercase"
                    >
                        {currency({ value: 90000, currency: 'idr' })}
                    </Typography>
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
