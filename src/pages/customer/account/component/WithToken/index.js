// Library
import Link from 'next/link';
import React from 'react';
import Carousel from '@components/Slider/Carousel';
import Typography from '@components/Typography';
import { GraphCustomer } from '@services/graphql';
import { customerFeautres } from '@config';
import Footer from '../Footer';
import Loaders from '../Loader';
import PointCard from '../PointCard';
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

    const pushIf = (condition, ...elements) => (condition ? elements : []);

    const menu = [
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        { href: '/customer/account/profile', title: t('customer:menu:myAccount') },
        { href: '/customer/account/address', title: t('customer:menu:address') },
        ...pushIf(wishlist.length <= 0, {
            href: '/wishlist', title: 'Wishlist',
        }),
        ...pushIf(customerFeautres.giftCard, {
            href: '/awgiftcard/card', title: 'Gift Card',
        }),
        ...pushIf(customerFeautres.storeCredit, {
            href: '/customer/account/storecredit', title: t('customer:menu:storeCredit'),
        }),
        { href: '/inboxnotification/notification', title: t('notification:notification') },
        { href: '/customer/setting', title: t('customer:menu:setting') },
    ];

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
                    {
                        customerFeautres.rewardPoint ? (
                            <PointCard {...props} />
                        ) : null
                    }
                    <div className={styles.account_block}>
                        <ul className={styles.account_navigation}>
                            {
                                menu.map(({ href, title }, index) => (
                                    <li className={styles.account_navigation_item} key={index}>
                                        <Link href={href}>
                                            <a className={styles.account_navigation_link}>{title}</a>
                                        </Link>
                                    </li>
                                ))
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
                                    <Link
                                        href="/wishlist"
                                        className={[styles.account_wishlist_read_more].join(' ')}
                                    >
                                        <a>
                                            <Typography
                                                variant="span"
                                                type="bold"
                                                letter="capitalize"
                                            >
                                                {t('customer:menu:readMore')}
                                            </Typography>
                                        </a>
                                    </Link>
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
