// Library
import Link from 'next/link';
import React from 'react';
import { getCustomer } from '../../services/graphql';
import Footer from '../Footer';
import Loaders from '../Loader';
// Styling And Component
// import Carousel from '@components/Slider/Carousel';
import useStyles from './style';


const WithToken = (props) => {
    const { token } = props;
    const styles = useStyles();
    let userData = {};
    const { data, loading, error } = getCustomer(token);

    if (!data || loading) return <Loaders />;
    if (data) userData = data;
    if (error) console.log(error);

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
                        <p className={styles.account_point_title}>My Point</p>
                        <h3 className={styles.account_point_summary}>100.000</h3>
                    </div>
                    <div className={styles.account_block}>
                        <ul className={styles.account_navigation}>
                            <li className={styles.account_navigation_item}>
                                <Link href="/order/history">
                                    <a className={styles.account_navigation_link}>My Order</a>
                                </Link>
                            </li>
                            <li className={styles.account_navigation_item}>
                                <Link href="/customer/account/profile">
                                    <a className={styles.account_navigation_link}>My Account</a>
                                </Link>
                            </li>
                            <li className={styles.account_navigation_item}>
                                <Link href="/customer/account/address">
                                    <a className={styles.account_navigation_link}>Address Book</a>
                                </Link>
                            </li>
                            <li className={styles.account_navigation_item}>
                                <Link href="/customer/setting">
                                    <a className={styles.account_navigation_link}>Settings</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={[styles.account_block, styles.wishlistBlock].join(' ')}>
                    <div className={styles.account_clearfix}>
                        <h4 className={styles.account_wishlist_title}>Wishlist</h4>
                        <h5 className={styles.account_wishlist_read_more}>Read More</h5>
                    </div>
                    <div className={styles.account_clearfix}>
                        {/* <Carousel
                            data={data}
                            className={[styles.wishlistBlock, styles.margin20].join(' ')}
                        /> */}
                    </div>
                </div>
                <Footer {...props} />
            </div>
        </div>
    );
};

export default WithToken;
