// Library
import Link from 'next/link';
import React from 'react';
import Carousel from '@components/Slider/Carousel';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { GraphCustomer } from '@services/graphql';
import Footer from '../Footer';
import Loaders from '../Loader';
// Styling And Component
import useStyles from './style';


const WithToken = (props) => {
    const { token, t } = props;
    const styles = useStyles();
    let userData = {};
    let wishlist = [];
    const { data, loading, error } = GraphCustomer.getCustomer(token);
    if (!data || loading || error) return <Loaders />;
    if (data) {
        userData = data;
        wishlist = data.customer && data.customer.wishlist && data.customer.wishlist.items.map(({ product }) => ({
            ...product,
            name: product.name,
            link: product.url_key,
            imageSrc: product.small_image.url,
            price: product.price_range.minimum_price.regular_price.value,
        }));
    }

    return (
        <div className={styles.root}>
            <div className={styles.account_wrapper}>
                <div className={[styles.account_block, styles.padding_vertical_40, styles.border_bottom].join(' ')}>
                    <h3 className={styles.account_username}>
                        {userData && userData.customer && `${userData.customer.firstname} ${userData.customer.lastname}`}
                    </h3>
                    <p className={styles.account_email}>{userData && userData.customer && userData.customer.email}</p>
                </div>
                <div className={[styles.account_block, styles.padding_vertical_40].join(' ')}>
                    <div className={styles.account_point}>
                        <p className={styles.account_point_title}>{t('customer:myPoint')}</p>
                        <h3 className={styles.account_point_summary}>100.000</h3>
                    </div>
                    <div className={styles.account_block}>
                        <ul className={styles.account_navigation}>
                            <li className={styles.account_navigation_item}>
                                <Link href="/sales/order/history">
                                    <a className={styles.account_navigation_link}>{t('customer:myOrder')}</a>
                                </Link>
                            </li>
                            <li className={styles.account_navigation_item}>
                                <Link href="/customer/account/profile">
                                    <a className={styles.account_navigation_link}>{t('customer:myAccount')}</a>
                                </Link>
                            </li>
                            <li className={styles.account_navigation_item}>
                                <Link href="/customer/account/address">
                                    <a className={styles.account_navigation_link}>{t('customer:address')}</a>
                                </Link>
                            </li>
                            <li className={styles.account_navigation_item}>
                                <Link href="/customer/setting">
                                    <a className={styles.account_navigation_link}>{t('customer:setting')}</a>
                                </Link>
                            </li>
                            {
                                wishlist.length <= 0 && (
                                    <li className={styles.account_navigation_item}>
                                        <Link href="/wishlist">
                                            <a className={styles.account_navigation_link}>Wishlist</a>
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                {
                    wishlist.length > 0 ? (
                        <div className={[styles.account_block, styles.wishlistBlock].join(' ')}>
                            <div className={styles.account_clearfix}>
                                <div className={styles.spanWishlist}>
                                    <Typography variant="span" type="bold" letter="capitalize" className={styles.account_wishlist_title}>
                                        Wishlist
                                    </Typography>
                                    <Button
                                        href="/wishlist"
                                        className={[styles.account_wishlist_read_more].join(' ')}
                                        variant="text"
                                    >
                                        <Typography variant="span" type="bold" letter="capitalize">{t('customer:readMore')}</Typography>
                                    </Button>
                                </div>
                            </div>
                            <div className={styles.account_clearfix}>
                                <Carousel
                                    data={wishlist}
                                    className={[styles.wishlistBlock, styles.margin20].join(' ')}
                                />
                            </div>
                        </div>
                    ) : (
                        <span className={styles.span} />
                    )
                }
                <Footer {...props} />
            </div>
        </div>
    );
};

export default WithToken;
