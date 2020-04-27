// Library
import React from 'react';
import Link from 'next/link';
import Button from '@components/Button';
import Loaders from '@components/Loaders';
import Router from 'next/router';
import { removeToken, getToken } from '@helpers/token';
import { getCustomer } from '../services/graphql';

// Styling And Component
// import Carousel from '@components/Slider/Carousel';
import useStyles from './style';

const Content = ({ t }) => {
    const styles = useStyles();
    let userData = {};
    if (typeof window !== 'undefined') {
        const token = getToken();
        const { data, loading, error } = getCustomer(token);

        if (!data || loading) return <Loaders />;
        if (data) userData = data;
        if (error) console.log(error);
    }

    const handleLogout = () => {
        removeToken();
        Router.push('/customer/account/login');
    };

    return (
        <>
            <div className={styles.account_wrapper}>
                <div
                    className={[
                        styles.account_block,
                        styles.padding_vertical_40,
                        styles.border_bottom,
                    ].join(' ')}
                >
                    <h3 className={styles.account_username}>
                        { userData && userData.customer && (`${userData.customer.firstname} ${userData.customer.lastname}`) }
                    </h3>
                    <p className={styles.account_email}>
                        { userData && userData.customer && (userData.customer.email) }
                    </p>
                </div>
                <div
                    className={[
                        styles.account_block,
                        styles.padding_vertical_40,
                    ].join(' ')}
                >
                    <div className={styles.account_point}>
                        <p className={styles.account_point_title}>My Point</p>
                        <h3 className={styles.account_point_summary}>
                            100.000
                        </h3>
                    </div>
                    <div className={styles.account_block}>
                        <ul className={styles.account_navigation}>
                            <li className={styles.account_navigation_item}>
                                <Link href="/order/history">
                                    <a
                                        className={
                                            styles.account_navigation_link
                                        }
                                    >
                                        My Order
                                    </a>
                                </Link>
                            </li>
                            <li className={styles.account_navigation_item}>
                                <Link href="/customer/account/profile">
                                    <a
                                        className={
                                            styles.account_navigation_link
                                        }
                                    >
                                        My Account
                                    </a>
                                </Link>
                            </li>
                            <li className={styles.account_navigation_item}>
                                <Link href="/customer/account/address">
                                    <a
                                        className={
                                            styles.account_navigation_link
                                        }
                                    >
                                        Address Book
                                    </a>
                                </Link>
                            </li>
                            <li className={styles.account_navigation_item}>
                                <Link href="/customer/setting">
                                    <a
                                        className={
                                            styles.account_navigation_link
                                        }
                                    >
                                        Settings
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    className={[
                        styles.account_block,
                        styles.wishlistBlock,
                    ].join(' ')}
                >
                    <div className={styles.account_clearfix}>
                        <h4 className={styles.account_wishlist_title}>
                            Wishlist
                        </h4>
                        <h5 className={styles.account_wishlist_read_more}>
                            Read More
                        </h5>
                    </div>
                    <div className={styles.account_clearfix}>
                        {/* <Carousel
                            data={data}
                            className={[styles.wishlistBlock, styles.margin20].join(' ')}
                        /> */}
                    </div>
                </div>
                <div className={styles.account_block}>
                    <ul className={styles.account_navigation}>
                        <li className={styles.account_navigation_item}>
                            <Button
                                className={styles.account_navigation_link}
                                onClick={handleLogout}
                                variant="text"
                            >
                                {t('customer:button:logout')}
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Content;
